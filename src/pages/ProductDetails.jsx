import { SectionWrapper } from "../hoc";
import { defer, useLoaderData, Await,json  } from "react-router-dom";
import {
  ProductsItems,
  StartRating,
  PriceProduct,
  SwiperProductModal,
  FacebookButton,
  Breadcrumb
} from "../components";
import { useState, Suspense, useRef, useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import toast, { Toaster } from "react-hot-toast";
import { fitmasterHost } from "../constants";

const ProductDetails = () => {
  const { cartStore, wishlistStore } = useStateContext();
  let {
    product: {
      id,
      name,
      images,
      description,
      new_price,
      quantity,
      labels,
      categories,
      stars,
    },
    productRelated
  } = useLoaderData();

  const refInc = useRef(1);
  let [isLike, setIsLike] = useState(false);

  const [swiperProduct, setSwiperProduct] = useState([
    {
      id: 1,
      name: "",
      images: undefined,
      description: "",
      new_price: "",
      quantity: "",
      categories: undefined,
      stars: "",
    },
  ]);

  const productHandler = (itemId) => {
    document.getElementById('defaultQty').textContent = 1
    setSwiperProduct(productRelated.filter((item) => item.id == itemId));
  };

  const addCart = async (id, qty, qtyMax) => {
    try {
      if (qty <= qtyMax && qty != 0) {
        let res = await cartStore(id, qty, "mohamed_saad");
        if (res) {
          toast.success(`${qty} item was added to cart!`);
        }
      } else {
        toast(`Sorry, this product is not available now`, {
          duration: 3000,
          icon:"⛔"
        });
      }
    } catch (res) {
      toast.error(res.message);
    }
  };

  const addWishList = async (id, index, is_liked) => {
    try {
      if (!is_liked) {
        let items = productRelated;
        let item = items[index];
        item.is_liked = true;
        let res = await wishlistStore(id, "mohamed_saad");
        if (res) {
          setIsLike(!isLike);
          toast("Good Job!", {
            icon: "👏",
          });
        }
      }
    } catch (res) {
      toast.error(res.message);
    }
  };

  const getQty = () => Number(refInc.current.textContent);

  const incQty = (maxQty) => {
    let qty = getQty();
    let stateQty = qty;

    if (qty != maxQty) {
      if (qty < maxQty) {
        stateQty++;
      } else if (qty > maxQty && maxQty != 0) {
        stateQty = maxQty;
      }
      refInc.current.textContent = stateQty;
    }
  };

  const decQty = () => {
    let qty = getQty();
    let stateQty = qty;

    if (qty != 1) {
      stateQty--;
      if (qty - 1 < 1) {
        stateQty = 1;
      }
      refInc.current.textContent = stateQty;
    }
  };
  useEffect(() => {
    refInc.current.textContent = 1;
  }, [name]);
  
  return (
    <>
      <Toaster />
      {/* <!-- Start Page Title Area --> */}
      <Breadcrumb title="Product Details"/>
      {/* <!-- End Page Title Area --> */}

      {/* <!-- Start Product Details Area --> */}
      <section className="product-details-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="product-details-image">
                <img src={images != undefined ? images[0]: ''} alt="Image" />
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="product-details-desc">
                <h3>{name}</h3>

                <ul className="ratingStars">
                  <StartRating stars={stars} />
                </ul>

                <PriceProduct price={new_price} />

                <p>{description}</p>

                <ul className="category">
                  <li>
                    <span className="main-span">Category:</span>
                    <div className="sub-span">
                      {categories?.map(({ id, name }) => (
                        <span key={id}>{name}</span>
                      ))}
                    </div>
                  </li>
                  <li>
                    <span className="main-span">Tags:</span>
                    <div className="sub-span">
                      {labels?.map(({ id, name }) => (
                        <span key={id}>{name}</span>
                      ))}
                    </div>
                  </li>
                </ul>

                <div className="product-add-to-cart">
                  <h3>Quantities:</h3>

                  <div className="input-counter">
                    <span className="minus-btn" onClick={decQty}>
                      <i className="bx bx-minus"></i>
                    </span>

                    <span>
                      <span ref={refInc}>{1}</span>
                    </span>

                    <span className="plus-btn" onClick={() => incQty(quantity)}>
                      <i className="bx bx-plus"></i>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="default-btn"
                  onClick={() => {
                    addCart(id, getQty(), quantity);
                  }}
                >
                  <i className="bx bx-cart"></i>
                  Add to Cart
                </button>

                <ul className="social-wrap">
                  <li>
                    <span>Share:</span>
                  </li>
                  <li>
                    <FacebookButton />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Product Details Area --> */}

      {/* <!-- Start Product Area --> */}
      <section className="product-area pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Related Products</h2>
          </div>
          <Suspense fallback={<small>Loadinng Comments...</small>}>
            <Await
              resolve={productRelated}
              errorElement={<div>Could not load related product 😬</div>}
              children={(product) => (
                <ProductsItems
                  products={product}
                  productHandler={productHandler}
                  addCart={addCart}
                  addWishList={addWishList}
                />
              )}
            />
          </Suspense>
        </div>
      </section>
      {/* <!-- End Product Area --> */}

      {/* <!-- Start Product View One Area --> */}
      <SwiperProductModal product={swiperProduct[0]} addCart={addCart} />
      {/* <!-- End Product View One Area --> */}
    </>
  );
};

export default SectionWrapper(ProductDetails);