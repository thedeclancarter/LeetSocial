const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.createToken = function (fn, ln, id, lc) {
    return _createToken(fn, ln, id, lc);
}
_createToken = function (fn, ln, id, lc) {
    try {
        const user = { userId: id, firstName: fn, lastName: ln , leetCodeUsername: lc};

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h'} );
        var ret = { accessToken: accessToken };
    }
    catch (e) {
        var ret = { error: e.message };
    }
    return ret;
}
exports.isExpired = function (token) {
    var isError = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,
        (err, verifiedJwt) => {
            if (err) {
                return true;
            }
            else {
                return false;
            }
        });
    return isError;
}
exports.refresh = function (token) {
    var ud = jwt.decode(token, { complete: true });

    var userId = ud.payload.id;
    var firstName = ud.payload.firstName;
    var lastName = ud.payload.lastName;
    return _createToken(firstName, lastName, userId);
}