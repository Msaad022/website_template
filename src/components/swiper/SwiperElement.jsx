import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FacebookButton } from "../StarRating";
import { IoCloseOutline } from "react-icons/io5";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { StarRating, PriceProduct } from "../StarRating";

export const SwiperPagination = ({
  totalPages,
  currentPage,
  paginationdHandler,
}) => {
  return (
    <Swiper
      slidesPerView={6}
      spaceBetween={5}
      freeMode={true}
      navigation={true}
      modules={[FreeMode, Navigation]}
      className="w-64 py-2"
    >
      {[...Array(totalPages)].map((x, index) => {
        index++;
        return (
          <SwiperSlide
            key={index}
            style={
              index == currentPage
                ? { backgroundColor: "rgb(98, 189, 94)", color: "white" }
                : {}
            }
            onClick={() =>
              index != currentPage ? paginationdHandler(index) : ""
            }
            className={`w-max select-none text-black bg-white shadow py-3 px-4 duration-500 transition hover:bg-main-color hover:text-white`}
            aria-current="page"
          >
            {index}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export const SwiperProductModal = ({
  product: {
    id,
    name,
    images,
    description,
    new_price,
    quantity,
    categories,
    stars,
  },
  addCart,
  close,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const getQty = () =>
    Number(document.getElementById("defaultQty").textContent);

  const incQty = (maxQty) => {
    let qty = getQty();
    let stateQty = qty;

    if (qty < maxQty) {
      stateQty = qty + 1;
    } else if (qty > maxQty && maxQty != 0) {
      stateQty = maxQty;
    }
    document.getElementById("defaultQty").textContent = stateQty;
  };
  const decQty = () => {
    let qty = getQty();
    let stateQty = qty - 1;
    if (qty - 1 < 1) {
      stateQty = 1;
    }
    document.getElementById("defaultQty").textContent = stateQty;
  };

  useEffect(() => {
    document.getElementById("SwiperProductModal").style.opacity = "1";
  }, []);

  return (
    <div
      id="SwiperProductModal"
      className="fixed flex justify-center top-0 left-0 w-screen h-screen overflow-y-auto z-30 bg-[#0b0a0a69] px-0 py-7 sm:p-7 opacity-0 duration-700 transition"
    >
      <div className="relative h-max w-4/5 lg:w-[63%] bg-white">
        <div className="text-xl flex items-center justify-end">
          <button
            type="button"
            className="p-2 bg-gray-300 text-black"
            onClick={() => close(false)}
          >
            <IoCloseOutline />
          </button>
        </div>
        <div className="p-4 sm:p-10 pt-0 md:grid  md:grid-cols-2">
          <div className="bg-[#eeeeee] p-1 sm:p-7">
            <Swiper
              style={{
                "--swiper-navigation-color": "#62bd5e",
              }}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {images?.map((img, index) => {
                return (
                  <SwiperSlide key={`${index}swiper`}>
                    <img src={img} loading="lazy" className="w-full" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={0}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper mt-1 sm:mt-7 [&_.swiper-slide-thumb-active]:border-4 [&_.swiper-slide-thumb-active]:border-main-color"
            >
              {images?.map((img, index) => {
                return (
                  <SwiperSlide key={`${index}`}>
                    <img src={img} loading="lazy" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="p-3 sm:p-7">
            <h3 className="text-lg sm:text-2xl font-semibold py-3">
              <Link to={`products/${id}`}>{name}</Link>
            </h3>

            <PriceProduct price={new_price} />

            <StarRating stars={stars} />

            <ul className="max-sm:text-sm *:py-1">
              <li>
                <p>{description}</p>
              </li>
              <li className="flex flex-wrap items-center justify-start gap-2">
                <span>Availability: </span>
                <span className="block text-xs sm:text-sm">{`In Stock (${quantity} Items)`}</span>
              </li>
              <li className="flex flex-wrap items-center justify-start gap-2">
                <span>Product Type:</span>
                <div className="text-xs sm:text-sm">
                  {categories?.map(({ id, name }) => (
                    <span key={id}>{name}</span>
                  ))}
                </div>
              </li>
            </ul>

            <div className="flex flex-wrap gap-3 text-sm my-2 items-center justify-start">
              <div className="flex flex-grow items-center bg-[#f8f8f8] [&>button]:px-3 [&>button]:py-4 [&>button]:duration-500 [&>button]:transition">
                <button
                  role="button"
                  className="hover:bg-main-color hover:text-white"
                  onClick={decQty}
                >
                  <LuMinus />
                </button>

                <span className="text-center w-2/4">
                  <span id="defaultQty">{1}</span>
                </span>

                <button
                  role="button"
                  className="hover:bg-main-color hover:text-white"
                  onClick={() => incQty(quantity)}
                >
                  <LuPlus />
                </button>
              </div>

              <button
                type="button"
                onClick={() => addCart(id, getQty(), quantity)}
                className="flex-grow py-3 px-4 bg-main-color hover:bg-hover-btn text-white rounded duration-500 transition"
              >
                Add to Cart
                <i className="flaticon-right"></i>
              </button>
            </div>

            <div>
              <h3 className="py-2">Share This Product</h3>

              <ul className="mt-1">
                <li className=" py-1 px-1 bg-[#eee] w-min rounded">
                  <FacebookButton />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
