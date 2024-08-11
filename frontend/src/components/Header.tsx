import {
  Navbar,
  Button,
  Dropdown,
  Avatar,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { Home, Bell, AlertTriangle, MapPin, PhoneCall, LogOut, User, Menu } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state: RootState) => state.user);

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

  return (
    <Navbar className="border-b-2 bg-white dark:bg-gray-900 px-4 lg:px-6 py-3">
      <Link to="/" className="flex items-center">
        <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-900 dark:text-white">
          <Home className="inline-block mr-2 h-6 w-6" />
          SafetyNet
        </span>
      </Link>

      <div className="flex items-center lg:order-2">
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={currentUser.profilePicture}
                rounded
                size="md"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-base font-semibold text-gray-900">@{currentUser.username}</span>
              <span className="block truncate text-sm font-medium text-gray-500">{currentUser.email}</span>
            </Dropdown.Header>
            <Dropdown.Item icon={User}>
              <Link to="/dashboard?tab=profile" className="text-sm">Profile</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={LogOut} onClick={handleSignout} className="text-sm text-red-600 hover:bg-red-50">
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button color="blue" size="md" className="font-semibold">
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle className="ml-3">
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </Navbar.Toggle>
      </div>

      <Navbar.Collapse>
        <NavItem icon={Bell} to="/announcements" active={path === "/announcements"}>
          Announcements
        </NavItem>
        <NavItem icon={AlertTriangle} to="/report" active={path === "/report"}>
          Report an Event
        </NavItem>
        <NavItem icon={MapPin} to="/safe-loc" active={path === "/safe-loc"}>
          Safe Locations
        </NavItem>
        <NavItem icon={PhoneCall} to="/emergency" active={path === "/emergency"}>
          Emergency Contacts
        </NavItem>
      </Navbar.Collapse>
    </Navbar>
  );
};

const NavItem = ({ icon: Icon, to, active, children }: { icon: React.ComponentType<any>, to: string, active: boolean, children: React.ReactNode }) => (
  <Navbar.Link 
    as="div" 
    active={active}
  >
    <Link to={to} className="flex items-center text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white">
      <Icon className="w-5 h-5 mr-2" />
      {children}
    </Link>
  </Navbar.Link>
);

export default Header;