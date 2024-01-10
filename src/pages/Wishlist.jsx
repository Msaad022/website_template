import { useState } from "react";
import { SectionWrapper } from "../hoc";
import { Link, useLoaderData } from "react-router-dom";
import { PriceProduct, SwiperPagination, Breadcrumb } from "../components";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { fitmasterHost } from "../constants";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";

const Wishlist = () => {
  const { cartStore, deleteStore, creatPagination } = useStateContext();

  const { data } = useLoaderData();

  const [wishlistProducts, setWishlistProducts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  const paginationdHandler = async (pageIndex) => {
    let page = pageIndex;
    let url = `${fitmasterHost}/wishlist?page=${currentPage}`;
    try {
      setCurrentPage(page);
      let result = await creatPagination(url);
      let { data } = result;
      setWishlistProducts(data);
    } catch (res) {
      toast.error(res.message);
    }
  };

  const wishlistActionDelete = async (id, event) => {
    try {
      event.preventDefault();
      let filterItems = wishlistProducts.items.filter((item) => item.id !== id);

      let res = await deleteStore("wishlist", id, "_token");
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

      let res = await cartStore(product_id, 1, "_token");
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
      {/* <!-- Start Page Title Area --> */}
      <Breadcrumb mainPage="Products" page="Wishlist" />

      {/* <!-- End Page Title Area --> */}
      {/* <!-- Start Shopping Cart Area --> */}
      <div className="w-11/12 m-auto py-14 px-6 overflow-x-hidden">
        <div className="py-5 overflow-x-auto">
          <table className="border grid min-w-[768px]">
            <thead>
              <tr className="border-b grid grid-cols-6 items-center text-center py-3">
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
                    <tr key={id} className="border-b grid grid-cols-6 items-center text-center py-3">
                      <td className="text-red-600 h-full flex items-center justify-center">
                        <span
                          className="cursor-pointer"
                          onClick={(e) => wishlistActionDelete(id, e)}
                        >
                          <FaRegTrashAlt />{" "}
                        </span>
                      </td>

                      <td className="flex justify-center">
                        <Link to={`/products/${product_id}`}>
                          <img src={image} alt="Image" className="w-[70px] h-[60px]" />
                        </Link>
                      </td>

                      <td>
                        <Link to={`/products/${product_id}`}>{name}</Link>
                      </td>

                      <td>
                        <PriceProduct price={new_price} />
                      </td>

                      <td>
                        <span>{in_stock}</span>
                      </td>

                      <td className="flex justify-center">
                        <button
                          className="flex items-center gap-1 text-sm px-4 py-2 text-white rounded bg-main-color hover:bg-hover-btn duration-300 transition"
                          onClick={(e) => wishlistActionStore(product_id, e)}
                        >
                          <LuShoppingCart/>
                          <span>Add to Cart</span>
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          {wishlistProducts.items.length <= 0 && (
            <div className="nothing">... Nothing</div>
          )}
        </div>
      </div>
      {/* <!-- End Shopping Cart Area --> */}

      <div className="flex my-8">
        <SwiperPagination
          totalPages={total_pages}
          currentPage={currentPage}
          paginationdHandler={paginationdHandler}
        />
      </div>
    </>
  );
};

export default SectionWrapper(Wishlist);
