const Footer = () => {
  return (
    <>
      <footer className="footer-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-footer-widget">
                <a href="#" className="logo">
                  <img
                    src="https://fmtest.smappsllc.com/website/assets/images/white-logo.png"
                    alt="Image"
                    style={{width: '200px', height: '70px'}}
                  />
                </a>

                <ul className="open-close">
                  <li>
                    <span>Opening Hours:</span>
                  </li>
                  <ul className="open-close">
                    <li>Monday: 8:00 AM - 8:00 PM</li>
                    <li>Saturday: 10:00 AM - 8:00 PM</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </ul>

                <ul className="social-icon">
                  <li>
                    <span>Follow Us:</span>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="bx bxl-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="bx bxl-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="bx bxl-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i>
                        <img
                          src="https://fmtest.smappsllc.com/img/tiktok-16.png"
                          className="p-1"
                        />
                      </i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="single-footer-widget">
                <h3>Contact us</h3>

                <ul className="address">
                  <li className="location">
                    <i className="bx bx-location-plus"></i>
                    <span>1424 Bridge Avenue Franklin, LA 70538</span>
                  </li>
                  <li>
                    <i className="bx bx-envelope"></i>

                    <a href="mailto: fattofit.fit98@gmail.com">
                      <span
                        className="__cf_email__"
                        data-cfemail="127a777e7e7d52737364733c717d7f"
                      >
                        fattofit.fit98@gmail.com
                      </span>
                    </a>
                  </li>
                  <li>
                    <i className="bx bx-phone"></i>

                    <a href="tel:+2010199155779">
                      2010199155779
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="single-footer-widget">
                <h3>Quick Links</h3>

                <ul className="import-link">
                  <li>
                    <a href="#">
                      Get Appointment
                    </a>
                  </li>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Services</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copy-right-area">
        <div className="container">
          <p>Copyright@ 2023 FAT2FIT.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
