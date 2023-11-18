import React, { useState } from 'react';
import './SearchBar.css'; // Make sure to create this CSS file
import addFriendIcon from '../../assets/add-friend.png'; // Path to your add-friend icon
import checkMarkIcon from '../../assets/white-checkmark-in-circle-md.png'; // Path to your checkmark icon

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [isMouseInside, setIsMouseInside] = useState(false);

    // Initialize searchData with objects containing name and clicked properties
    const [searchData, setSearchData] = useState([
        { name: "Profile", clicked: false },
        { name: "Home", clicked: false },
        { name: "Settings", clicked: false },
        { name: "Friends", clicked: false },
        { name: "Logout", clicked: false },
        { name: "Log1", clicked: false },
        { name: "Log2", clicked: false },
        { name: "Log3", clicked: false },
        { name: "Log4", clicked: false },
        { name: "Log5", clicked: false },
        { name: "Log6", clicked: false },
        { name: "Log7", clicked: false },
        { name: "Log8", clicked: false },
        { name: "Log9", clicked: false },
    ]);

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

    const handleMouseEnter = () => {
        setIsMouseInside(true);
    };

    const handleMouseLeave = () => {
        setIsMouseInside(false);
        // if (!searchTerm) {
        //     setShowResults(false);
        // }
    };

    const handleIconClick = (itemName) => {
        const updatedSearchData = searchData.map(item =>
            item.name === itemName ? { ...item, clicked: !item.clicked } : item
        );
        setSearchData(updatedSearchData);
        // Here you can also call your API
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
                                   <div key={index} className="search-item" onClick={() => handleIconClick(item.name)}>
                                       <span>{item.name}</span>
                                       <img
                                           src={item.clicked ? checkMarkIcon : addFriendIcon}
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
