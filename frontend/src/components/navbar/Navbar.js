import './Navbar.css';
import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Logo from '../logo/Logo'
import SearchBar from '../searchBar/SearchBar';

export default function Navbar(props) {
    const { isLogin, setLogin, isUpdate, setUpdate } = props;
    var _ud = sessionStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    // Populate navbar with title and links to profile and add friend
    return (
        <nav className={isLogin ? 'nav show': 'nav hide'}>
            <Link
                to="/home"
                className="site-title"
            >
                LeetSocial
            </Link>
            <ul>
                <CustomLink
                    to="/home"
                    style={{ color: '#FFFFFF', textDecoration: 'none' }}
                >
                    Home
                </CustomLink>
                <CustomLink
                    to="/profile"
                    style={{ color: '#FFFFFF', textDecoration: 'none' }}
                >
                    Profile
                </CustomLink>
                <CustomLink
                    to="/"
                    onClick={() => {
                        setLogin(false);
                        sessionStorage.clear();
                    }}
                    style={{ color: '#FFFFFF', textDecoration: 'none' }}
                >
                    Logout
                </CustomLink>
                </ul>
                <SearchBar isUpdate={isUpdate} setUpdate={setUpdate} /* onSearch={handleSearch} Uncomment if you have search logic here */ />
        </nav>
    );
};

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}