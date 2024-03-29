import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase_config";
import { createContext, useState } from "react";
import AdminPortal from "./Admin/AdminPortal";
import Consumer from "./Consumer";
import { useMediaQuery } from "react-responsive";
import DeviceContext from "./DeviceContext";

export const AuthContext = createContext<undefined | null | string>(undefined);

function App() {
  const [user, setUser] = useState<undefined | null | string>(undefined);
  const isMobile:boolean = useMediaQuery({ query: "(max-width:480px)" });
  const isTablet:boolean = useMediaQuery({ query: "(max-width:1224px)" });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      auth.currentUser?.getIdToken()
        .then(function (idtoken) {
          sessionStorage.setItem("tokenId", idtoken);
          setUser(user.uid);
        })
        .catch((err) => {
          console.log("Error fetching authentication token", err);
        });
    } else setUser(null);
  });

  function checkIfAdmin(): boolean {
    if (user) {
      if (user === process.env.REACT_APP_ADMIN_UID) {
        return true;
      }
      return false;
    } else if (user === null) return false;
    else return false;
  }

  return checkIfAdmin() ? (
    <AdminPortal userid={user!} />
  ) : (
    <DeviceContext.Provider value={{ isMobile: isMobile, isTablet: isTablet }}>
      <AuthContext.Provider value={user}>
        <Consumer />
      </AuthContext.Provider>
    </DeviceContext.Provider>
  );
}

export default App;
