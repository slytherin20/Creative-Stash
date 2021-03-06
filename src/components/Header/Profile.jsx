import { useState } from "react";
import { Link } from "react-router-dom";

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
            <p>Orders</p>
          </div>
        )}
      </button>
    </>
  );
}

export default Profile;
