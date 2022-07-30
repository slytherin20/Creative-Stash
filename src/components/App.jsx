import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase_config.js";
import AdminPortal from "./Admin/AdminPortal.jsx";
import Consumer from "./Consumer.jsx";
function App() {
  const [user] = useAuthState(auth);

  function checkIfAdmin() {
    if (user) {
      console.log(process.env.REACT_APP_ADMIN_UID);
      if (user.uid === process.env.REACT_APP_ADMIN_UID) {
        return true;
      }
      return false;
    } else return false;
  }

  return checkIfAdmin() ? (
    <AdminPortal userid={user.uid} />
  ) : (
    <Consumer userid={user ? user.uid : undefined} />
  );
}

export default App;
