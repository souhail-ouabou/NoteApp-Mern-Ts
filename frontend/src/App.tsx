import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as NotesApi from "./network/notes_api";
import NotFoundPage from './pages/NotFoundPage';
import NotesPage from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';

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
    <BrowserRouter>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignupModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <>
        <Routes>
          <Route path='/' element={<NotesPage loggedInUser={loggedInUser} onSignUpClicked={() => setShowSignupModal(true)} />} />
          <Route path='/privacy' element={<PrivacyPage />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </>
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
    </BrowserRouter>
  );
}

export default App;
