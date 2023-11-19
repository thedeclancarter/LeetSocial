import React, { useState, useEffect } from 'react';
import './SearchBar.css'; // Make sure to create this CSS file
import addFriendIcon from '../../assets/add-friend.png'; // Path to your add-friend icon
import checkMarkIcon from '../../assets/white-checkmark-in-circle-md.png'; // Path to your checkmark icon
import axios from 'axios';
var bp = require('../../path.js');

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [isMouseInside, setIsMouseInside] = useState(false);
    const [searchData, setSearchData] = useState([]);

    // Get UserID
    var _ud = sessionStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;

    // Initialize searchData with objects containing name and clicked properties
    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm.trim()) {
                try {
                    const response = await axios.post(bp.buildPath('api/searchUsers'), { searchString: searchTerm, userId });
                    setSearchData(response.data.map(user => ({
                        ...user,
                        name: `${user.firstName} ${user.lastName} (${user.leetCodeUsername})`
                    })));
                } catch (error) {
                    console.error('Error fetching search data', error);
                }
            } else {
                setSearchData([]);
            }
        };

        fetchData();
    }, [searchTerm, userId]);

    const updateFriendStatus = async (friendId, isFollowing) => {
        try {
            const apiPath = isFollowing ? 'api/removeFriend' : 'api/addFriend';
            await axios.post(bp.buildPath(apiPath), { userId, friendId });
            // Update clicked state locally for immediate UI response
            const updatedSearchData = searchData.map(item =>
                item.userId === friendId ? { ...item, isFollowing: !isFollowing } : item
            );
            setSearchData(updatedSearchData);
        } catch (error) {
            console.error('Error updating friend status', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setShowResults(event.target.value.length > 0);
        if (onSearch) {
            onSearch(event.target.value);
        }
    };

    const handleFocus = () => {
        if (searchTerm.trim().length > 0) {
            setShowResults(true);
        }
    };

    const handleBlur = () => {
        // Only hide results if the mouse is not over the results
        if (!isMouseInside) {
            setShowResults(false);
        }
    };

    const handleMouseEnter = () => setIsMouseInside(true);
    const handleMouseLeave = () => setIsMouseInside(false);

    const handleIconClick = (userId, isFollowing) => {
        updateFriendStatus(userId, isFollowing);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search Users..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="search-input"
            />
            {showResults && (
                <div
                    className="search-results"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {searchData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                               .map((item, index) => (
                                   <div key={index} className="search-item" onClick={() => handleIconClick(item.userId, item.isFollowing)}>
                                       <span>{item.name}</span>
                                       <img
                                           src={item.isFollowing ? checkMarkIcon : addFriendIcon}
                                           alt="icon"
                                           className="icon"
                                       />
                                   </div>
                               ))
                    }
                </div>
            )}
        </div>
    );
}

export default SearchBar;
