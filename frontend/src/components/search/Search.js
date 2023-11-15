import './Search.css';
import React from 'react';

function performSearch() {

  }
  
  function displayResults(results) {

  }
export default function Search() {
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var login = ud.login;
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;


    return (
        <div class="search-container">
        <h1 class="page-title">Search Page</h1>
        <div class="search-box">
          <input type="text" id="searchInput" placeholder="Enter your search..."></input>
          <button onClick={performSearch}>Search</button>
        </div>
        <ul id="searchResults" class="search-results"></ul>
      </div>
    );
};