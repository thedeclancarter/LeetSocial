import "./Leaderboard.css";
import React, { useState } from 'react';

var bp = require('../../path.js');

const sampleData = [
    {
        pos: "1st",
        un: "Dr. Lienecker",
        numSolved: "236",
        hard: "236",
        medium: "0",
        easy: "0",
    },
    {
        pos: "2nd",
        un: "Dr. Szumlanski",
        numSolved: "214",
        hard: "200",
        medium: "13",
        easy: "1",
    },
    {
        pos: "3rd",
        un: "Dr. Steinberg",
        numSolved: "197",
        hard: "128",
        medium: "64",
        easy: "5",
    },
    {
        pos: "4th",
        un: "Dr. Ahmed",
        numSolved: "181",
        hard: "59",
        medium: "100",
        easy: "22",
    },
    {
        pos: "5th",
        un: "Dr. Guha",
        numSolved: "1",
        hard: "0",
        medium: "0",
        easy: "1",
    },
]

export default function Leaderboard(prop) {
    const { isLogin } = prop;
    var [activeButton, setActiveButton] = useState(0);

    const getFriendStats = async () => {

        var _ud = sessionStorage.getItem('user_data');
        var ud = JSON.parse(_ud);

        var obj = {userId: ud.id, searchString: ""};
        var body = JSON.stringify(obj);

        try {
            var response = await fetch(bp.buildpath('api/searchFriends'),
            {
                method: 'POST',
                body: body,
                headers: {'Content-Type': 'application/json'}
            });

            var res = JSON.parse(await response.text());

            for (var i = 0; i < res.length; i++)
            {
                var obj = {username: res[i].leetCodeUsername};
                var body = JSON.stringify(obj);

                try {
                    var stats = await fetch(bp.buildpath('/api/userSolvedCount'),
                    {
                        method: 'POST',
                        body: body,
                        headers: {'Content-Type': 'application/json'}
                    });

                    var probs = JSON.parse(await stats.text());

                    var merge = {...res[i], ...probs};

                    res[i] = merge;
                }
                catch (e) {
                    alert(e.toString());
                    return;
                }
            }
            console.log(res);
            return res;
        }
        catch (e) {
            alert(e.toString());
        }
    };

    const filterTable = event => {
        event.preventDefault();
        const buttonName = event.target.name;

        if (buttonName === "All")
            setActiveButton(0);
        else if (buttonName === "Hard")
            setActiveButton(1);
        else if (buttonName === "Medium")
            setActiveButton(2);
        else
            setActiveButton(3);
    };

    function sortObjects(infoArr, activeButton)
    {

    }

    return (
        <div
            className={isLogin ? "tableContainerExt" : "tableContainer"}
        >
            <table className="leaderboard">
                <tr className="row">
                    <td colSpan={3}>
                        <div className='header'>
                            <p>Problems Solved</p>
                            <ul>
                                <button
                                    className={
                                        activeButton === 0 ? 'tableButton active': 'tableButton'
                                    }
                                    name='All'
                                    onClick={filterTable}
                                >
                                    All
                                </button>
                                <button
                                    className={
                                        activeButton === 1 ? 'tableButton active' : 'tableButton'
                                    }
                                    name='Hard'
                                    onClick={filterTable}
                                >
                                    Hard
                                </button>
                                <button
                                    className={
                                        activeButton === 2 ? 'tableButton active' : 'tableButton'
                                    }
                                    name='Medium'
                                    onClick={filterTable}
                                >
                                    Medium
                                </button>
                                <button
                                    className={
                                        activeButton === 3 ? 'tableButton active' : 'tableButton'
                                    }
                                    name='Easy'
                                    onClick={filterTable}
                                >
                                    Easy
                                </button>
                            </ul>
                        </div>
                    </td>
                </tr>
                {
                    // isLogin ?
                    // () => {
                    //     var infoArr = getFriendStats;

                    //     sortObjects(infoArr, activeButton);
                    // }
                    // :
                    sampleData.map(sample => (
                        <tr className="row">
                            <td className="position">
                                <p>{sample.pos}</p>
                            </td>
                            <td className="username">
                                <p>{sample.un}</p>
                            </td>
                            <td className="numSolved">
                                <p>{
                                    activeButton === 0 ? sample.numSolved:
                                    activeButton === 1 ? sample.hard:
                                    activeButton === 2 ? sample.medium:
                                    sample.easy
                                }</p>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    );
};