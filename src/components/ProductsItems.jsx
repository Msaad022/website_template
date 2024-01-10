import { Link } from "react-router-dom";
import { StarRating, PriceProduct } from "../components";
import { LuShoppingCart } from "react-icons/lu";
import { TbEye } from "react-icons/tb";
import { RiHeart3Line } from "react-icons/ri";
import { RiHeart3Fill } from "react-icons/ri";
import { SwiperProductModal } from "../components";
import { useStateContext } from "../context/StateContext";
import { useState } from "react";
const ProductsItems = ({ products, addWishList }) => {
  const { addCart } = useStateContext();
  const [isSwiper, setIsSwiper] = useState(false);
  const [swiperProduct, setSwiperProduct] = useState();

  const productHandler = (itemId) => {
    document.querySelector("body").style.overflow = "hidden";
    setSwiperProduct(products.filter((item) => item.id == itemId));
    setIsSwiper(true);
  };

  const closeSwiper = () => {
    document.querySelector("body").style.overflow = "auto";
    document.getElementById("SwiperProductModal").style.opacity = "0";
    new Promise((resolve) => setTimeout(resolve, 700)).then(() =>
      setIsSwiper(false)
    );
  };
  return (
    <>
      <div className="grid gap-8 justify-center md:px-10 sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((item, index) => {
          return (
            <div key={item.id} className="">
              <div className="relative [&:hover>ul]:scale-y-100 border">
                <div className="relative max-sm:min-w-[65vw] h-[300px] md:h-[250px] lg:h-[350px]">
                  <img
                    className="w-full absolute inset-0 h-full object-cover"
                    src={item.images[0]}
                    alt="Image"
                  />
                </div>
                <p
                  className={`absolute top-8 right-12 max-sm:text-sm w-8 h-8 sm:w-12 sm:h-12 rounded-full text-white flex items-center justify-center`}
                  style={{
                    backgroundColor:
                      item.state == "Sale" ? "#ed1d24" : "#62bd5e",
                  }}
                >
                  <span>{item.state}</span>
                </p>

                <ul className=" absolute origin-center duration-500 transition scale-y-0 bottom-[30px] left-1/2 -translate-x-1/2 w-full flex flex-wrap items-center justify-center gap-3">
                  <li>
                    <button
                      type="button"
                      className="text-lg px-2 py-2 bg-white shadow rounded hover:bg-main-color transition duration-500 hover:text-white"
                      onClick={() => productHandler(item.id)}
                    >
                      <TbEye />
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => addCart(item.id, 1, item.quantity)}
                      className=" transition duration-500 hover:bg-hover-btn font-medium items-center flex gap-1 max-sm:px-6 max-sm:py-1 lg2:px-10 lg2-py-2 px-12 py-3 rounded text-white bg-main-color"
                    >
                      <LuShoppingCart />
                      Add to Cart
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className=" text-xl px-2 py-2 bg-white shadow rounded hover:bg-main-color transition duration-500 hover:text-white"
                      onClick={() => addWishList(item.id, index, item.is_liked)}
                    >
                      {item.is_liked ? (
                        <RiHeart3Fill className=" text-red-700" />
                      ) : (
                        <RiHeart3Line />
                      )}
                    </button>
                  </li>
                </ul>
              </div>

              <div className="px-6 py-6">
                <StarRating stars={item.stars} />

                <div className="flex gap-2 flex-wrap items-center justify-between">
                  <Link
                    to={`/products/${item.id}`}
                    className="text-lg text-gray-900 hover:underline hover:underline-offset-4"
                  >
                    <h3>{item.name}</h3>
                  </Link>

                  <PriceProduct price={item.new_price} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isSwiper && (
        <SwiperProductModal product={swiperProduct[0]} addCart={addCart} close={closeSwiper} />
      )}
    </>
  );
};

export default ProductsItems;
