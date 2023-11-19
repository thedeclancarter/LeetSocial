import './FriendList.css';
import React, { useEffect, useState } from 'react';

// Temporary list while we wait for API
const data = [
    { name: "Anom" },
    { name: "Megha" },
    { name: "Subham" },
    { name: "Anom" },
    { name: "Megha" },
    { name: "Subham" },
    { name: "Anom" },
    { name: "Megha" },
    { name: "Subham" },
    { name: "Anom" },
    { name: "Megha" },
    { name: "Subham" },
]

export default function FriendList() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        leetCodeUsername: '',
        userId: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const _ud = sessionStorage.getItem('user_data');
                const ud = JSON.parse(_ud);
                const id = ud.id;
                const obj = { userId: id };
                const js = JSON.stringify(obj);

                const response = await fetch('https://leet-social-2e5f98883d68.herokuapp.com/api/searchFriends', {
                    method: 'POST',
                    body: js,
                    headers: { 'Content-Type': 'application/json' },
                });

                console.log(response);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const res = await response.json();
                console.log(res);

                const user = {
                    firstName: res.firstName,
                    lastName: res.lastName,
                    username: res.leetCodeUsername,
                    userId: res.userId,
                };
            } catch (error) {
                console.error('Error fetching data:', error);
                alert(error.toString());
            }
        };

        fetchData(); // Call the asynchronous function when the component mounts
    }, []); // The empty dependency array ensures that this effect runs once after the initial render
    // As soon as API is ready, add in the array of friends

    
    return (
        <div>

            <div className="friendList">
                <table className="friendTable" >
                    <tr className="titles">
                        <th>Friend Name</th>
                        <th>Remove</th>
                    </tr>
                    {data.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.name}</td>
                                <td><button id="removeButton">Remove</button></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    );
};