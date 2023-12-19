import { ProductError, Header } from "./components";
import { defer } from "react-router-dom";
import { fitmasterHost } from "./constants";
import {
  Products,
  ProductDetails,
  ShoppingCart,
  Wishlist,
  Checkout,
} from "./pages";
import './app.css'
export const routes = [
  {
    element: <Header />,
    errorElement: <ProductError />,
    children: [
      {
        path: "products",
        loader: productsLoader,
        element: <Products />,
      },
      {
        path: "products/:id",
        loader: detailsLoader,
        element: <ProductDetails />,
      },
      {
        path: "shoppingCart",
        loader: shopingLoader,
        element: <ShoppingCart />,
      },
      {
        path: "wishlist",
        loader: wishlistLoader,
        element: <Wishlist />,
      },
      {
        path: "checkout",
        loader: checkoutLoader,
        element: <Checkout />,
      },
    ],
  },
];

async function fetchData(url, msg) {
  const res = await fetch(`${fitmasterHost}${url}`);
  if (!res.ok) {
    throw Error(`Could not find that ${msg}`);
  }
  let data = await res.json()
  console.log(data);
  return data;
}

export function productsLoader() {
  return fetchData("/products?sort_by=latest&page=1", "Products");
}
export function shopingLoader() {
  return fetchData("/cart?page=1", "Carts");
}
export function wishlistLoader() {
  return fetchData("/wishlist?page=1", "Wishlist");
}
export function checkoutLoader() {
  return {msg: 'test'};
}

export async function detailsLoader({ params }) {
  const postId = params.id;
  const resProduct = await fetch(`${fitmasterHost}/products/${postId}/`);
  const resRelated = await fetch(
    `${fitmasterHost}/products/${postId}/related/`
  );
  if (!resProduct.ok) {
    throw Error("Could not find that Product id");
  }

  const product = await resProduct.json();
  const { data } = await resRelated.json();
  return defer({ product: await product, productRelated: data });
}