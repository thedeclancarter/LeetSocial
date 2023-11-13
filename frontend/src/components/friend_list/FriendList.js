import './FriendList.css';
import React from 'react';
import {useTable} from 'react-table';

const data = [
    { name: "Anom"},
    { name: "Megha"},
    { name: "Subham"},
]

export default function FriendList() {

    return (
        <div className="friendList">
            <table>
                <tr className="titles">
                    <th>Friend Name</th>
                    {/* <th>Settings</th> */}
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