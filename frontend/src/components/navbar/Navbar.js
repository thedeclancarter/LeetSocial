import './Navbar.css';

export default function Navbar() 
{
    return <nav className="nav">
        <a href="/" className="site-title">Leet Social</a>
        <ul>
            <li>
                <a href="/about"className="about-link">About</a>
            </li>
        </ul>
        <button className="login-register-button">Login/Register</button>
    </nav>
}