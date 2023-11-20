import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ACTable.css";
import React, { useEffect, useState } from 'react';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

var bp = require('../../path.js');

export default function ACTable(props) {
    const { isUpdate } = props;
    var leetCodeUsername = JSON.parse(sessionStorage.getItem('user_data')).leetCodeUsername;
    var [infoArr, setInfoArr] = useState([]);
    var [isDown, setDown] = useState(false);
    var [friendsArr, setFriendsArr] = useState([]);
    var [selection, setSelection] = useState(leetCodeUsername);

    async function getFriends() {
        var ud = JSON.parse(sessionStorage.getItem('user_data'));
        var obj = { userId: ud.id, searchString: "" };
        var body = JSON.stringify(obj);

        try {
            var response = await fetch(bp.buildPath('api/searchFriends'),
            {
                method: 'POST',
                body: body,
                headers: { 'Content-Type': 'application/json' }
            });

            var res = JSON.parse(await response.text());

            return res;
        } catch (e) {
            alert(e.toString());
        }
    };

    async function getAC(selection) {
        var obj = { username: selection };
        var body = JSON.stringify(obj);

        try {
            var response = await fetch(bp.buildPath('api/recentAC'),
            {
                method: 'POST',
                body: body,
                headers: { 'Content-Type': 'application/json' }
            });

            var res = JSON.parse(await response.text());

            return res;
        } catch (e) {
            alert(e.toString);
        }
    }

    useEffect(() => {
        getFriends().then(response => {
            let sortedArr = [...response];

            sortedArr.sort((a, b) => b.leetCodeUsername - a.leetCodeUsername);

            setFriendsArr(sortedArr);
        });
    }, []);

    useEffect(() => {
        getFriends().then(response => {
            let sortedArr = [...response];

            sortedArr.sort((a, b) => b.leetCodeUsername - a.leetCodeUsername);

            setFriendsArr(sortedArr);
        });
    }, [isUpdate]);

    useEffect(() => {
        setDown(false);

        getAC(selection).then(response => {
            response.map(userObj => {
                const dateObj = new Date(userObj.timestamp * 1000);
                const year = dateObj.getUTCFullYear();
                const month = dateObj.getUTCMonth() + 1;
                const day = dateObj.getUTCDate();
                userObj.date = `${month}/${day}/${year}`;
            });

            setInfoArr(response);
        });
    }, [selection]);

    return (
        <div className="tableContainerExt">
            <table className="acTable">
                <tr className="row">
                    <td colSpan={2}>
                        <div className="header">
                            <p>Recently Solved</p>
                            {
                                !isDown ? (
                                    <button
                                        className="tableButton"
                                        onClick={() => setDown(!isDown)}
                                    >
                                        {selection}
                                        <FontAwesomeIcon
                                            className="ddIcon"
                                            icon={faCaretDown}
                                        />
                                    </button>
                                ) : (
                                    <div className="friendsList">
                                        <button
                                            className="ddButton"
                                            onClick={() => setSelection(leetCodeUsername)}
                                        >
                                            {leetCodeUsername}
                                        </button>
                                        {
                                            friendsArr.map(friend => (
                                                <button
                                                    className="ddButton"
                                                    onClick={() => setSelection(friend.leetCodeUsername)}
                                                >
                                                    {friend.leetCodeUsername}
                                                </button>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </td>
                </tr>
                {
                    infoArr.map(userObj => (
                        <tr className="row">
                            <td className="problemName">
                                <p>{userObj.title}</p>
                            </td>
                            <td className="date">
                                <p>{userObj.date}</p>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    );
}