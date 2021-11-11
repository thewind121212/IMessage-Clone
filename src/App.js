import React, { useEffect } from "react";
import "./App.css";
import Imessage from "./components/Imessage.component";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logIn, logOut } from "./redux/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login.component";

function App() {
  const user = useSelector(selectUser);
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          logIn({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  }, [auth, dispatch]);

  console.log(user);
  return <div className="App">{user ? <Imessage /> : <Login />}</div>;
}

export default App;
