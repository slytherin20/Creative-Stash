import addToWishlist from "../../data/addToWishlist";
import checkItemWishlisted from "../../data/checkItemWishlisted";
import removeFromWishlist from "../../data/removeFromWishlist";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import DeviceContext from "../DeviceContext.jsx";
import HeartIcon from "../../images/heart.png";
import HeartedIcon from "../../images/hearted.png";
import Modal from "../Modals/Modal.jsx";
import { TailSpin } from "react-loader-spinner";
import { AuthContext } from "../App.jsx";

function Item({ item, cat, subcat, addToCart }) {
  const [wishlist, setWishlist] = useState({ status: false, id: -1 });
  const [loading, setLoading] = useState({ status: false, text: "" });
  const uid = useContext(AuthContext);

  const { isMobile } = useContext(DeviceContext);
  useEffect(() => {
    if (uid) wishlistStatus(item.id);
  }, []);

  async function wishlistStatus(id) {
    let wishlistPromise = checkItemWishlisted(id);
    // let imagePromise = fetchProductImg(item.id);
    let responses = await Promise.all([wishlistPromise]);
    let [status, wishlistId] = responses[0];
    // let res = responses[1];
    setWishlist({
      status: status,
      id: wishlistId,
    });
    // setImg(res);
  }

  // async function fetchImage(id) {
  //   let res = await fetchProductImg(id);
  //   setImg(res);
  // }

  function removeWishlisted(id) {
    setLoading({ status: true, text: "Removing from wishlist" });
    removeFromWishlist(id);
    setWishlist({
      status: false,
      id: -1,
    });
    setLoading({ status: false, text: "" });
  }

  async function addWishlisted(item, uid) {
    setLoading({ status: true, text: "Adding to wishlist" });
    await addToWishlist(item, uid);
    wishlistStatus(item.id);
    setLoading({ status: false, text: "" });
  }

  return (
    <>
      <div
        key={item.id}
        className={`flex flex-column justify-center 
        ${isMobile ? "items-mobile-size" : "items-size"}
       items-center pa2`}
      >
        {!cat ? (
          <Link
            to={`/products/product?cat=${item.category.split("-")[0]}&subcat=${
              item.category.split("-")[1]
            }&id=${item.id}`}
            className="flex flex-column justify-center items-center"
          >
            <img
              src={process.env.REACT_IMG_URL + item.cloudinaryId}
              alt={item.name}
              className={` ${isMobile ? "item-icons" : "item-mobile-icons"}`}
            />
            {/* ) : (
              <div className="w-20 h-100 bg-white flex justify-center items-center">
                <TailSpin width={20} height={20} color="purple" />
              </div>
            )} */}
            <p
              className={`ma0 mt2 tc ${
                isMobile ? " item-mobile-name mb2" : "item-name b"
              }`}
            >
              {isMobile ? item.name.slice(0, 20) : item.name.slice(0, 50)}...
            </p>
            <p className="ma0 mt2 f6 tc">{item.description.slice(0, 40)}...</p>
            <p>Price: ₹{item.price}</p>
            {item.status ? "" : <p className="red">Out of Stock</p>}
          </Link>
        ) : (
          <Link
            to={`/products/product?cat=${
              cat.split("-")[0]
            }&subcat=${subcat}&id=${item.id}`}
            className="flex flex-column justify-center items-center"
          >
            {/* {img != undefined ? ( */}
            <img
              src={process.env.REACT_IMG_URL + item.cloudinaryId}
              alt={item.name}
              className={` ${isMobile ? "item-icons" : "item-mobile-icons"}`}
            />
            {/* ) : (
              <div className="w-20 h-100 bg-white flex justify-center items-center">
                <TailSpin width={20} height={20} color="purple" />
              </div>
            )} */}
            <p
              className={`ma0 mt2 tc ${
                isMobile ? "item-mobile-name mb2" : "item-name b"
              }`}
            >
              {isMobile ? item.name.slice(0, 20) : item.name.slice(0, 50)}...
            </p>
            <p className="ma0 mt2 f6 tc">{item.description.slice(0, 40)}...</p>
            <p>Price: ₹{item.price}</p>
            {item.status ? "" : <p className="red">Out of Stock</p>}
          </Link>
        )}
        <div className="flex justify-around w-80 items-center">
          {wishlist.status && uid ? (
            <button
              onClick={() => removeWishlisted(wishlist.id)}
              className="flex bn bg-white"
            >
              <img src={HeartedIcon} alt="wishlisted" className="wishlist" />
            </button>
          ) : (
            uid && (
              <button
                onClick={() => addWishlisted(item, uid)}
                className="flex bn bg-white"
              >
                <img src={HeartIcon} alt="wishlist" className="wishlist" />
              </button>
            )
          )}
          {item.status ? (
            <button
              className=" btn buy-btn h2 bg-purple white f6 br1 mt1"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>
          ) : null}
        </div>
      </div>
      {loading.status ? (
        <Modal>
          <div className="pa3 bg-white flex flex-column justify-center items-center">
            <TailSpin width={20} height={20} color="purple" />
            <p className="black">{loading.text}...</p>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default Item;
