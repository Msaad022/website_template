import { Outlet, Link } from "react-router-dom";
import { IoEarthSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { RiUser3Fill } from "react-icons/ri";
import { BiSolidLogIn } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
const Header = () => {
  return (
    <>
      <header className="flex flex-wrap">
        <TopNav />
        <nav className="relative flex flex-wrap w-full m-auto min-h-10 px-5 py-3 items-center bg-white">
          <a className="navbar-brand flex-grow" href="#">
            <img
              src="https://app.fitmaster.pro/website/assets/images/logo.png"
              alt="logo"
              className="max-md2:w-[170px]"
            />
          </a>
          <DesktopNav />
          <MobileNav />
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;

export function TopNav() {
  return (
    <div className="w-full bg-[#f8fdf5] px-4 py-4">
      <div className="flex justify-center items-center gap-4 sm:gap-8 text-sm flex-wrap ">
        <div className=" relative">
          <button
            className="hover:text-main-color focus:text-main-color transition duration-500 flex gap-1 peer focus:pointer-events-none"
            type="button"
            tabIndex="0"
            data-bs-toggle="dropdown"
          >
            <IoEarthSharp className="text-main-color" />
            <IoIosArrowDown />
            <span className="bx bx-world"></span>
          </button>
          <div className="peer-focus:[transform:rotateY(0deg)] z-10 [transform:rotateY(90deg)] w-40 top-6 absolute border-t-2 border-main-color bg-white py-3 shadow-md transition duration-500">
            <ul className="flex flex-wrap *:w-full *:flex *:gap-2 *:items-center *:py-1 *:px-4 *:select-none *:transition *:duration-500 *:cursor-pointer">
              <li className="hover:text-main-color">
                <img
                  src="https://app.fitmaster.pro/website/assets/images/language/english.png"
                  alt="Flag"
                  className="w-5 h-5 rounded-full"
                />
                <span>English</span>
              </li>
              <li className="hover:text-main-color">
                <img
                  src="https://app.fitmaster.pro/website/assets/images/language/egypt.svg"
                  alt="Flag"
                  className="w-5 h-5 rounded-full"
                />
                <span>العربية</span>
              </li>
            </ul>
          </div>
        </div>
        <ul className="flex gap-4 sm:gap-8  flex-wrap justify-center">
          <li>
            <a
              href="#"
              className="hover:text-main-color transition duration-300 flex gap-1 items-center"
            >
              <RiUser3Fill className="text-main-color" />
              Register
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-main-color transition duration-300 flex gap-1 items-center"
            >
              <BiSolidLogIn className="text-main-color" /> Login
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function DesktopNav() {
  return (
    <div className="hidden md2:flex items-center flex-grow-[2]">
      <ul className="flex justify-evenly text-sm flex-grow *:transition hover:[&>li:not(:nth-child(2))]:text-main-color *:duration-300 font-bold *:h-10 *:flex *:items-center">
        <li>
          <a href="#" className="nav-link active">
            Home
          </a>
        </li>
        <li className="group/item">
          <button
            href="#"
            className="group-hover/item:text-main-color transition duration-300"
            type="button"
          >
            Pages
            <IoIosArrowDown className=" inline-block ml-2" />
          </button>

          <ul className="absolute top-24 group-hover/item:-translate-y-6 group-hover/item:opacity-100 opacity-0 group-hover/item:visible invisible font-semibold transition-[visibility_linear,opacity_linear] duration-300 w-60 border-t-2 border-main-color bg-white shadow-md *:transition *:duration-300 [&>li>a]:py-3 [&>li>a]:px-3 [&>li>a]:block hover:[&>li]:text-main-color [&>*:not(:last-child)]:border-b *:border-dashed">
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/products/1">ProductsDetails</Link>
            </li>
            <li>
              <Link to="/products/cart">Cart</Link>
            </li>
            <li>
              <Link to="/products/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/products/checkout">Checkout</Link>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" className="nav-link">
            Recipes
          </a>
        </li>
        <li>
          <a href="#" className="nav-link">
            Packages
          </a>
        </li>
        <li>
          <a href="#" className="nav-link">
            Contact us
          </a>
        </li>
      </ul>

      <div className="flex pr-3 justify-end flex-grow">
        <div className="p-3 lg2:py-3 lg2:px-9 max-lg2:text-sm bg-main-color text-center w-max text-white hover:bg-[#1b1b1b] rounded transition-[padding_linear,background-color_linear] duration-300">
          <a href="#" className="default-btn">
            Get Appointment
          </a>
        </div>
      </div>
    </div>
  );
}

export function MobileNav() {
  return (
    <div className="flex flex-grow-[2] items-center justify-end md2:hidden">
      <fieldset className=" flex-grow min-w-14 h-10  max-[265px]:[&>button]:top-3/4 [&>button]:top-1/2 [&>button]:right-[10%] [&>button]:-translate-y-1/2 *:duration-150 *:absolute text-4xl">
        <button
          tabIndex={0}
          className="focus:pointer-events-none group/down peer/button relative w-9 h-9 [&>label]:transition-[visibility,opacity] *:absolute *:top-0 *:left-0"
        >
          <FiMenu className="visible opacity-100 group-focus/down:invisible group-focus/down:opacity-0" />
          <IoClose className="invisible opacity-0 group-focus/down:visible group-focus/down:opacity-100" />
        </button>
        <div className="top-full bg-white shadow-md peer-focus/button:pb-5 left-1/2 -translate-x-1/2 w-4/5 max-h-0 transition-[max-height] ease-out duration-500 peer-focus/button:transition-[max-height] peer-focus/button:max-h-screen peer-focus/button:ease-in peer-focus/button:duration-500 overflow-hidden z-50">
          <ul className="text-sm [&_a]:block [&_a]:pl-6 [&_a]:pr-2 [&_a]:py-3 *:border-b *:border-[#DBEEFD] text-[#677294] *:transition-colors *:duration-300 select-none">
            <li className="hover:text-main-color">
              <a href="#" className="">
                Home
              </a>
            </li>
            <li className="min-h-[45px]">
              <button
                href="#"
                className="pl-6 py-3 text-base flex w-full justify-between hover:text-main-color"
                type="button"
              >
                <span>Pages</span>
                <div className=" relative w-10">
                  <span>-</span>
                </div>
              </button>
              <ul className="*:pl-6 *:border-t *:border-[#DBEEFD] overflow-hidden z-20 *:transition-colors *:duration-300">
                <li className="hover:text-main-color">
                  <Link to="/products">Products</Link>
                </li>
                <li className="hover:text-main-color">
                  <Link to="/products/1">ProductsDetails</Link>
                </li>
                <li className="hover:text-main-color">
                  <Link to="/products/cart">Cart</Link>
                </li>
                <li className="hover:text-main-color">
                  <Link to="/products/wishlist">Wishlist</Link>
                </li>
                <li className="hover:text-main-color">
                  <Link to="/products/checkout">Checkout</Link>
                </li>
              </ul>
            </li>
            <li className="hover:text-main-color">
              <a href="#" className="nav-link">
                Recipes
              </a>
            </li>
            <li className="hover:text-main-color">
              <a href="#" className="nav-link">
                Packages
              </a>
            </li>
            <li className="hover:text-main-color">
              <a href="#" className="nav-link">
                Contact us
              </a>
            </li>
          </ul>

          <div className="mt-10">
            <div className="p-3 px-9 text-sm bg-main-color text-center w-max text-white hover:bg-[#1b1b1b] rounded duration-300">
              <a href="#" className="default-btn">
                Get Appointment
              </a>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
