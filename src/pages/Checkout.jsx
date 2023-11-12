import { SectionWrapper } from "../hoc";

const Checkout = () => {
  return (
    <>
      {/* <!-- Start Page Title Area -->  */}
      <div className="page-title-area bg-17">
        <div className="container">
          <div className="page-title-content">
            <h2>Checkout</h2>

            <ul>
              <li>
                <a href="index.html">Home</a>
              </li>

              <li>Shop</li>

              <li className="active">Checkout</li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- End Page Title Area -->  */}

      {/* <!-- Start Checkout Area -->  */}
      <section className="checkout-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="log-in-coupon-code">
                <div className="faq-accordion">
                  <ul className="accordion">
                    <li className="accordion-item">
                      <a className="accordion-title" href="javascript:void(0)">
                        Returning Customer? Click Here to Login
                      </a>

                      <div className="contact-form-action accordion-content">
                        <p>
                          Quisque gravida turpis sit amet nulla posuere lacinia.
                          Cras sed est sit amet ipsum luctus.
                        </p>

                        <form method="post">
                          <div className="row">
                            <div className="col-12">
                              <div className="form-group">
                                <input
                                  className="form-control"
                                  type="text"
                                  name="name"
                                  placeholder="Username or Email"
                                />
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="form-group">
                                <input
                                  className="form-control"
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                />
                              </div>
                            </div>

                            <div className="col-12">
                              <button className="default-btn btn-two" type="submit">
                                Log In
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="faq-accordion">
                  <ul className="accordion">
                    <li className="accordion-item">
                      <a className="accordion-title" href="javascript:void(0)">
                        Have a Coupon? Click Here to Enter Your Code
                      </a>

                      <div className="contact-form-action accordion-content">
                        <p>Now Apply Coupon</p>

                        <form method="post">
                          <div className="row">
                            <div className="col-12">
                              <div className="form-group">
                                <input
                                  className="form-control"
                                  type="text"
                                  name="Coupon"
                                  placeholder="Coupon Code"
                                />
                              </div>
                            </div>

                            <div className="col-12">
                              <button className="default-btn btn-two" type="submit">
                                Apply Coupon
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <form>
                <div className="billing-details">
                  <h3 className="title">Billing Details</h3>

                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>
                          First Name <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>
                          Last Name <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>
                          Email <span className="required">*</span>
                        </label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>
                          Phone <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Company Name (Optional)</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>
                          Country <span className="required">*</span>
                        </label>

                        <div className="select-box">
                          <select className="form-control">
                            <option defaultValue="5">United Kingdom</option>
                            <option defaultValue="1">China</option>
                            <option defaultValue="2">United Arab Emirates</option>
                            <option defaultValue="0">Germany</option>
                            <option defaultValue="3">France</option>
                            <option defaultValue="4">Japan</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-6">
                      <div className="form-group">
                        <label>
                          Street Address <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-6">
                      <div className="form-group">
                        <label>
                          Town / City <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>
                          State<span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>
                          Zip <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="ship-different-address"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="ship-different-address"
                        >
                          Ship to a Different Address?
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Order Notes (Optional)</label>
                        <textarea
                          name="notes"
                          id="notes"
                          cols="30"
                          rows="8"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <button className="default-btn">Send Message</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="order-details">
                <div className="cart-totals">
                  <h3>Checkout Summary</h3>

                  <ul>
                    <li>
                      Subtotal <span>$420.00</span>
                    </li>
                    <li>
                      Shipping <span>$420.00</span>
                    </li>
                    <li>
                      Coupon <span>$00.00</span>
                    </li>
                    <li>
                      Total <span>$420.00</span>
                    </li>
                    <li>
                      <b>Payable Total</b>{" "}
                      <span>
                        <b>$420.00</b>
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="faq-accordion">
                  <h3>Payment Method</h3>

                  <ul className="accordion">
                    <li className="accordion-item active">
                      <a className="accordion-title" href="javascript:void(0)">
                        Direct Bank Transfer
                      </a>

                      <p className="accordion-content show">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        won’t be shipped until the funds have our account.
                      </p>
                    </li>

                    <li className="accordion-item">
                      <a className="accordion-title" href="javascript:void(0)">
                        Cash on Delivery
                      </a>

                      <p className="accordion-content">
                        Please send your cheque to Store Name, Store Street,
                        Store Town, Store State / County, Store Postcode.
                      </p>
                    </li>

                    <li className="accordion-item">
                      <a className="accordion-title" href="javascript:void(0)">
                        PayPal
                      </a>

                      <p className="accordion-content">
                        Pay via PayPal; you can pay with your credit card if you
                        don’t have a PayPal account.
                      </p>
                    </li>

                    <li className="accordion-item">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="ship-differents-address"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="ship-different-address"
                        >
                          I’ve read and accept the{" "}
                          <a href="terms-conditions.html">terms & conditions</a>
                          *
                        </label>
                      </div>
                    </li>

                    <li className="place-order">
                      <a href="#" className="default-btn two">
                        <span>Place Order</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Checkout Area --> */}
    </>
  );
};

export default SectionWrapper(Checkout);

export const CheckoutLoader = async () => {

  return {msg:"dddddddddddddddddddd"};
};
