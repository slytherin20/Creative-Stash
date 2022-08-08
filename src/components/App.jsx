import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase_config.js";
import { useState } from "react";
import AdminPortal from "./Admin/AdminPortal.jsx";
import Consumer from "./Consumer.jsx";
import { useMediaQuery } from "react-responsive";
import DeviceContext from "./DeviceContext.jsx";
function App() {
  const [user, setUser] = useState(undefined);
  const isMobile = useMediaQuery({ query: "(max-width:480px)" });
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
    <DeviceContext.Provider value={isMobile}>
      <Consumer userid={user ? user : undefined} />
    </DeviceContext.Provider>
  );
}

export default App;
