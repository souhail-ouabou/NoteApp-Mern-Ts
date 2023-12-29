import { Avatar, Dropdown } from "flowbite-react";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}
const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {
    async function logout() {
        try {
            await NotesApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <div className="flex items-center justify-center">
            <Dropdown
                arrowIcon={false}
                inline={true}
                label={<Avatar alt="User settings" img={user.avatar} rounded={true} />}
            >
                <Dropdown.Header>
                    <span className="block text-sm">
                        {user.username}
                    </span>
                    <span className="block truncate text-sm font-medium">
                        {user.email}
                    </span>
                </Dropdown.Header>
                <Dropdown.Item onClick={logout}>
                    Log out
                </Dropdown.Item>
            </Dropdown>
            <span className="self-center whitespace-nowrap m-3 font-semibold dark:text-white">
                {user.username}
            </span>
        </div >);
}

export default NavBarLoggedInView;