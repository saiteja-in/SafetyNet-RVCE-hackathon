import React from 'react'
import { Navbar, TextInput, Button, Dropdown, Avatar, DropdownDivider } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
const Header = () => {
    const path = useLocation().pathname;
    return (
        <div className="">
          <Navbar className="border-b-2 dark:bg-gray-900">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r  rounded-lg ">
              <Link to="/">Home</Link>
              </span>
              
              
            </Link>
            
            <div className="flex gap-2 md:order-2">
              
            
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={<Avatar alt="user"  rounded />}
                  className="relative z-50"
                >
                  <Dropdown.Header>
                    <span className="block text-sm font-medium text-white-300">
                      @user username
                    </span>
                    <span className="block truncate text-sm text-gray-900 font-medium">
                      user email
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item as={Link} to="/dashboard?tab=profile">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/dashboard?tab=dash">
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as="button">
                    Logout
                  </Dropdown.Item>
                </Dropdown>
               
                <Link to="/sign-in">
                  <Button gradientDuoTone="purpleToPink" outline>
                    Sign In
                  </Button>
                </Link>
              
              <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
              <Navbar.Link active={path === "/search"} as={"div"}>
                <Link className='text-xl' to="/search">Announcements</Link>
              </Navbar.Link>
              <Navbar.Link active={path === "/about"} as={"div"}>
                <Link className='text-xl' to="/about">Report an event</Link>
              </Navbar.Link>
              <Navbar.Link active={path === "/projects"} as={"div"}>
                <Link className='text-xl' to="/projects">Nearby Safe Location</Link>
              </Navbar.Link>
              <Navbar.Link active={path === "/projects"} as={"div"}>
                <Link className='text-xl' to="/projects">Emergency contacts</Link>
              </Navbar.Link>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
}

export default Header
