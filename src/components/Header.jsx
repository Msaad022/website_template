import { Outlet, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header-area">
        {/* <!-- Start Top Header --> */}
        <div className="top-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 col-md-12">
                <div className="header-right-content text-center " dir="ltr">
                  <div className="language">
                    <div className="dropdown language-settings">
                      <button
                        className="dropdown-toggle language-btn"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bx bx-chevron-down"></i>
                        <span className="bx bx-world"></span>
                      </button>
                      <div className="dropdown-menu">
                        <a href="#" className="dropdown-item">
                          <img
                            src="https://fmtest.smappsllc.com/website/assets/images/language/english.png"
                            alt="Flag"
                          />
                          <span>English</span>
                        </a>

                        <a href="#" className="dropdown-item">
                          <img
                            src="https://fmtest.smappsllc.com/website/assets/images/language/egypt.svg"
                            alt="Flag"
                          />
                          <span>العربية</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <ul className="my-account">
                    <li>
                      <a href="#">
                        <i className="bx bxs-user"></i>
                        Register
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bx bxs-log-in"></i>
                        Login
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Start Top Header --> */}

        {/* <!-- Start Navbar Area --> */}
        <div className="navbar-area">
          <div className="mobile-nav mb-4">
            <div className="container">
              <div className="mobile-menu"></div>
            </div>
          </div>

          <div className="desktop-nav">
            <div className="container-flud" style={{ padding: "0 20px" }}>
              <nav className="navbar navbar-expand-md navbar-light">
                <a className="navbar-brand" href="#">
                  <img
                    src="https://fmtest.smappsllc.com/website/assets/images/logo.png"
                    alt="logo"
                  />
                </a>

                <div className="navbar-collapse mean-menu">
                  <ul className="navbar-nav m-auto">
                    <li className="nav-item">
                      <NavLink to="/" className="nav-link">
                        Products
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/products/1" className="nav-link">
                        ProductDetails
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/shoppingCart" className="nav-link">
                        ShoppingCart
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/wishlist" className="nav-link">
                        Wishlist
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/checkout" className="nav-link">
                        Checkout
                      </NavLink>
                    </li>
                  </ul>

                  <div className="others-option">
                    <div className="get-quote">
                      <a href="#" className="default-btn">
                        Get Appointment
                      </a>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          <div className="others-option-for-responsive">
            <div className="container">
              <div className="dot-menu">
                <div className="inner">
                  <div className="circle circle-one"></div>
                  <div className="circle circle-two"></div>
                  <div className="circle circle-three"></div>
                </div>
              </div>

              <div className="container">
                <div className="option-inner">
                  <div className="others-option justify-content-center d-flex align-items-center">
                    <a href="#" className="btn btn-success btn-sm w-70">
                      Get Appointment
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Navbar Area --> */}
      </header>
      <Outlet />
    </>
  );
};

export default Header;
