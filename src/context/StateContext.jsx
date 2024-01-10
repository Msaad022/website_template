import { createContext, useContext, useState } from "react";
import { fitmasterHost } from "../constants";
import toast from "react-hot-toast";

const Context = createContext();
Context.displayName = "Products_Context";

export const StateContext = ({ children }) => {

  const cartStore = async (id, qty, token) => {
    const response = await fetch(`${fitmasterHost}/cart/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity: qty,
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error! status: ${res.status}`);
      }

      return true;
    });
    return response;
  };
  const wishlistStore = async (id, token) => {
    const response = await fetch(`${fitmasterHost}/wishlist/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      }
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error! status: ${res.status}`);
      }

      return true;
    });
    return response;
  };
  const deleteStore = async (pathname, id, token) => {
    const response = await fetch(`${fitmasterHost}/${pathname}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error! status: ${res.status}`);
      }

      return true;
    });
    return response;
  };

  const creatPagination = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error! status: ${res.status}`);
    }
    return res.json();
  };
  const creatSortBy = async (val) => {
    let url = `${fitmasterHost}/products?sort_by=${val}&page=1`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error! status: ${res.status}`);
    }

    return res.json();
  };

  const addCart = async (id, qty, qtyMax) => {
    try {
      if (qty <= qtyMax && qty != 0) {
        let res = await cartStore(id, qty, "_token");
        if (res) {
          toast.success(`${qty} item was added to cart!`);
        }
      } else {
        toast(`Sorry, this product is not available now`, {
          duration: 3000,
          icon: "⛔",
        });
      }
    } catch (res) {
      toast.error(res.message);
    }
  };

  return (
    <Context.Provider
      value={{
        cartStore,
        deleteStore,
        wishlistStore,
        creatSortBy,
        creatPagination,
        addCart
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
