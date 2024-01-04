import { useState } from "react";
import { SectionWrapper } from "../hoc";
import { Link, useLoaderData } from "react-router-dom";
import { PriceProduct, SwiperPagination,Breadcrumb } from "../components";
import toast, { Toaster } from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { fitmasterHost } from "../constants";

const Wishlist = () => {
  const { cartStore, deleteStore, creatPagination } = useStateContext();

  const { data } = useLoaderData();

  const [wishlistProducts, setWishlistProducts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  const paginationdHandler = async (pageIndex) => {
    let page = pageIndex;
    let url = `${fitmasterHost}/wishlist?page=${currentPage}`
    try {
        setCurrentPage(page);
        let result = await creatPagination(url);
        let {data} = result
        setWishlistProducts(data);
    } catch (res) {
      toast.error(res.message);
    }
  };

  const wishlistActionDelete = async (id, event) => {
    try {
      event.preventDefault();
      let filterItems = wishlistProducts.items.filter((item) => item.id !== id);

      let res = await deleteStore("wishlist", id, "mohamed_saad");
      if (res) {
        setWishlistProducts({
          items: filterItems,
          paginate: wishlistProducts.paginate,
        });
        toast.success("One item was deleted!");
      }
    } catch (res) {
      toast.error(res.message);
    }
  };

  const wishlistActionStore = async (product_id, event) => {
    try {
      event.preventDefault();
      let filterItems = wishlistProducts.items.filter(
        (item) => item.id !== product_id
      );

      let res = await cartStore(product_id, 1, "mohamed_saad");
      if (res) {
        setWishlistProducts({
          items: filterItems,
          paginate: wishlistProducts.paginate,
        });
        toast.success("One item was added to cart!");
      }
    } catch (res) {
      toast.error(res.message);
    }
  };

  const {
    paginate: { total_pages },
  } = wishlistProducts;

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
      <Breadcrumb title="Wishlist"/>
      {/* <!-- End Page Title Area --> */}
      {/* <!-- Start Shopping Cart Area --> */}
      <div className="shopping-cart-area wishlist-style ptb-100">
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
                    <th scope="col">In Stock</th>
                    <th scope="col">Add to Cart</th>
                  </tr>
                </thead>

                <tbody>
                  {wishlistProducts.items?.map(
                    ({ id, product_id, name, in_stock, image, new_price }) => {
                      return (
                        <tr key={id}>
                          <td className="trash">
                            <span
                              className="remove"
                              onClick={(e) => wishlistActionDelete(id, e)}
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
                            <span>{in_stock}</span>
                          </td>

                          <td className="product-subtotal">
                            <button
                              className="default-btn"
                              onClick={(e) =>
                                wishlistActionStore(product_id, e)
                              }
                            >
                              <i className="bx bx-cart"></i>
                              Add to Cart
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
              {(wishlistProducts.items.length <= 0) && (<div className="nothing">... Nothing</div>)}
            </div>
          </div>
        </div>
      </div>
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

export default SectionWrapper(Wishlist);