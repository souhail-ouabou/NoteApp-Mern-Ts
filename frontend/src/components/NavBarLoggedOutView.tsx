import { Button } from "flowbite-react";

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked }: NavBarLoggedOutViewProps) => {
    return (
        <div className="flex gap-2">
            <Button onClick={onLoginClicked}>Login</Button>
            <Button onClick={onSignUpClicked}>Sign Up</Button>
        </div>);
}

export default NavBarLoggedOutView;