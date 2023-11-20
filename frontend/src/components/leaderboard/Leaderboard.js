import "./Leaderboard.css";
import React, { useEffect, useState } from 'react';

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
];

export default function Leaderboard(props) {
    const { isLogin, isUpdate } = props;
    var [difficulty, setDifficulty] = useState(0);
    var [infoArr, setInfoArr] = useState([]);
    var [sampleArr, setSampleArr] = useState([...sampleData]);

    async function getFriendStats() {
        var _ud = sessionStorage.getItem('user_data');
        var ud = JSON.parse(_ud);

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

            for (var i = 0; i < res.length; i++) {
                var obj = { username: res[i].leetCodeUsername };
                var body = JSON.stringify(obj);

                try {
                    var stats = await fetch(bp.buildPath('api/userSolvedCount'),
                        {
                            method: 'POST',
                            body: body,
                            headers: { 'Content-Type': 'application/json' }
                        });

                    var probs = JSON.parse(await stats.text());

                    var merge = { ...res[i], ...probs };

                    res[i] = merge;
                }
                catch (e) {
                    alert(e.toString());
                    return;
                }
            }

            return res;
        }
        catch (e) {
            alert(e.toString());
        }
    };

    useEffect(() => {
        if (isLogin === false)
        {
            let sortedArr = [...sampleData];
            difficulty === 0 ? sortedArr.sort((a, b) => b.numSolved - a.numSolved) :
                difficulty === 1 ? sortedArr.sort((a, b) => b.hard - a.hard) :
                    difficulty === 2 ? sortedArr.sort((a, b) => b.medium - a.medium) :
                        sortedArr.sort((a, b) => b.easy - a.easy);

            setSampleArr(sortedArr);
        }
        else {
            getFriendStats().then(response => {
                let sortedArr = [...response];
                difficulty === 0 ? sortedArr.sort((a, b) => b.all - a.all) :
                    difficulty === 1 ? sortedArr.sort((a, b) => b.hard - a.hard) :
                        difficulty === 2 ? sortedArr.sort((a, b) => b.medium - a.medium) :
                            sortedArr.sort((a, b) => b.easy - a.easy);

                setInfoArr(sortedArr);
            });
        }
    }, [isUpdate, difficulty]);

    const filterTable = event => {
        event.preventDefault();
        const buttonName = event.target.name;

        if (buttonName === "All")
            setDifficulty(0);
        else if (buttonName === "Hard")
            setDifficulty(1);
        else if (buttonName === "Medium")
            setDifficulty(2);
        else
            setDifficulty(3);
    };

    return (
        <div
            className={isLogin ? "tableContainerExt" : "tableContainer"}
        >
            <table className="leaderboard">
                <tr className="row">
                    <td colSpan={3}>
                        <div className='header'>
                            <p>Problems <br></br>Solved</p>
                            <ul>
                                <button
                                    className={
                                        difficulty === 0 ? 'tableButton active': 'tableButton'
                                    }
                                    name='All'
                                    onClick={filterTable}
                                >
                                    All
                                </button>
                                <button
                                    className={
                                        difficulty === 1 ? 'tableButton active' : 'tableButton'
                                    }
                                    name='Hard'
                                    onClick={filterTable}
                                >
                                    Hard
                                </button>
                                <button
                                    className={
                                        difficulty === 2 ? 'tableButton active' : 'tableButton'
                                    }
                                    name='Medium'
                                    onClick={filterTable}
                                >
                                    Medium
                                </button>
                                <button
                                    className={
                                        difficulty === 3 ? 'tableButton active' : 'tableButton'
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
                    isLogin ?
                    infoArr.map((userObj, idx) => (
                        <tr className="row">
                            <td className="position">
                                <p>{
                                    idx === 0 ? "1st":
                                    idx === 1 ? "2nd":
                                    idx === 2 ? "3rd":
                                    idx + 1 + "th"
                                }</p>
                            </td>
                            <td className="username">
                                <p>{userObj.leetCodeUsername}</p>
                            </td>
                            <td className="numSolved">
                                <p>{
                                    difficulty === 0 ? userObj.all :
                                    difficulty === 1 ? userObj.hard :
                                    difficulty === 2 ? userObj.medium :
                                    userObj.easy
                                }</p>
                            </td>
                        </tr>
                    )):
                    sampleArr.map((sample, idx) => (
                        <tr className="row">
                            <td className="position">
                                <p>{
                                    idx === 0 ? "1st" :
                                        idx === 1 ? "2nd" :
                                            idx === 2 ? "3rd" :
                                                idx + 1 + "th"
                                }</p>
                            </td>
                            <td className="username">
                                <p>{sample.un}</p>
                            </td>
                            <td className="numSolved">
                                <p>{
                                    difficulty === 0 ? sample.numSolved:
                                    difficulty === 1 ? sample.hard:
                                    difficulty === 2 ? sample.medium:
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