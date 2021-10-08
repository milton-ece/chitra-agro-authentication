import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import logo from './logo.svg';
import './App.css';
import initializeAuthentication from './firebase/firebase.initialize';
import { useState } from 'react';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubprovider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState({})
  const auth = getAuth();

  const handleGoogleSignIn = () => {

    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        // console.log(user);
        const logedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(logedInUser);
      })
  }
  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitHubprovider)
      .then(result => {
        // const user = result.user;
        // console.log(user);
        const { displayName, photoURL } = result.user;
        const logedInUser = {
          name: displayName,
          photo: photoURL
        };
        setUser(logedInUser);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
  }
  return (
    <div className="App">
      {!user.name ?
        <div>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <br />
          <button onClick={handleGitHubSignIn}>GitHub Sign In</button>
        </div> :

        <button onClick={handleSignOut}>Sign Out</button>}
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email ID: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
