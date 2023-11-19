import "./Register.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope, faTimes, faCheck, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

var bp = require('../../path.js');

export default function Register(props) {
    const { isLogin, setLogin } = props;
    var [action, setAction] = useState("Login");
    var [isSignUp, setSignUp] = useState(false);
    var [hasCapital, setCapital] = useState(false);
    var [hasSpecialChar, setSpecialChar] = useState(false);
    var [hasNum, setNum] = useState(false);
    var [has8, set8] = useState(false);
    var [hasFirstName, setFirstName] = useState(true);
    var [hasLastName, setLastName] = useState(true);
    var [hasEmail, setEmail] = useState(true);
    var [hasPassword, setPassword] = useState(true);
    var [hasCode, setCode] = useState(true);
    var [hasUsername, setUsername] = useState(true);
    var [message, setMessage] = useState("");
    var firstName, lastName, email, password, leetCodeUsername;
    var digit1, digit2, digit3, digit4, digit5;
    const navigate = useNavigate();
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleInputChange = e => {
        const password = e.target.value;

        if (password.match(/[A-Z]/) != null)
            setCapital(true);
        else
            setCapital(false);

        if (password.match(/[0-9]/) != null)
            setNum(true);
        else
            setNum(false);

        if (password.match(/[!@#$%^&*]/) != null)
            setSpecialChar(true);
        else
            setSpecialChar(false);

        if (password.length > 7)
            set8(true);
        else
            set8(false);
    };

    const handleButtonClick = event => {
        event.preventDefault();
        const buttonName = event.target.name;

        if (buttonName === "Login") {
            if (action === "Login") {
                doLogin(event);
            } else {
                setAction("Login");
                setSignUp(!isSignUp);
            }
        }
        else if (buttonName === "Sign Up") {
            if (action === "Sign Up") {
                doSignUp(event);
            } else {
                setAction("Sign Up");
                setSignUp(!isSignUp);
            }
        }
        else if (buttonName === "Verify") {
            doVerify(event);
        }
    };

    const doSignUp = async event => {
        event.preventDefault();

        if (firstName.value === "")
        {
            hasFirstName = false;
            setFirstName(false);
        }
        else
        {
            hasFirstName = true;
            setFirstName(true);
        }

        if (lastName.value === "")
        {
            hasLastName = false;
            setLastName(false);
        }
        else
        {
            hasLastName = true;
            setLastName(true);
        }

        if (!emailRegEx.test(email.value))
        {
            hasEmail = false;
            setEmail(false);
        }
        else
        {
            hasEmail = true;
            setEmail(true);
        }

        if (!hasCapital || !hasSpecialChar || !hasNum || !has8)
        {
            hasPassword = false;
            setPassword(false);
        }
        else
        {
            hasPassword = true;
            setPassword(true);
        }

        console.log(hasFirstName, hasLastName, hasEmail, hasPassword);

        if (!hasFirstName || !hasLastName || !hasEmail || !hasPassword)
            return;

        var body = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
        };
        var js = JSON.stringify(body);

        try {
            var response = await fetch(bp.buildPath('api/signup'),
                {
                    method: 'POST',
                    body: js,
                    headers: { 'Content-Type': 'application/json' }
                });

            var statusCode = response.status;

            if (statusCode === 201) {
                setAction("Verify");
                setMessage("Check email for verification code");
            }
            else if (statusCode === 409) {
                setMessage("Email is already registered")
            }
            else if (statusCode === 500) {
                setMessage("Error with registration")
            }
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    const doLogin = async event => {
        event.preventDefault();

        if (!emailRegEx.test(email.value)) {
            hasEmail = false;
            setEmail(false);
        }
        else {
            hasEmail = true;
            setEmail(true);
        }

        if (password.value === "") {
            hasPassword = false;
            setPassword(false);
        }
        else {
            hasPassword = true;
            setPassword(true);
        }

        if (!hasEmail || !hasPassword)
            return;

        var obj = { email: email.value, password: password.value };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath('api/login'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            // Store/Decode the incoming JWT token
            var res = JSON.parse(await response.text());
            var storage = require('../../tokenStorage.js');
            storage.storeToken(res);
            const { accessToken } = res;
            console.log(res);
            const decoded = decode(accessToken, { complete: true });

            // Assign Local Vars
            var ud = decoded;
            var userId = ud.userId;
            var firstName = ud.firstName;
            var lastName = ud.lastName;

            if (userId === -1) {
                setMessage('User/Password combination incorrect');
            }
            else {
                var user = { id: userId, firstName: firstName, lastName: lastName };
                window.sessionStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                setLogin(true);
                setTimeout(() => navigate('/home'), 2000);
            }
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    const doVerify = async event => {
        event.preventDefault();

        const verificationCode = "" + digit1.value + digit2.value + digit3.value + digit4.value
            + digit5.value;

        if (verificationCode.length != 5) {
            hasCode = false;
            setCode(false);
        }
        else {
            hasCode = true;
            setCode(true);
        }

        if (leetCodeUsername.value === "") {
            hasUsername = false;
            setUsername(false);
        } else {
            hasUsername = true;
            setUsername(true);
        }

        if (!hasCode || !hasUsername)
            return;

        var obj = {token: verificationCode, leetCodeUsername: leetCodeUsername.value};
        var body = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath('api/verify'),
            {
                method: 'POST',
                body: body,
                headers: { 'Content-Type': 'application/json' }
            });

            const res = await response.json();

            if (response.status === 200)
                setMessage("Verification successful, you may now login")
            else
                setMessage(res.error);

        } catch (e) {
            alert(e.toString());
        }
    };

    return (
        <div className={isLogin ? "container hide" : "container show"}>
            <div className='inputBox'>
                <div className="header">
                    <div
                        className={
                            action === "Login" ? 'loginTxt':
                            action === "Sign Up" ? 'signUpTxt':
                            'verifyTxt'
                        }
                    >
                        {action}
                    </div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    {(action === "Login" || action === "Sign Up") ? (
                        <>
                        {(action === "Sign Up") && (
                            <>
                                <div className="names">
                                    <FontAwesomeIcon icon={faUser} className="faIcons" />
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        ref={(c) => firstName = c}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        ref={(c) => lastName = c}
                                    />
                                </div>
                                {
                                    ((!hasFirstName && !hasLastName) && (
                                        <p className="inputErr">
                                            * Missing first and last names *
                                        </p>
                                    )) || ((!hasFirstName) && (
                                        <p className="inputErr">
                                            * Missing first name *
                                        </p>
                                    )) || ((!hasLastName)) && (
                                        <p className="inputErr">
                                            * Missing last name *
                                        </p>
                                    )
                                }
                            </>
                        )}
                        <div className="input">
                            <FontAwesomeIcon icon={faEnvelope} className="faIcons" />
                            <input type="text" placeholder="Email" ref={(c) => email = c} />
                        </div>
                        {(!hasEmail) && (
                            <p className="inputErr">
                                * Invalid email address *
                            </p>
                        )}
                        <div className="input">
                            <FontAwesomeIcon icon={faLock} className="faIcons" />
                            <input
                                type="password"
                                placeholder="Password"
                                ref={(c) => password = c}
                                onChange={(action === "Sign Up") ? handleInputChange : () => { }}
                            />
                        </div>
                        {(!hasPassword) && (
                            <p className="inputErr">
                                * Invalid password *
                            </p>
                        )}
                        {(action === "Sign Up") && (
                            <div className="checks">
                                <p>
                                    <FontAwesomeIcon
                                        icon={hasCapital ? faCheck : faTimes}
                                        className={hasCapital ? "faCheck circle" : "faTimes circle"}
                                    />
                                    <span className={hasCapital ? "orange100" : "orange50"}>
                                        Capital Letters
                                    </span>
                                </p>
                                <p>
                                    <FontAwesomeIcon
                                        icon={hasSpecialChar ? faCheck : faTimes}
                                        className={hasSpecialChar ? "faCheck circle" : "faTimes circle"}
                                    />
                                    <span className={hasSpecialChar ? "orange100" : "orange50"}>
                                        Special Characters
                                    </span>
                                </p>
                                <p>
                                    <FontAwesomeIcon
                                        icon={hasNum ? faCheck : faTimes}
                                        className={hasNum ? "faCheck circle" : "faTimes circle"}
                                    />
                                    <span className={hasNum ? "orange100" : "orange50"}>
                                        Numbers
                                    </span>
                                </p>
                                <p>
                                    <FontAwesomeIcon
                                        icon={has8 ? faCheck : faTimes}
                                        className={has8 ? "faCheck circle" : "faTimes circle"}
                                    />
                                    <span className={has8 ? "orange100" : "orange50"}>
                                        8+ Characters
                                    </span>
                                </p>
                            </div>
                        )}
                        </>): (
                        <>
                            <p className='verifyMsg'>
                                Please insert verification code sent to your email and your LeetCode username
                            </p>
                            <div className='code'>
                                <FontAwesomeIcon icon={faHashtag} className="faIcons"/>
                                <input
                                    type='text'
                                    placeholder="0"
                                    ref={c => digit1 = c}
                                />
                                <input
                                    type='text'
                                    placeholder="0"
                                    ref={c => digit2 = c}
                                />
                                <input
                                    type='text'
                                    placeholder="0"
                                    ref={c => digit3 = c}
                                />
                                <input
                                    type='text'
                                    placeholder="0"
                                    ref={c => digit4 = c}
                                />
                                <input
                                    type='text'
                                    placeholder="0"
                                    ref={c => digit5 = c}
                                />
                            </div>
                            {(!hasCode) && (
                                <p className="inputErr">
                                    * Invalid code *
                                </p>
                            )}
                            <div className='username'>
                                <FontAwesomeIcon icon={faUser} className="faIcons"/>
                                <input
                                    type='text'
                                    placeholder="LeetCode Username"
                                    ref={c => leetCodeUsername = c}
                                />
                            </div>
                            {(!hasUsername) && (
                                <p className="inputErr">
                                    * Invalid username *
                                </p>
                            )}
                        </>)}
                    </div>
                <div className="submit-container">
                    <input
                        className={action !== "Login" ? "submit white" : "submit"}
                        type="submit"
                        value="Login"
                        name="Login"
                        onClick={handleButtonClick}
                    />
                    <input
                        className={action === "Login" ? "submit white" : "submit"}
                        type="submit"
                        value={action === "Verify" ? "Verify": "Sign Up"}
                        name={action === "Verify" ? 'Verify': 'Sign Up'}
                        onClick={handleButtonClick}
                    />
                </div>
                <span className="inputErr">{message}</span>
            </div>
        </div>
    );
};