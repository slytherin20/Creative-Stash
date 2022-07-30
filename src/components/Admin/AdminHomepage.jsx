import { Link } from "react-router-dom";
function AdminHomepage() {
  return (
    <section>
      <Link to="/add-products">
        <button>Add Products</button>
      </Link>
      <Link to="/orders-received">
        <button>Orders Placed</button>
      </Link>
    </section>
  );
}

export default AdminHomepage;
