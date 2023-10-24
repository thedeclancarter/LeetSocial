import React, { useState } from 'react';
import './Login.css';


// function toggleSignUp(e){
    
//     var script = document.createElement('script');
//     script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
//     document.getElementsByTagName('head')[0].appendChild(script);
//     e.preventDefault();
//     $('#loginRegister .loginDiv').toggle(); // display:block or none
//     $('#loginRegister .registerDiv').toggle(); // display:block or none
// }

function Login()
{ 
    var loginName;
    var loginPassword;

    var firstName;
    var lastName;
    var email;

    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('http://localhost:5000/api/login',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/cards';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };


    return(
    <div id="loginRegister">
        <div className="loginDiv">
            <form onSubmit={doLogin}>
                <span id="inner-title">LOGIN</span><br />
                <input type="text" id="loginName" placeholder="Username" 
                    ref={(c) => loginName = c} />
                <input type="password" id="loginPassword" placeholder="Password" 
                    ref={(c) => loginPassword = c} />
                <input type="submit" id="loginButton" class="buttons" value = "Login"
                    onClick={doLogin} />
            </form>
            <span id="loginResult">{message}</span>
        </div>
        <div className="registerDiv">
        <form>
            <span id="inner-title">REGISTER</span><br />
            <div className="inputFields">
                <input type="text" id="firstName" placeholder="First Name" 
                    ref={(c) => firstName = c} />
                <input type="text" id="lastName" placeholder="Last Name" 
                    ref={(c) => lastName = c} />
                <input type="text" id="email" placeholder="Email" 
                    ref={(c) => email = c} />                                
                <input type="text" id="loginNameR" placeholder="Username" 
                    ref={(c) => loginName = c} />
                <input type="password" id="loginPasswordR" placeholder="Password" 
                    ref={(c) => loginPassword = c} />
            </div>
            <input type="submit" id="registerButton" class="buttons" value = "Register"
                />
                
        </form>
        <span id="registerResult">{message}</span>
        </div>
    </div>
    );
};
export default Login;