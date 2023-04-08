import { Navbar } from "flowbite-react/lib/esm/components";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import { Link } from "react-router-dom";


interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}


const NavBar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) => {
    return (<Navbar
        fluid={true}
        rounded={true}
        className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">

        <Navbar.Brand as={Link} to="/">
            <img
                src="https://i.pinimg.com/originals/b6/cd/e8/b6cde81d1c489b0e20d85a6e06c5f8f9.png"
                className="mr-1 h-6 sm:h-9"
                alt="Note App Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Note App
            </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
            {loggedInUser
                ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
                : <NavBarLoggedOutView onSignUpClicked={onSignUpClicked} onLoginClicked={onLoginClicked} />
            }

            <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
            <Navbar.Link
                as={Link} to="/"
                active={true}
            >
                Home
            </Navbar.Link>
            <Navbar.Link as={Link} to="/privacy">
                Privacy
            </Navbar.Link>
            <Navbar.Link as={Link} to="https://github.com/souhail-ouabou/NoteApp-Mern-Ts">
                Repo
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
    );
}

export default NavBar;