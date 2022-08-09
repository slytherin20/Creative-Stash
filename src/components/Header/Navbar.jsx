import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import LoginIcon from "./LoginIcon.jsx";
import CartIcon from "./CartIcon.jsx";
import CancelIcon from "../../images/close.png";
import Profile from "./Profile.jsx";
import CategoriesForMobile from "../Categories/CategoriesForMobile.jsx";
import HamburgerMenuIcon from "../../images/hamburger-menu.png";
import DeviceContext from "../DeviceContext.jsx";
import { useContext, useState } from "react";
import Modal from "../Modals/Modal.jsx";

function Navbar({ user, admin }) {
  const [showMenuStatus, setShowMenuStatus] = useState(false);
  const isMobile = useContext(DeviceContext);
  const body = document.getElementById("body");

  function showMenu() {
    setShowMenuStatus(!showMenuStatus);
    if (showMenuStatus === true) body.classList.remove("overflow-hidden");
  }
  function hideMenuHandler() {
    setShowMenuStatus(false);
    body.classList.remove("overflow-hidden");
  }

  return (
    <>
      <nav className="navbar  flex flex-column justify-center items-center pa1 shadow-1">
        <div className="flex w-100 justify-between items-center pa1">
          {isMobile ? (
            <button className="menu" onClick={showMenu}>
              {!showMenuStatus ? (
                <img src={HamburgerMenuIcon} alt="menu" />
              ) : (
                <img src={CancelIcon} alt="close menu" className="w-50 w-50" />
              )}
            </button>
          ) : (
            ""
          )}
          <Link to="/">
            <p className="b">Creative Stash</p>
          </Link>
          {!admin && !isMobile && <SearchBar />}
          <div className="flex justify-around">
            {user ? <Profile admin={admin} /> : null}
            {user ? "" : <LoginIcon color="bg-purple h2 ma1 mt2" btnText="" />}
            {!admin && <CartIcon />}
          </div>
        </div>
        {!admin && isMobile && <SearchBar isMobile={isMobile} />}
        {showMenuStatus && (
          <Modal>
            <CategoriesForMobile
              hideMenuHandler={hideMenuHandler}
              closeMenu={hideMenuHandler}
            />
          </Modal>
        )}
      </nav>
    </>
  );
}

export default Navbar;
