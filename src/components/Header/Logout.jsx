import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  function signOutUser() {
    navigate(process.env.REACT_APP_URI);
    const auth = getAuth();
    signOut(auth);
  }
  return (
    <input
      type="button"
      value="Logout"
      className="btn bg-white w-100 black b pb2"
      onClick={signOutUser}
    />
  );
}

export default Logout;
