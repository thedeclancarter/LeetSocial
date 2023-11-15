import './FriendList.css';
import React from 'react';

const data = [
    { name: "Anom"},
    { name: "Megha"},
    { name: "Subham"},
    { name: "Anom"},
    { name: "Megha"},
    { name: "Subham"},
    { name: "Anom"},
    { name: "Megha"},
    { name: "Subham"},
    { name: "Anom"},
    { name: "Megha"},
    { name: "Subham"},
]

export default function FriendList() {

    return (
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
    );
};