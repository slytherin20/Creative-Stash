import { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout.jsx";

function Profile() {
  const [showMenu, setShowMenu] = useState(false);

  function showMenuHandler() {
    setShowMenu(true);
  }
  function hideMenuHandler() {
    setShowMenu(false);
  }
  return (
    <>
      <button
        className="btn bg-purple white relative"
        onMouseOver={showMenuHandler}
        onFocus={showMenuHandler}
        onMouseLeave={hideMenuHandler}
        onBlur={hideMenuHandler}
      >
        Profile
        {showMenu && (
          <div className="bg-white black  z-999 profile shadow-1">
            <Link to="/billing-details">
              <p className="bb border-bottom pa2">Billing Address</p>
            </Link>
            <Link to="/orders">
              <p>Orders</p>
            </Link>
            <Link to="/wishlist">
              <p>Wishlist</p>
            </Link>
            <Logout />
          </div>
        )}
      </button>
    </>
  );
}

export default Profile;
