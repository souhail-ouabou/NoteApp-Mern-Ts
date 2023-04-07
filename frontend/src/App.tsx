import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { useEffect, useState } from 'react';
import { User } from './models/user';
import * as NotesApi from "./network/notes_api"
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';
import NotesPagesLoggedInView from './components/NotesPageLoggedInView';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [showSignUpModal, setShowSignupModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.log(error);

      }
    }
    fetchLoggedInUser();
  }, []);


  return (
    <>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignupModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />


      {loggedInUser ? <NotesPagesLoggedInView /> : <NotesPageLoggedOutView onSignUpClicked={() => setShowSignupModal(true)}  />}

      {showSignUpModal &&
        <SignUpModal
          onDismiss={() => setShowSignupModal(false)}
          showModal={true}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignupModal(false)
          }}
        />
      }
      {showLoginModal &&
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      }
    </>
  );
}

export default App;
