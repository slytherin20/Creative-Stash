import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NotFound from "../NotFound.jsx";
import { useState } from "react";
import fetchCategories from "../../data/fetchCategories.jsx";
import addProduct from "../../data/addProduct.jsx";
import Modal from "../Modals/Modal.jsx";
import Loading from "../Modals/Loading.jsx";
import ProductAdded from "../Modals/productAdded.jsx";
import ErrorPage from "../Modals/ErrorPage.jsx";
function Admin({ userUID }) {
  let initialState = {
    cat: "",
    subcat: "",
    name: "",
    price: 1,
    description: "",
    count: 1,
    imgSrc: "",
    brand: "",
  };
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [inputs, setInputs] = useState(initialState);
  const [addProductStatus, setAddProductStatus] = useState("");

  useEffect(() => {
    if (userUID !== process.env.REACT_APP_ADMIN_UID) {
      navigate("/");
    } else {
      getAllItems();
    }
  }, []);

  async function getAllItems() {
    let cat = await fetchCategories();
    setCategories(cat);
  }

  function changeInputHandler(e) {
    let { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function uploadImage(e) {
    if (e.target.files[0]) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setInputs({ ...inputs, imgSrc: reader.result });
    }
  }
  async function submitProductDetails(e) {
    e.preventDefault();
    setAddProductStatus("loading");
    let status = await addProduct(inputs);
    setAddProductStatus(status);
    setInputs(initialState);
  }

  if (userUID && userUID === process.env.REACT_APP_ADMIN_UID)
    return (
      <section className="w-90 flex flex-column justify-center items-center">
        <h2>Product details</h2>
        <form
          onSubmit={submitProductDetails}
          className="w-100 flex flex-column justify-center items-center"
        >
          <label htmlFor="category" className="ma2">
            Product Category:
            <select
              value={inputs.cat}
              name="cat"
              onChange={changeInputHandler}
              onBlur={changeInputHandler}
              required
            >
              <option value="">---Select Category---</option>
              {categories &&
                Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="subcategory" className="ma2">
            Product Sub Category:
            <select
              value={inputs.subcat}
              name="subcat"
              onChange={changeInputHandler}
              onBlur={changeInputHandler}
              required
            >
              <option value="">
                {inputs.cat ? "Select Subcategory" : "Select Category first"}
              </option>
              {inputs.cat &&
                categories[inputs.cat].map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="name" className="ma2">
            Product Name:
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={changeInputHandler}
              onBlur={changeInputHandler}
              required
            />
          </label>
          <label htmlFor="brand" className="ma2">
            Product Brand:
            <input
              type="text"
              name="brand"
              value={inputs.brand}
              onChange={changeInputHandler}
              onBlur={changeInputHandler}
              required
            />
          </label>
          <label htmlFor="Description" className="ma2">
            Add description:
            <textarea
              name="description"
              value={inputs.description}
              onChange={changeInputHandler}
              onBlur={changeInputHandler}
              required
            ></textarea>
          </label>
          <label htmlFor="Price" className="ma2">
            Price:
            <input
              type="number"
              min="1"
              name="price"
              value={inputs.price}
              onChange={changeInputHandler}
              onBlur={changeInputHandler}
              required
            />
          </label>
          <label htmlFor="number-items" className="ma2">
            Number of product:
            <input
              type="number"
              min="1"
              name="count"
              value={inputs.count}
              onChange={changeInputHandler}
              onBlur={changeInputHandler}
              required
            />
          </label>
          <article className="ma2 flex flex-column">
            {inputs.imgSrc ? (
              <img
                src={inputs.imgSrc}
                alt="uploaded"
                className="show-product-img"
              />
            ) : null}
            <label htmlFor="image">
              Add product image:
              <input
                type="file"
                accept="image/*"
                name="imgScr"
                onChange={uploadImage}
                onBlur={uploadImage}
                required
              />
            </label>
          </article>
          <button className="btn bg-purple h2 white">Add Product</button>
        </form>
        {addProductStatus === "loading" ? (
          <Modal>
            <Loading />
          </Modal>
        ) : addProductStatus === "success" ? (
          <Modal>
            <ProductAdded showModal={() => setAddProductStatus("")} />
          </Modal>
        ) : addProductStatus === "error" ? (
          <Modal>
            <ErrorPage showModal={() => setAddProductStatus("")} />
          </Modal>
        ) : (
          ""
        )}
      </section>
    );
  else return <NotFound />;
}

export default Admin;
