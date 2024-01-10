import { useState } from "react";
import { SectionWrapper } from "../hoc";
import { Link, useLoaderData } from "react-router-dom";
import { PriceProduct, SwiperPagination, Breadcrumb } from "../components";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { fitmasterHost } from "../constants";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
const Cart = () => {
  const { cartStore, deleteStore, creatPagination } = useStateContext();

  const data = useLoaderData();
  const [cartProducts, setCartProducts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: {
      items,
      paginate: { total_pages },
    },
    extra: { total_cost },
  } = cartProducts;
  const updateCart = async () => {
    try {
      const res = await fetch(`${fitmasterHost}/cart?page=${currentPage}`);
      if (!res.ok) {
        throw new Error("Could not find that Carts");
      }

      let data = await res.json();
      toast.success("Updated success");
      setCartProducts(data);
    } catch (res) {
      toast.error(res.message);
    }
  };
  const paginationdHandler = async (pageIndex) => {
    let page = pageIndex;
    let url = `${fitmasterHost}/cart?page=${currentPage}`;
    try {
      setCurrentPage(page);
      let result = await creatPagination(url);
      setCartProducts(result);
    } catch (res) {
      toast.error(res.message);
    }
  };

  const parseNum = (total) => {
    return Number(parseFloat(total).toFixed(2));
  };

  const cartActionDelete = async (index, id, event) => {
    try {
      event.preventDefault();

      let filterItems = items.filter((item) => item.id !== id);

      let { data, extra } = cartProducts;
      let item = data.items[index];
      extra.total_cost = parseNum(extra.total_cost - item.total);

      let res = await deleteStore("cart", id, "_token");
      if (res) {
        setCartProducts({
          ...cartProducts,
          data: { items: filterItems, paginate: cartProducts.data.paginate },
          extra: extra,
        });

        toast.success("One item was deleted!");
      }
    } catch (res) {
      toast.error(res.message);
    }
  };

  const updateCartQuantity = async (
    event,
    index,
    product_id,
    quantity,
    type
  ) => {
    try {
      event.preventDefault();

      let { data, extra } = cartProducts;
      let item = data.items[index];

      if (quantity > item.max_quantity) {
        item.quantity = item.max_quantity;
        let oldTotle = item.total;
        item.total = parseNum(item.quantity * item.new_price);
        extra.total_cost = parseNum(extra.total_cost + item.total - oldTotle);
      } else {
        if (type == "inc") {
          if (quantity < item.max_quantity) {
            item.quantity++;
            item.total = parseNum(item.total + item.new_price);
            extra.total_cost = parseNum(extra.total_cost + item.new_price);
          }
        } else {
          if (quantity < 0) {
            item.quantity = 1;
            item.total = parseNum(item.new_price);
            extra.total_cost = parseNum(extra.total_cost + item.new_price);
          } else if (quantity > 1) {
            item.quantity--;
            item.total = parseNum(item.total - item.new_price);
            extra.total_cost = parseNum(extra.total_cost - item.new_price);
          }
        }
      }
      if (quantity != item.quantity) {
        let res = await cartStore(product_id, item.quantity, "_token");
        if (!(res instanceof Error)) {
          setCartProducts({
            ...cartProducts,
            data: data,
            extra: extra,
          });
        }
      }
    } catch (res) {
      toast.error(res.message);
    }
  };
  return (
    <>
      {/* <!-- Start Page Title Area --> */}
      <Breadcrumb mainPage="Products" page="Cart" />
      {/* <!-- End Page Title Area --> */}

      {/* <!-- Start Shopping Cart Area --> */}
      <section className="w-11/12 m-auto py-14 px-6">
        <div className="py-5">
          <div className="border overflow-x-hidden">
            <div className=" overflow-x-auto">
              <table className="grid min-w-[768px]">
                <thead>
                  <tr className="border-b grid grid-cols-6 items-center text-center py-3">
                    <th scope="col">Trash</th>
                    <th scope="col">Image</th>
                    <th scope="col">Product name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items?.map(
                    (
                      {
                        id,
                        product_id,
                        name,
                        quantity,
                        image,
                        new_price,
                        total,
                      },
                      index
                    ) => {
                      return (
                        <tr
                          key={id}
                          className="border-b grid grid-cols-6 items-center text-center py-3"
                        >
                          <td className=" text-red-600 h-full flex items-center justify-center">
                            <span
                              className="cursor-pointer"
                              onClick={(e) => cartActionDelete(index, id, e)}
                            >
                              <FaRegTrashAlt />{" "}
                            </span>
                          </td>

                          <td className="flex justify-center">
                            <Link to={`/products/${product_id}`}>
                              <img
                                src={image}
                                alt="Image"
                                className="w-[70px] h-[60px]"
                              />
                            </Link>
                          </td>

                          <td>
                            <Link to={`/products/${product_id}`}>{name}</Link>
                          </td>

                          <td>
                            <PriceProduct price={new_price} />
                          </td>

                          <td className="flex justify-center">
                            <div className="flex h-11 w-36 items-center border bg-[#f8f8f8]">
                              <span
                                className="flex items-center h-full px-3 border-r hover:bg-main-color duration-300 transition"
                                onClick={(e) =>
                                  updateCartQuantity(
                                    e,
                                    index,
                                    product_id,
                                    quantity,
                                    "dec"
                                  )
                                }
                              >
                                <LuMinus />
                              </span>

                              <span className=" text-center flex-grow">
                                {quantity}
                              </span>

                              <span
                                className="flex items-center h-full px-3 border-l hover:bg-main-color duration-300 transition"
                                onClick={(e) =>
                                  updateCartQuantity(
                                    e,
                                    index,
                                    product_id,
                                    quantity,
                                    "inc"
                                  )
                                }
                              >
                                <LuPlus />
                              </span>
                            </div>
                          </td>

                          <td>
                            <PriceProduct price={total} />
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex py-2 flex-wrap h-24 items-center justify-center px-6">
              <div className="flex-grow text-gray-500 max-sm:text-center">
                {items.length <= 0 && (
                  <div className="nothing">... Nothing</div>
                )}
              </div>

              <button
                type="button"
                className="px-8 py-2 sm:px-12 sm:py-3 text-white rounded bg-main-color hover:bg-hover-btn duration-300 transition"
                onClick={updateCart}
              >
                <span>Update Cart</span>
              </button>
            </div>
          </div>

          <div className="text-[#1b1b1b] p-3 sm:p-6 w-3/4 sm:w-2/4 max-w-[400px] m-auto border mt-9">
            <h3 className="sm:text-xl font-semibold py-3 border-b border-main-color">
              Checkout Summary
            </h3>

            <div className="py-8 flex flex-wrap justify-between items-center">
              <b className="max-sm:text-sm">Payable Total</b>{" "}
              <PriceProduct price={total_cost} />
            </div>
            <Link
              to="/products/checkout"
              className="max-sm:text-sm block py-2 text-center rounded text-white bg-main-color hover:bg-hover-btn duration-300 transition"
            >
              <span>Proceed to checkout</span>
            </Link>
          </div>
        </div>

        {/* <!-- Start pagination Area --> */}
        <div className="flex my-8">
          <SwiperPagination
            totalPages={total_pages}
            currentPage={currentPage}
            paginationdHandler={paginationdHandler}
          />
        </div>
      </section>
    </>
  );
};

export default SectionWrapper(Cart);
