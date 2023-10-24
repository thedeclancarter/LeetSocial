import React, { useState } from 'react';
import './Register.css';
  
function Register()
{ 
    var loginName;
    var loginPassword;
    var firstName;
    var lastName;
    var email;


    const [message,setMessage] = useState('');

    // const doLogin = async event => 
    // {
    //     event.preventDefault();

    //     var obj = {login:loginName.value,password:loginPassword.value};
    //     var js = JSON.stringify(obj);

    //     try
    //     {    
    //         const response = await fetch('http://localhost:5000/api/login',
    //             {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

    //         var res = JSON.parse(await response.text());

    //         if( res.id <= 0 )
    //         {
    //             setMessage('User/Password combination incorrect');
    //         }
    //         else
    //         {
    //             var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
    //             localStorage.setItem('user_data', JSON.stringify(user));

    //             setMessage('');
    //             window.location.href = '/cards';
    //         }
    //     }
    //     catch(e)
    //     {
    //         alert(e.toString());
    //         return;
    //     }    
    // };
// 
// in button input onClick={doLogin} 
// in form onSubmit={doRegistration}
    return(
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
    );
};
export default Register;