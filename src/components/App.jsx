import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase_config.js";
import { useState } from "react";
import AdminPortal from "./Admin/AdminPortal.jsx";
import Consumer from "./Consumer.jsx";

function App() {
  const [user, setUser] = useState(undefined);

  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user.uid);
    else setUser(null);
  });

  function checkIfAdmin() {
    if (user) {
      if (user === process.env.REACT_APP_ADMIN_UID) {
        return true;
      }
      return false;
    } else if (user === null) return false;
    else return false;
  }

  return checkIfAdmin() ? (
    <AdminPortal userid={user} />
  ) : (
    <Consumer userid={user ? user : undefined} />
  );
}

export default App;
