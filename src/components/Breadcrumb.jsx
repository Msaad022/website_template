import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineHome } from "react-icons/hi2";
import { Link } from "react-router-dom";
const Breadcrumb = ({ mainPage, page }) => {
  return (
    <nav
      className="flex flex-col gap-3 justify-center items-center h-72 bg-[#eff4fa]"
      aria-label="Breadcrumb"
    >
      <h2 className="text-4xl sm:text-5xl">{mainPage}</h2>
      <ol className="flex flex-wrap max-sm:text-sm justify-center items-center gap-1 text-gray-600 select-none">
        <li>
          <Link to="/" className="block transition hover:text-gray-700">
            <span className="sr-only"> Home </span>
            <HiOutlineHome />
          </Link>
        </li>

        <li className="">
          <IoIosArrowForward />
        </li>

        <li>
          <Link to="/products" className={`block transition hover:text-gray-700 ${page == undefined ? 'pointer-events-none':''}`}>
            {mainPage}
          </Link>
        </li>

        {page != undefined ? (
          <>
            <li className="">
              <IoIosArrowForward />
            </li>
            <Link
              to={`/products/${page}`}
              className="block transition hover:text-gray-700 pointer-events-none"
            >
              {page}
            </Link>
          </>
        ) : (
          ""
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
