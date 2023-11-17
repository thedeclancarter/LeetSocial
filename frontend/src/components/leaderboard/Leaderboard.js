import "./Leaderboard.css";
import React, { useState } from 'react';

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

    const getFriends = async event => {
        event.preventDefault();

        var _ud = sessionStorage.getItem('user_data');
        var ud = JSON.parse(_ud);
        var userId = ud.id;


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