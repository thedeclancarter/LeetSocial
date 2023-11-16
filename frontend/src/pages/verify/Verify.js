import React, { useState } from 'react';
import decode from "jwt-decode";
var bp = require('../../path.js');

// No longer needed unless we want to verify the hash even exists before letting them enter the page
// window.addEventListener('DOMContentLoaded', function() {
//     // Extract the token from the URL
//     const queryParams = new URLSearchParams(window.location.search);
//     const token = queryParams.get('token');
//     try {
//         const resp = fetch(bp.buildPath('api/verify?token=${token}'), {method:'GET', headers:{'Content-Type': 'application/json'}});
//     } catch (err) {
//     }
//   });

function UserForm() {
    const [leetCodeUsername, setUsername] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();
        // Extract the token from the URL
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');
        var obj = { leetCodeUsername, token };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath('api/verify'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            window.location.href = '/';
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    // Inline styles
    const formStyle = {
        backgroundColor: '#333', // Dark background
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
        margin: 'auto',
        color: 'white'
    };

    const inputStyle = {
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: 'none',
        width: '100%'
    };

    return (
        <div style={formStyle}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="leetCodeUsername">LeetCode Username:</label>
                    <input
                        type="text"
                        id="leetCodeUsername"
                        value={leetCodeUsername}
                        onChange={(e) => setUsername(e.target.value)}
                        style={inputStyle}
                    />
                </div>

                <button type="submit" style={{ padding: '10px', width: '100%', marginTop: '10px' }}>Submit</button>
            </form>
        </div>
    );
}

export default UserForm;