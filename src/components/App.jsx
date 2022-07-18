import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase_config.js";
import AdminPortal from "./Admin/AdminPortal.jsx";
import Consumer from "./Consumer.jsx";

function App() {
  const [user] = useAuthState(auth);

  function checkIfAdmin() {
    if (user) {
      if (user.uid === "Vdq0x9H1lghqPDr9sSnd8dElHkw1") {
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
