import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase_config.js";
import { createContext, useState } from "react";
import AdminPortal from "./Admin/AdminPortal.jsx";
import Consumer from "./Consumer.jsx";
import { useMediaQuery } from "react-responsive";
import DeviceContext from "./DeviceContext.jsx";

export const AuthContext = createContext(undefined);

function App() {
  const [user, setUser] = useState(undefined);
  const isMobile = useMediaQuery({ query: "(max-width:480px)" });
  const isTablet = useMediaQuery({ query: "(max-width:1224px)" });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      auth.currentUser
        .getIdToken()
        .then(function (idtoken) {
          sessionStorage.setItem("tokenId", idtoken);
          setUser(user.uid);
        })
        .catch((err) => {
          console.log("Error fetching authentication token", err);
        });
    } else setUser(null);
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
    <DeviceContext.Provider value={{ isMobile: isMobile, isTablet: isTablet }}>
      <AuthContext.Provider value={user}>
        <Consumer />
      </AuthContext.Provider>
    </DeviceContext.Provider>
  );
}

export default App;
