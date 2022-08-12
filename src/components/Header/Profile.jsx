import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout.jsx";
import ProfileIcon from "../../images/profile.png";
import DeviceContext from "../DeviceContext.jsx";
function Profile({ admin }) {
  const [showMenu, setShowMenu] = useState(false);
  const { isMobile, isTablet } = useContext(DeviceContext);

  function showMenuHandler() {
    if (!isMobile && !isTablet) setShowMenu(true);
  }
  function hideMenuHandler() {
    if (!isMobile && !isTablet) setShowMenu(false);
  }

  function mobileTabletMenuHandler() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <button
        className={`btn bg-white black relative ${admin ? "mr5" : ""}`}
        onMouseOver={showMenuHandler}
        onFocus={showMenuHandler}
        onMouseLeave={hideMenuHandler}
        onBlur={hideMenuHandler}
        onClick={mobileTabletMenuHandler}
      >
        <img src={ProfileIcon} alt="profile" />
        {showMenu && !admin && (
          <div className="bg-white black  z-999 profile shadow-1">
            <Link to="/billing-details" className="ma2">
              <p className="bb border-bottom pa1 ma0">Billing Address</p>
            </Link>
            <Link to="/orders" className="ma2">
              <p className="bb border-bottom pa1 ma0">Orders</p>
            </Link>
            <Link to="/wishlist" className="ma2">
              <p className="bb border-bottom pa1 ma0">Wishlist</p>
            </Link>
            <Logout />
          </div>
        )}
        {showMenu && admin && (
          <div className="bg-white black  z-999 profile shadow-1 pa1">
            <Logout />
          </div>
        )}
      </button>
    </>
  );
}

export default Profile;
