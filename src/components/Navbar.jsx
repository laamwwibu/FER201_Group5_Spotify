import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    
    return (

        <nav className='navbar navbar-expand-lg navbar-expand-md'>
            <div className='collapse navbar-collapse'>
                {/* Home and Search Section */}
                <div className='main-section d-flex flex-column'>
                    <NavLink to='/' className="item py-3">
                        <FontAwesomeIcon icon={faHouse} />
                        <span className='p-3'>Home</span>
                    </NavLink>
                    <NavLink to='/search' className="item py-3">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <span className='p-3'>Search</span>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;