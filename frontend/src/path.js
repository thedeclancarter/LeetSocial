const app_name = 'leet-social-2e5f98883d68'

exports.buildPath =
    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
            return 'http://localhost:5102/' + route;
        }
    }