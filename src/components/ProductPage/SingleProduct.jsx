import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
function SingleProduct({ fetchCartHandler }) {
  const [product, setProduct] = useState({});
  const [searchParams] = useSearchParams();
  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    let res = await fetch("http://localhost:3000/Products");
    let data = await res.json();
    data = data[searchParams.get("cat")];
    data = data[searchParams.get("subcat")];
    data = data.filter((item) => item.id == searchParams.get("id"));
    setProduct(...data);
  }

  async function addToCart() {
    await fetch("http://localhost:3000/Cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then(() => fetchCartHandler())
      .catch((err) => console.log(err));
  }
  return (
    <main className="single-product flex ma4">
      <aside className="w-50">
        <img src={product.image} alt={product.name} className="w-80 h-80" />
      </aside>
      <section className="w-50 flex flex-column">
        <h2>{product.name}</h2>
        <h2>
          Price: <span className="price-color">₹{product.price}/-</span>
        </h2>
        <p className="f4 pa2">{product.description}</p>
        <article className="w-60 flex justify-between self-center">
          <input
            type="button"
            value="Add to Cart"
            className="login-btn bg-yellow btn"
            onClick={addToCart}
          />
          <input
            type="button"
            value="Buy"
            className="login-btn bg-yellow btn"
          />
        </article>
      </section>
    </main>
  );
}
export default SingleProduct;
