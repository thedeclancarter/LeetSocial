import "./Register.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
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
    var [message, setMessage] = useState("");
    var firstName, lastName, email, password;
    const navigate = useNavigate();

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
    };

    const doSignUp = async event => {
        event.preventDefault();
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (firstName.value === "")
            setFirstName(false);
        else
            setFirstName(true);

        if (lastName.value === "")
            setLastName(false);
        else
            setLastName(true);

        if (!emailRegEx.test(email.value))
            setEmail(false);
        else
            setEmail(true);

        if (!hasCapital || !hasSpecialChar || !hasNum || !has8)
            setPassword(false);
        else
            setPassword(true);

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

            var res = JSON.parse(await response.text());
            console.log(res);
            var statusCode = response.status;

            if (statusCode === 201) {
                setMessage("");
                navigate('/verify');
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

        var obj = { email: email.value, password: password.value };
        var js = JSON.stringify(obj);
        console.log(obj);
        try {
            console.log(141);
            const response = await fetch(bp.buildPath('api/login'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            // Store/Decode the incoming JWT token
            var res = JSON.parse(await response.text());
            console.log(res);
            console.log(res.status);
            var storage = require('../../tokenStorage.js');
            console.log(148);
            storage.storeToken(res);
            const { accessToken } = res;
            console.log(151);
            const decoded = decode(accessToken, { complete: true });
            console.log(153);

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
                window.location.href = '/home';
            }
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    return (
        <div className={isLogin ? "container hide" : "container show"}>
            <div className='login'>
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
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
                    {(action === "Sign Up" && !hasEmail) && (
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
                    {(action === "Sign Up" && !hasPassword) && (
                        <p className="inputErr">
                            * Invalid password *
                        </p>
                    )}
                    {(action === "Sign Up") && (
                        <div className="checks">
                            <p>
                                <FontAwesomeIcon
                                    icon={hasCapital ? faCheck : faTimes}
                                    className={hasCapital ? "faCheck" : "faTimes"}
                                />
                                <span className={hasCapital ? "orange100" : "orange50"}>
                                    Capital Letters
                                </span>
                            </p>
                            <p>
                                <FontAwesomeIcon
                                    icon={hasSpecialChar ? faCheck : faTimes}
                                    className={hasSpecialChar ? "faCheck" : "faTimes"}
                                />
                                <span className={hasSpecialChar ? "orange100" : "orange50"}>
                                    Special Characters
                                </span>
                            </p>
                            <p>
                                <FontAwesomeIcon
                                    icon={hasNum ? faCheck : faTimes}
                                    className={hasNum ? "faCheck" : "faTimes"}
                                />
                                <span className={hasNum ? "orange100" : "orange50"}>
                                    Numbers
                                </span>
                            </p>
                            <p>
                                <FontAwesomeIcon
                                    icon={has8 ? faCheck : faTimes}
                                    className={has8 ? "faCheck" : "faTimes"}
                                />
                                <span className={has8 ? "orange100" : "orange50"}>
                                    8+ Characters
                                </span>
                            </p>
                        </div>
                    )}
                </div>
                <div className="submit-container">
                    <input
                        className={action === "Sign Up" ? "submit white" : "submit"}
                        type="submit"
                        value="Login"
                        name="Login"
                        onClick={handleButtonClick}
                    />
                    <input
                        className={action === "Login" ? "submit white" : "submit"}
                        type="submit"
                        value="Sign Up"
                        name="Sign Up"
                        onClick={handleButtonClick}
                    />
                </div>
                <span className="inputErr">{message}</span>
            </div>
        </div>
    );
};