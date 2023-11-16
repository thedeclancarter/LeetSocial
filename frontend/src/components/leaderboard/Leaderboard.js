import "./Leaderboard.css";
import React from 'react';

const sampleData = [
    {
        pos: "1st",
        un: "Dr. Lienecker",
        numSolved: "236",
    },
    {
        pos: "2nd",
        un: "Dr. Szumlanski",
        numSolved: "214",
    },
    {
        pos: "3rd",
        un: "Dr. Steinberg",
        numSolved: "197",
    },
    {
        pos: "4th",
        un: "Dr. Ahmed",
        numSolved: "181",
    },
    {
        pos: "5th",
        un: "Dr. Guha",
        numSolved: "1",
    },
]

export default function Leaderboard(prop) {
    const { isLogin } = prop;

    return (
        <div
            className={isLogin ? "tableContainerExt" : "tableContainer"}
        >
            <table className="leaderboard">
                <tr className="row">
                    <td colSpan={3}>
                        <p>Problems Solved Leaderboard</p>
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
                                <p>{sample.numSolved}</p>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    );
};