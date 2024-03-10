import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect } from "react";
import NotFound from "../NotFound";
import { useState } from "react";
import fetchCategories from "../../data/fetchCategories";
import addProduct from "../../data/addProduct";
import Modal from "../Modals/Modal";
import Loading from "../Modals/Loading";
import ProductAdded from "../Modals/productAdded";
import ErrorPage from "../Modals/ErrorPage";
import { Categories, UserInput } from "../../interfaces/app_interface";

type CustomInputType = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | FocusEvent
function AddProducts({ userUID }:{userUID:string}) {
  let initialState = {
    cat: "",
    subcat: "",
    name: "",
    price: 1,
    description: "",
    count: 1,
    img:null,
    imgSrc:"",
    brand: "",
  };
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Categories>();
  const [inputs, setInputs] = useState<UserInput>(initialState);
  const [addProductStatus, setAddProductStatus] = useState<string>("");

  useEffect(() => {
    if (userUID !== process.env.REACT_APP_ADMIN_UID) {
      navigate("/");
    } else {
      getAllItems();
    }
  }, []);

  async function getAllItems():Promise<void> {
    let cat:Categories = await fetchCategories();
    setCategories(cat);
  }

  function changeInputHandler(e:CustomInputType) {
    let { name, value } = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function uploadImage(e:ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if(file){
        const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onload = ()=>{
          const src= reader.result;
          if(typeof src=='string')
          setInputs({ ...inputs, img: file,imgSrc:src });
        }
      }
    }
  }
  async function submitProductDetails(e:FormEvent<HTMLFormElement>){
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
          <label htmlFor="category" className="ma2 w-60 flex justify-between">
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
          <label
            htmlFor="subcategory"
            className="ma2 w-60 flex justify-between"
          >
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
              {inputs.cat && categories && categories[inputs.cat].map((subcat:string) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="name" className="ma2 w-60 flex justify-between">
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
          <label htmlFor="brand" className="ma2 w-60 flex justify-between">
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
          <label
            htmlFor="Description"
            className="ma2 w-60 flex justify-between"
          >
            Add description:
            <textarea
              name="description"
              value={inputs.description}
              onChange={changeInputHandler}
              onBlur={changeInputHandler}
              required
            ></textarea>
          </label>
          <label htmlFor="Price" className="ma2 w-60 flex justify-between">
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
          <label
            htmlFor="number-items"
            className="ma2 w-60 flex justify-between"
          >
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
          <article className="ma2 w-60 flex flex-column">
            {inputs.img ? (
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

export default AddProducts;
