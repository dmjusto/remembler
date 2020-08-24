import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className='Navbar'>
            <h1>Remembler</h1>
            <div className='links'>
                <a href=''>Register</a>
                <a href=''>Login</a>
            </div>
        </nav>
    );
};

export default Navbar;
