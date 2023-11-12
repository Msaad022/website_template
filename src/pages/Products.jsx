import { useLoaderData } from "react-router-dom";
import { SectionWrapper } from "../hoc";
import { useState } from "react";
import {
  SelectElement,
  SwiperProductModal,
  SwiperPagination,
  ProductsItems,
  PageTitle,
} from "../components";
import toast, { Toaster } from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { fitmasterHost } from "../constants";

const Products = () => {
  const { data } = useLoaderData();
  const { cartStore, wishlistStore, creatSortBy, creatPagination } =
    useStateContext();

  const [products, setProducts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("latest");
  const [isLoading, setIsLoading] = useState(false);
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
      index: 0,
    },
  ]);

  const sortSelectedHandler = async (e) => {
    let sort = e.value;

    try {
      if (selectedSort != sort) {
        setIsLoading(true);
        setSelectedSort(sort);
        setCurrentPage(1);
        let result = await creatSortBy(sort);
        const { data } = result;
        setProducts(data);
      }
    } catch (res) {
      toast.error(res.message);
    } finally {
      setIsLoading(false);
    }
  };
  const paginationdHandler = async (pageIndex) => {
    let page = pageIndex;
    let url = `${fitmasterHost}/productsPagination/${page}?sort_by=${selectedSort}&page=${page}`

    try {
        setIsLoading(true);
        setCurrentPage(page);
        let result = await creatPagination(url);
        const { data } = result;
        setProducts(data);
    } catch (res) {
      toast.error(res.message);
    } finally {
      setIsLoading(false);
    }
  };

  const productHandler = (itemId) => {
    document.getElementById("defaultQty").textContent = 1;
    setSwiperProduct(products.items.filter((item) => item.id == itemId));
  };

  const paginateCalc = (total, count, current_page) => {
    let from = (current_page - 1) * count + 1;
    let to = current_page * count;
    let last = to > total ? total : to;
    return { from, last };
  };

  const {
    paginate: { total, per_page, current_page, total_pages },
  } = products;

  let { from, last } = paginateCalc(total, per_page, current_page);

  const addCart = async (id, qty, qtyMax) => {
    try {
      if (qty <= qtyMax && qty != 0) {
        let res = await cartStore(id, qty, "mohamed_saad");
        if (res) {
          toast.success(`${qty} item was added to cart!`);
        }
      } else {
        toast("Sorry, this product is not available now", {
          duration: 3000,
          icon: "⛔",
        });
      }
    } catch (res) {
      toast.error(res.message);
    }
  };

  const addWishList = async (id, index, is_liked) => {
    try {
      if (!is_liked) {
        let items = products.items;
        let item = items[index];
        item.is_liked = true;

        let res = await wishlistStore(id, "mohamed_saad");
        if (res) {
          setProducts({
            items: items,
            paginate: products.paginate,
          });
          toast("Good Job!", {
            icon: "👏",
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
      <PageTitle title="Products" />
      {/* <!-- End Page Title Area --> */}

      {/* <!-- Start Product Area --> */}
      <section className="product-area ptb-100">
        <div className="container">
          <div className="showing-result">
            <div className="row align-items-center">
              <div className="col-lg-6 col-sm-6">
                <div className="showing-result-count">
                  <p>
                    Showing{" "}
                    <span className="showing-span">
                      {from}&nbsp;-&nbsp;{last}
                    </span>
                    &nbsp; of &nbsp;
                    <span className="showing-span">{total}</span> Results
                  </p>
                </div>
              </div>

              <div className="col-lg-6 col-sm-6">
                <div className="showing-top-bar-ordering">
                  <SelectElement sortSelectedHandler={sortSelectedHandler} />
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-12"
            style={{ height: "33px", margin: "10px 0px" }}
          >
            {isLoading && <div className="spinner-border" role="status"></div>}
          </div>
          <ProductsItems
            products={products.items}
            productHandler={productHandler}
            addCart={addCart}
            addWishList={addWishList}
          />

          {/* <!-- Start pagination Area --> */}

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
        </div>
      </section>

      <SwiperProductModal product={swiperProduct[0]} addCart={addCart} />
      {/* <!-- End Product Area --> */}
    </>
  );
};

export default SectionWrapper(Products);

export const ProductsLoader = async () => {
  const res = await fetch(
    `${fitmasterHost}/products?sort_by=latest&page=1`
  );

  if (!res.ok) {
    throw Error("Could not find that Products");
  }

  return await res.json();
};
