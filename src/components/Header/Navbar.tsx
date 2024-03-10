import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import LoginIcon from "./LoginIcon";
import CartIcon from "./CartIcon";
import CancelIcon from "../../images/close.png";
import Profile from "./Profile";
import CategoriesForMobile from "../Categories/CategoriesForMobile";
import HamburgerMenuIcon from "../../images/hamburger-menu.png";
import logo from "../../images/logo.png";
import DeviceContext from "../DeviceContext";
import { useContext, useState } from "react";
import Modal from "../Modals/Modal";
import { AuthContext } from "../App";

function Navbar({ admin,userid }:{admin:boolean,userid:null | string}) {
  const [showMenuStatus, setShowMenuStatus] = useState<boolean>(false);
  const { isMobile } = useContext(DeviceContext);
  const body = document.getElementById("body");
  const navigate = useNavigate();
  const user = userid || useContext(AuthContext);
 
  function showMenu():void {
    setShowMenuStatus(!showMenuStatus);
    if (showMenuStatus === true) body!.classList.remove("overflow-hidden");
  }
  function hideMenuHandler(link:string) {
    setShowMenuStatus(false);
    body!.classList.remove("overflow-hidden");
    navigate(link);
    window.location.reload();
  }

  function closeMobileMenu() {
    setShowMenuStatus(false);
    body!.classList.remove("overflow-hidden");
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
            <img src={logo} alt="creative stash" className="logo-img" />
          </Link>
          {!admin && !isMobile && <SearchBar isMobile={isMobile}/>}
          <div className="flex justify-around">
            {user ? (
              <Profile admin={admin} />
            ) : (
              <LoginIcon color="bg-purple h2 ma1 mt2" btnText="" />
            )}
            {!admin && <CartIcon />}
          </div>
        </div>
        {!admin && isMobile && <SearchBar isMobile={isMobile} />}
        {showMenuStatus && (
          <Modal>
            <CategoriesForMobile
              hideMenuHandler={hideMenuHandler}
              closeMenu={closeMobileMenu}
            />
          </Modal>
        )}
      </nav>
    </>
  );
}

export default Navbar;
