import { ProductError, Nav, Header } from "./components";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { StateContext } from "./context/StateContext";

import {
  Products,
  ProductsLoader,
  Checkout,
  CheckoutLoader,
  ProductDetails,
  DetailsLoader,
  ShoppingCart,
  CartLoader,
  Wishlist,
  WishlistLoader,
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Header />} errorElement={<ProductError />}>
      <Route
        path="/"
        loader={ProductsLoader}
        element={<Products />}
      />
      <Route
        path="/products/:id"
        element={<ProductDetails />}
        loader={DetailsLoader}
      />
      <Route
        index
        path="/checkout"
        element={<Checkout />}
        loader={CheckoutLoader}
      />
      <Route
        path="/shoppingCart"
        element={<ShoppingCart />}
        loader={CartLoader}
      />
      <Route
        path="/wishlist"
        element={<Wishlist />}
        loader={WishlistLoader}
      />
    </Route>
  )
);

function App() {
  return (
    <StateContext>
      <RouterProvider router={router} />
    </StateContext>
  );
}

export default App;
