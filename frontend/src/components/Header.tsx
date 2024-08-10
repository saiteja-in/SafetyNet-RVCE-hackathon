import {
  Navbar,
  Button,
  Dropdown,
  Avatar, // This import is now used correctly
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store"; // Ensure AppDispatch is correctly defined in your store

const Header = () => {
  // Properly typed useDispatch
  const dispatch = useDispatch<AppDispatch>(); 

  const path = useLocation().pathname;

  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:3217/api/user/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // Properly typed useSelector
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className="">
      <Navbar className="border-b-2 dark:bg-gray-900">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r rounded-lg">
            Home
          </span>
        </Link>

        <div className="flex gap-2 md:order-2">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentUser.profilePicture} // Correct usage of the img prop in Avatar
                  rounded
                />
              }
              className="relative z-50"
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium text-white-300">
                  @{currentUser.username}
                </span>
                <span className="block truncate text-sm text-gray-900 font-medium">
                  {currentUser.email}
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
              <Dropdown.Item as="button" onClick={handleSignout}>
                Logout
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToPink" outline>
                Sign In
              </Button>
            </Link>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/announcements"} as={"div"}>
            <Link className="text-xl" to="/announcements">
              Announcements
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/report"} as={"div"}>
            <Link className="text-xl" to="/report">
              Report an event
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/safe-loc"} as={"div"}>
            <Link className="text-xl" to="/safe-loc">
              Nearby Safe Location
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link className="text-xl" to="/projects">
              Emergency contacts
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
