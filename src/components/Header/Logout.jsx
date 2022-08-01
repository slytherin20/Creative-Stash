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
    <input
      type="button"
      value="Logout"
      className="btn bg-black white ma2 pa2 b w4"
      onClick={signOutUser}
    />
  );
}

export default Logout;
