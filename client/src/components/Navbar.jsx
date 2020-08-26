import React from 'react';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

import './Navbar.css';

const Navbar = () => {
    const [anchorEl, setanchorEl] = React.useState(null);

    const handleClick = (e) => {
        setanchorEl(e.currentTarget);
    };

    const handleClose = (e) => {
        setanchorEl(null);
    };
    return (
        <nav className='Navbar'>
            <Hidden smUp>
                <div>
                    <Button
                        aria-controls='simple-menu'
                        aria-haspopup='true'
                        onClick={handleClick}
                    >
                        <MenuIcon className='menuIcon' />
                    </Button>
                    <Menu
                        id='simple-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link className='menuLinks' to='/register'>
                                Register
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link className='menuLinks' to='/login'>
                                Login
                            </Link>
                        </MenuItem>
                    </Menu>
                </div>
            </Hidden>

            <Link to='/'>
                <h1>Remembler</h1>
            </Link>

            <div className='links'>
                <Hidden xsDown>
                    <Link className='navLinks' to='/register'>
                        Register
                    </Link>
                    <Link className='navLinks' to='/login'>
                        Login
                    </Link>
                </Hidden>
            </div>
        </nav>
    );
};

export default Navbar;
