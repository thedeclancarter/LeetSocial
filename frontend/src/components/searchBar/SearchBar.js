import React, { useState } from 'react';
import './SearchBar.css'; // Make sure to create this CSS file

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setShowResults(event.target.value.length > 0);
        if (onSearch) {
            onSearch(event.target.value);
        }
    };

    const handleBlur = () => {
        setSearchTerm(''); // Clear the search term
        setShowResults(false); // Optionally, hide the results when the input loses focus
    };

    // Dummy data for demonstration, replace with your actual data source
    const searchData = ["Profile", "Home", "Settings", "Friends", "Logout", "Log1", "Log2", "Log3", "Log4", "Log5", "Log6", "Log7", "Log8", "Log9", "Log10", "Log11", "Log12"];

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search Users..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
                onBlur={handleBlur}
            />
            {showResults && (
                <div className="search-results">
                    {searchData.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
                               .map((item, index) => (
                                   <div key={index} className="search-item">{item}</div>
                               ))
                    }
                </div>
            )}
        </div>
    );
}

export default SearchBar;
