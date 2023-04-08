import NotesPagesLoggedInView from "../components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import { User } from "../models/user";



interface NotesPageProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
}
const NotesPage = ({ loggedInUser, onSignUpClicked }: NotesPageProps) => {
    return <>
        {loggedInUser ? <NotesPagesLoggedInView /> : <NotesPageLoggedOutView onSignUpClicked={onSignUpClicked} />}

    </>;
};

export default NotesPage;
