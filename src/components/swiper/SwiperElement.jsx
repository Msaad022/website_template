import "./styles.css";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FacebookButton } from "../StartRating";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { StartRating, PriceProduct } from "../StartRating";

export const SwiperPagination = ({
  totalPages,
  currentPage,
  paginationdHandler,
}) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={5}
      freeMode={true}
      modules={[FreeMode, Navigation]}
      navigation={true}
      className="mySwiperNavigation"
    >
      {[...Array(totalPages)].map((x, index) => {
        index++;
        return (
          <SwiperSlide
            style={{ width: "45px" }}
            key={index}
            onClick={() =>
              index != currentPage ? paginationdHandler(index) : ""
            }
            className={`page-numbers ${index == currentPage ? "current" : ""} `}
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
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const getQty = () => Number(document.getElementById('defaultQty').textContent);

  const incQty = (maxQty) => {
    let qty = getQty();
    let stateQty = qty;

    if (qty < maxQty) {
      stateQty = qty + 1;
    } else if (qty > maxQty && maxQty != 0) {
      stateQty = maxQty;
    }
    document.getElementById('defaultQty').textContent = stateQty
  };
  const decQty = () => {
    let qty = getQty();
    let stateQty = qty - 1;
    if (qty - 1 < 1) {
      stateQty = 1;
    }
    document.getElementById('defaultQty').textContent = stateQty
  };

  return (
    <div className="modal fade product-view-one" id="exampleModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <button type="button" className="close" data-bs-dismiss="modal">
            <span aria-hidden="true">
              <i className="bx bx-x"></i>
            </span>
          </button>

          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 swiper-slide-parent">
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
                      <img src={img} />
                      <div className="swiper-lazy-preloader"></div>
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
                className="mySwiper"
              >
                {images?.map((img, index) => {
                  return (
                    <SwiperSlide key={`${index}`}>
                      <img src={img} loading="lazy" />
                      <div className="swiper-lazy-preloader"></div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="product-content">
                <h3>
                  <a href="#">{name}</a>
                </h3>

                <PriceProduct price={new_price} />

                <div className="product-review">
                  <ul className="ratingStars">
                    <StartRating stars={stars} />
                  </ul>
                </div>

                <ul className="product-info">
                  <li>
                    <p>{description}</p>
                  </li>
                  <li>
                    <span>Availability: </span>
                    {`In Stock (${quantity} Items)`}
                    <a href="#"></a>
                  </li>
                  <li>
                    <span className="main-span">Product Type:</span>
                    <div className="sub-span">
                      {categories?.map(({ id, name }) => (
                        <span key={id}>{name}</span>
                      ))}
                    </div>
                  </li>
                </ul>

                <div className="product-add-to-cart">
                  <div className="input-counter">
                    <span className="minus-btn" onClick={decQty}>
                      <i className="bx bx-minus"></i>
                    </span>

                    <span>
                      <span id="defaultQty">{1}</span>
                    </span>

                    <span className="plus-btn" onClick={() => incQty(quantity)}>
                      <i className="bx bx-plus"></i>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => addCart(id, getQty(), quantity)}
                    className="default-btn"
                  >
                    Add to Cart
                    <i className="flaticon-right"></i>
                  </button>
                </div>

                <div className="share-this-product">
                  <h3>Share This Product</h3>

                  <ul>
                    <li>
                      <FacebookButton />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
