import { useLoaderData } from "react-router-dom";
import { SectionWrapper } from "../hoc";
import { useState } from "react";
import {
  SelectElement,
  SwiperPagination,
  ProductsItems,
  Breadcrumb
} from "../components";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { fitmasterHost } from "../constants";

const Products = () => {
  const { data } = useLoaderData();
  const { wishlistStore, creatSortBy, creatPagination } =
    useStateContext();

  const [products, setProducts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("latest");
  const [isLoading, setIsLoading] = useState(false);

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
    let url = `${fitmasterHost}/products?sort_by=${selectedSort}&page=${page}`;

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

  const addWishList = async (id, index, is_liked) => {
    try {
      if (!is_liked) {
        let items = products.items;
        let item = items[index];
        item.is_liked = true;

        let res = await wishlistStore(id, "_token");
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

  return (
    <>
      {/* <!-- Start Page Title Area --> */}
      <Breadcrumb mainPage="Products" page={undefined} />
      {/* <!-- End Page Title Area --> */}

      {/* <!-- Start Product Area --> */}
      <section className="p-10 md:p-12 lg:p-20">
        <div className="flex flex-wrap gap-10 justify-between items-center py-2">
          <div className="flex-grow-[2]">
            <p className="[&_>span]:text-main-color text-gray-500">
              Showing{" "}
              <span className="">
                {from}&nbsp;-&nbsp;{last}
              </span>
              &nbsp; of &nbsp;
              <span className="">{total}</span> Results
            </p>
          </div>

          <div className="flex-grow">
            <SelectElement sortSelectedHandler={sortSelectedHandler} />
          </div>
        </div>

        <div className="w-full h-8 my-3">
          {isLoading && <div className="spinner-border" role="status"></div>}
        </div>
        <ProductsItems
          products={products.items}
          addWishList={addWishList}
        />

        {/* <!-- Start pagination Area --> */}

        <div className="flex my-8 ">
          <SwiperPagination
            totalPages={total_pages}
            currentPage={currentPage}
            paginationdHandler={paginationdHandler}
          />
        </div>
      </section>
      {/* <!-- End Product Area --> */}
    </>
  );
};

export default SectionWrapper(Products);
