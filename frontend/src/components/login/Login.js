import React, { useState } from 'react';
import './Login.css';

export default function Login(props)
{ 
    var login;
    var password;
    var firstName;
    var lastName;
    var newLogin;
    var newPassword;

    const [message,setMessage] = useState('');
    const [isSignUp, setSignUp] = useState(false);
    const { isLogin, setLogin } = props;

    const handleButtonClick = event => {
        event.preventDefault();
        const buttonName = event.target.name;
    
        if (buttonName === 'login') {
            doLogin(event);
        } else if (buttonName === 'register') {
            doSignup(event);
        }
    };

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {login:login.value,password:password.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('http://leet-social-2e5f98883d68.herokuapp.com/api/login',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.id === -1 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName}
                localStorage.setItem('user_data', JSON.stringify(user));

                setLogin(true);
                setMessage('');
                // window.location.href = '/profile';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    const doSignup = async event => 
    {
        event.preventDefault();

        var obj = {login:newLogin.value,password:newPassword.value, firstName:firstName.value, lastName:lastName.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('http://leet-social-2e5f98883d68.herokuapp.com/api/signup',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            setMessage('Account created! Please login.');
            // if( res.id <= 0 )
            // {
            //     setMessage('User/Password combination incorrect');
            // }
            // else
            // {
            //     var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
            //     localStorage.setItem('user_data', JSON.stringify(user));

            //     setMessage('');
            //     window.location.href = '/cards';
            // }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };


    return (
        <div className={isLogin ? "hideRegister" : "loginRegister"}>
            <div className={isSignUp ? "hidden" : "loginDiv"}>
                <form>
                    <span id="inner-title">LOGIN</span><br />
                    <input type="text" className="inputText" placeholder="Username" 
                        ref={(c) => login = c} />
                    <input type="password" className="inputText" placeholder="Password" 
                        ref={(c) => password = c} />
                    <input type="submit" id="loginButton" class="buttons" value = "Login" name="login"
                        onClick={handleButtonClick} />
                </form>
                <span id="loginResult">{message}</span><br></br>
                <button onClick={() => {setSignUp(!isSignUp)}}>Switch to Sign Up</button>
            </div>

            <div className={isSignUp ? "loginDiv" : "hidden"}>
                <form>
                    <span id="inner-titleR">REGISTER</span><br />
                    <div className="inputFields">
                        <input type="text" className="inputText" placeholder="First Name" 
                            ref={(c) => firstName = c} />
                        <input type="text" className="inputText" placeholder="Last Name" 
                            ref={(c) => lastName = c} />
                        <input type="text" className="inputText" placeholder="Username" 
                            ref={(c) => newLogin = c} />
                        <input type="password" className="inputText" placeholder="Password" 
                            ref={(c) => newPassword = c} />
                    </div>
                    <input type="submit" id="registerButton" class="buttons" value = "Register" name="register"
                        onClick={handleButtonClick}/>              
                </form>
                <span id="registerResult">{message}</span><br></br>
                <button onClick={() => {setSignUp(!isSignUp)}}>Switch to Login</button>
            </div>
        </div>
    );
};