import { useState } from "react";
import { SectionWrapper } from "../hoc";
import { Link, useLoaderData } from "react-router-dom";
import { PriceProduct, SwiperPagination,Breadcrumb } from "../components";
import toast, { Toaster } from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { fitmasterHost } from "../constants";
const Cart = () => {
  const {cartStore, deleteStore, creatPagination } = useStateContext();

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
      const res = await fetch(
        `${fitmasterHost}/cart?page=${currentPage}`
      );
      if (!res.ok) {
        throw new Error("Could not find that Carts");
      }

      let data = await res.json();
      toast.success("Updated success")
      setCartProducts(data);
    } catch (res) {
      toast.error(res.message);
    }
  };
  const paginationdHandler = async (pageIndex) => {

    let page = pageIndex;
    let url = `${fitmasterHost}/cart?page=${currentPage}`
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

      let res = await deleteStore("cart", id, "mohamed_saad");
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

      if(quantity > item.max_quantity){
        item.quantity = item.max_quantity;
        let oldTotle = item.total;
        item.total = parseNum(item.quantity * item.new_price);
        extra.total_cost = parseNum(extra.total_cost + item.total - oldTotle);
      }else{
      if (type == "inc") {
        if(quantity < item.max_quantity){
          item.quantity++;
          item.total = parseNum(item.total + item.new_price);
          extra.total_cost = parseNum(extra.total_cost + item.new_price);
        }
      }else{
        if(quantity < 0){
          item.quantity = 1;
          item.total = parseNum(item.new_price);
          extra.total_cost = parseNum(extra.total_cost + item.new_price);
        }else if(quantity > 1){
          item.quantity--;
          item.total = parseNum(item.total - item.new_price);
          extra.total_cost = parseNum(extra.total_cost - item.new_price);
        }
      }
    }
      if (quantity != item.quantity) {
        let res = await cartStore(product_id, item.quantity, "mohamed_saad");
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

const hocButton = (name) =>
    function () {
      document.getElementsByClassName(name)[0].click();
    };

  const prevButton = hocButton("swiper-button-prev");
  const nextButton = hocButton("swiper-button-next");

  return (
    <>
      <Toaster />
      {/* <!-- Start Page Title Area --> */}
      <Breadcrumb title="Shopping Cart"/>
      {/* <!-- End Page Title Area --> */}

      {/* <!-- Start Shopping Cart Area --> */}
      <section className="shopping-cart-area ptb-100">
        <div className="container">
          <div className="cart-controller">
            <div className="cart-table table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
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
                        <tr key={id}>
                          <td className="trash">
                            <span
                              className="remove"
                              onClick={(e) => cartActionDelete(index, id, e)}
                            >
                              <i className="bx bx-trash"></i>
                            </span>
                          </td>

                          <td className="product-thumbnail">
                            <Link to={`/products/${product_id}`}>
                              <img src={image} alt="Image" />
                            </Link>
                          </td>

                          <td className="product-name">
                            <Link to={`/products/${product_id}`}>{name}</Link>
                          </td>

                          <td className="product-price">
                            <PriceProduct price={new_price} />
                          </td>

                          <td className="product-quantity">
                            <div className="input-counter">
                              <span
                                className="minus-btn"
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
                                <i className="bx bx-minus"></i>
                              </span>

                              <span>
                                <span>{quantity}</span>
                              </span>

                              <span
                                className="plus-btn"
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
                                <i className="bx bx-plus"></i>
                              </span>
                            </div>
                          </td>

                          <td className="product-subtotal">
                            <PriceProduct price={total} />
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>

            <div className="coupon-cart">
              <div className="row">
                <div className="col-lg-8 col-sm-7">
                {(items.length <= 0) && (<div className="nothing">... Nothing</div>)}

                </div>

                <div className="col-lg-4 col-sm-5">
                  <button
                    type="button"
                    className="default-btn update-cart"
                    onClick={updateCart}
                  >
                    <span>Update Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-totals">
            <h3 className="cart-checkout-title">Checkout Summary</h3>

            <ul>
              <li>
                <b>Payable Total</b>{" "}
                <span>
                  <PriceProduct price={total_cost} />
                </span> 
              </li>
            </ul>
            <Link to="/products/checkout" className="default-btn">
              <span>Proceed to checkout</span>
            </Link>
          </div>
        </div>
      </section>
      {/* <!-- End Shopping Cart Area --> */}
      <div className="col-12 pagination-area">
        <button
          type="button"
          className="prev-button page-numbers"
          disabled={total_pages > 4 ? false : true}
          onClick={prevButton}
        >
          <i className="bx bx-left-arrow-alt"></i>{" "}
        </button>
        <div className="pagination-swiper">
          <SwiperPagination
            totalPages={total_pages}
            currentPage={currentPage}
            paginationdHandler={paginationdHandler}
          />
        </div>
        <button
          type="button"
          className="next-button page-numbers"
          disabled={total_pages > 4 ? false : true}
          onClick={nextButton}
        >
          <i className="bx bx-right-arrow-alt"></i>{" "}
        </button>
      </div>
    </>
  );
};

export default SectionWrapper(Cart);