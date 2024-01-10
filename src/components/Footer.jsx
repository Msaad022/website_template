import { FiPhone } from "react-icons/fi";
import { BiEnvelope } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoInstagram } from "react-icons/io";
import { FiYoutube } from "react-icons/fi";
const Footer = () => {
  return (
    <>
      <footer className="bg-[#111111] text-white p-6 pt-16">
        <div className="flex flex-wrap gap-5 justify-start sm:justify-around">
          <div className="col-lg-4 col-md-6">
            <a href="#" className=" block mb-4">
              <img src="/assets/images/white-logo.png" alt="Image logo" />
            </a>

            <ul className="mt-2 [&>li:not(:first-child)]:mb-1">
              <li className="mb-3">
                <span>Opening Hours:</span>
              </li>
              <li>Monday: 8:00 AM - 8:00 PM</li>
              <li>Saturday: 10:00 AM - 8:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>

            <ul className="mt-4 flex flex-wrap gap-3 items-center ">
              <li>
                <span>Follow Us:</span>
              </li>
              <li>
                <a href="#" target="_blank">
                  <TiSocialFacebook />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <IoLogoInstagram />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <FiYoutube />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold border-b py-3 border-gray-700">
              Contact us
            </h3>

            <ul className=" mt-2 *:my-5 *:flex *:flex-wrap *:gap-4 *:items-start [&>li>svg]:text-2xl [&>li>svg]:text-main-color">
              <li className="location">
                <GrLocation className="" />
                <span>1424 Bridge Avenue Franklin, LA 70538</span>
              </li>
              <li>
                <BiEnvelope className="" />
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
                <FiPhone className="" />
                <a href="tel:+2010199155779">2010199155779</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold border-b py-3 border-gray-700">
              Quick Links
            </h3>

            <ul className="mt-2 *:my-4">
              <li>
                <a href="#">Get Appointment</a>
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
        <div className=" p-3 pt-9 text-center ">
          <p>Copyright@ 2023 FAT2FIT.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
