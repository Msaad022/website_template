import { ProductError, Header } from "./components";
import { defer, useLoaderData } from "react-router-dom";
import { fitmasterHost } from "./constants";
import {
  Products,
  ProductDetails,
  Cart,
  Wishlist,
  Checkout,
} from "./pages";
import './app.css'
export const routes = [
  {
    path: "/products",
    element: <Header />,
    errorElement: <ProductError />,
    children: [
      {
        index: true,
        loader: productsLoader,
        element: <Products/> 
      },
      {
        path: ":id",
        loader: detailsLoader,
        // element: <ProductDetails/>,
        element: <Test name="ProductDetails"/>,

      },
      {
        path: "cart",
        loader: cartLoader,
        // element: <Cart/>,
        element: <Test name="Cart"/>,

      },
      {
        path: "wishlist",
        loader: wishlistLoader,
        // element: <Wishlist/>,
        element: <Test name="Wishlist"/>,

      },
      {
        path: "checkout",
        loader: checkoutLoader,
        // element: <Checkout/>,
        element: <Test name="Checkout"/>,

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
  // console.log(data);
  return data;
}

export function productsLoader() {
  return fetchData("/products?sort_by=latest&page=1", "Products");
}
export function cartLoader() {
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

export function Test({name}){
  let data = useLoaderData()
    console.log(data);
  return <h1>{name}</h1>
}