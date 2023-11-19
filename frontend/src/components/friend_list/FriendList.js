import './FriendList.css';
import Profile from '../../pages/profile/Profile';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
var bp = require('../../path.js');



export default function FriendList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [isMouseInside, setIsMouseInside] = useState(false);
    const [searchData, setSearchData] = useState([]);

    var _ud = sessionStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;

    const obj = { userId: userId };
    const js = JSON.stringify(obj);

    useEffect(() => {
        const fetchData = async () => {
            try {


                const response = await fetch('https://leet-social-2e5f98883d68.herokuapp.com/api/searchFriends', {
                    method: 'POST',
                    body: js,
                    headers: { 'Content-Type': 'application/json' },
                });

                console.log(userId);
                console.log(response);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const res = await response.json();
                console.log(res);

                setSearchData(res.map(user => ({
                    ...user,
                    name: `${user.firstName} ${user.lastName} (${user.leetCodeUsername})`
                })));
            } catch (error) {
                console.error('Error fetching data:', error);
                alert(error.toString());
            }
        };
        fetchData();
    }, [searchTerm, userId]);

    const removeFriend = async (friendId) => {
        if (window.confirm('Are you sure you want to remove this friend?'))
        {
            console.log("Friend removed.");
            try {
                const apiPath = 'api/removeFriend';
                await axios.post(bp.buildPath(apiPath), { userId, friendId });

                // Fetch the updated data after removal
                const updatedResponse = await fetch('https://leet-social-2e5f98883d68.herokuapp.com/api/searchFriends', {
                    method: 'POST',
                    body: js,
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!updatedResponse.ok) {
                    throw new Error('Network response was not ok');
                }

                const updatedRes = await updatedResponse.json();
                setSearchData(updatedRes.map(user => ({
                    ...user,
                    name: `${user.firstName} ${user.lastName} (${user.leetCodeUsername})`
                })));
            } catch (error) {
                console.error('Error updating friend status', error);
            }
        }
        else
        {
            console.log("Operation cancelled.");
        }

    };

    console.log('searchData:', searchData);

    return (
        <div>
            <div className="friendList">
                <table className="friendTable">
                    <thead>
                        <tr className="titles">
                            <th>Friend Name</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchData.map((item, index) => (
                            <tr key={index} className="friend-list-row" >
                                <td>{item.name}</td>
                                <td><button id="removeButton" onClick={() => removeFriend(item.userId)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}