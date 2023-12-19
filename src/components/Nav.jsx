import { Link, Outlet } from "react-router-dom";
const Nav = () => {
  return (
    <>
      <div>
        <ul style={{ display: "flex", gap: "20px", margin: "20px" }}>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
          <li>
            <Link to="/products/3">ProductDetails</Link>
          </li>
          <li>
            <Link to="/shoppingCart">ShoppingCart</Link>
          </li>
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
        </ul>
      </div>
      <Outlet />

    </>
  );
};

export default Nav;
