import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className='Navbar'>
            <Link to='/'>
                <h1>Remembler</h1>
            </Link>
            <div className='links'>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;
