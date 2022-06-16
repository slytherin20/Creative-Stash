import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  function signOutUser() {
    navigate("/");
    const auth = getAuth();
    signOut(auth);
  }
  return (
    <button className="btn bg-black white ma2 pa2 b w4" onClick={signOutUser}>
      Logout
    </button>
  );
}

export default Logout;
