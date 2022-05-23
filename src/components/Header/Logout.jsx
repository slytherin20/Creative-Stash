import { getAuth, signOut } from "firebase/auth";

function Logout() {
  function signOutUser() {
    const auth = getAuth();
    signOut(auth);
  }
  return (
    <button
      className="btn login-btn bg-purple white ma2 pa2 b w4"
      onClick={signOutUser}
    >
      Logout
    </button>
  );
}

export default Logout;
