import { SectionWrapper } from "../hoc";
import { useLoaderData, Await } from "react-router-dom";
import {
  ProductsItems,
  StarRating,
  PriceProduct,
  FacebookButton,
  Breadcrumb,
} from "../components";
import { useState, Suspense, useRef, useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import toast from "react-hot-toast";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";
import { fitmasterHost } from "../constants";

const ProductDetails = () => {
  const { wishlistStore, addCart } = useStateContext();
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
    productRelated: { data },
  } = useLoaderData();
  const refInc = useRef(1);
  let [isLike, setIsLike] = useState(false);

  const addWishList = async (id, index, is_liked) => {
    try {
      if (!is_liked) {
        let items = data;
        let item = items[index];
        item.is_liked = true;
        let res = await wishlistStore(id, "_token");
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
      {/* <!-- Start Page Title Area --> */}
      <Breadcrumb mainPage="Products" page={name} />
      {/* <!-- End Page Title Area --> */}

      {/* <!-- Start Product Details Area --> */}
      <section className=" my-20 w-[90%] gap-5 m-auto grid md:grid-cols-2 justify-items-center">
        <div className=" relative w-11/12 sm:w-4/5 min-h-[350px] sm:min-h-[500px] border border-gray-300">
          <img
            className="w-full absolute inset-0 h-full object-cover"
            src={images != undefined ? images[0] : ""}
            alt="Image"
          />
        </div>

        <div className=" flex items-center">
          <div className="product-details-desc">
            <h3 className=" text-3xl">{name}</h3>

            <StarRating stars={stars} />

            <div className=" font-semibold">
              <PriceProduct price={new_price} />
            </div>

            <p className="my-5">{description}</p>

            <ul className="mb-3">
              <li className="flex gap-2">
                <span className="font-bold">Category:</span>
                <ul className="flex gap-1">
                  {categories?.map(({ id, name }, index) => (
                    <li key={id}>
                      {name}
                      {categories.length != index + 1 ? "," : ""}
                    </li>
                  ))}
                </ul>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">Tags:</span>
                <ul className="flex gap-1">
                  {labels?.map(({ id, name }, index) => (
                    <li key={id}>
                      {name}
                      {labels.length != index + 1 ? "," : ""}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-3 my-6">
              <h3 className="font-medium">Quantities:</h3>

              <div className="flex items-center border border-[#cfcfcf] bg-[#f8f8f8]">
                <span className="p-3 border-r" onClick={decQty}>
                  <LuMinus/>
                </span>

                <span ref={refInc} className="py-3 px-6">
                  {1}
                </span>

                <span className="p-3 border-l" onClick={() => incQty(quantity)}>
                  <LuPlus/>
                </span>
              </div>
            </div>

            <button
              type="button"
              className="flex flex-wrap px-10 py-3 items-center gap-2 rounded bg-main-color text-white duration-300 transition hover:bg-hover-btn"
              onClick={() => {
                addCart(id, getQty(), quantity);
              }}
            >
              <LuShoppingCart/>
              <span>
                Add to Cart
                </span>
            </button>

            <ul className="mt-5 flex gap-3 items-center">
              <li>
                <span>Share:</span>
              </li>
              <li>
                <FacebookButton />
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* <!-- End Product Details Area --> */}

      {/* <!-- Start Product Area --> */}
      <section className="w-[90%] m-auto mb-10">
        <div className=" text-center">
          <h2 className="pb-8 pt-4 text-4xl">Related Products</h2>

        </div>
          <Suspense fallback={<small>Loadinng Comments...</small>}>
            <Await
              resolve={data}
              errorElement={<div>Could not load related product 😬</div>}
              children={(product) => (
                <ProductsItems products={product} addWishList={addWishList} />
              )}
            />
          </Suspense>
      </section>
      {/* <!-- End Product Area --> */}
    </>
  );
};

export default SectionWrapper(ProductDetails);
