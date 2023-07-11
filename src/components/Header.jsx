import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Header = () => {

    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div className="container-fluid">
            <div className='row py-2'>
                <div className='header py-1 d-flex justify-content-between'>
                    <div className='header-nav d-flex'>
                        <div onClick={() => navigate(-1)} className='header-nav-button'>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </div>
                        <div onClick={() => navigate(1)} className='header-nav-button'>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                    </div>
                    <div className='dropdown header-user-button'>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle className='header-user-image' tag='div'>
                                <img src="https://pbs.twimg.com/profile_images/1371462160283406339/n9Z3koOU_400x400.jpg" alt="userStockImg" />
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem>
                                    <NavLink>User Profile</NavLink>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Logout</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default Header;