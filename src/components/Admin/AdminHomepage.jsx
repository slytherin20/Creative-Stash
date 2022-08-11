import { Link } from "react-router-dom";
function AdminHomepage() {
  return (
    <section className="w-100 vh-100 flex flex-column justify-center items-center">
      <Link to="/add-products">
        <button className="w4 h2 border-purple bg-white purple btn ma2">
          Add Products
        </button>
      </Link>
      <Link to="/orders-received">
        <button className="w4 h2 border-purple bg-white purple btn ma2">
          Orders Placed
        </button>
      </Link>
    </section>
  );
}

export default AdminHomepage;
