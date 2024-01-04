// import { useEffect } from "react";
// import { jqueryHandlerCustom } from "../../public/assets/js/custom";
import { Footer } from "../components";
const StarWrapper = (Component) =>
  function HOC() {
    // useEffect(() => {
    //   jqueryHandlerCustom.function();
    // }, []);

    return (
      <>
        <Component />

        {/* <!-- Start Go Top Area --> */}
        <div className="go-top">
          <i className="bx bx-chevrons-up"></i>
          <i className="bx bx-chevrons-up"></i>
        </div>
        <Footer />
        {/* <!-- End Go Top Area --> */}
      </>
    );
  };

export default StarWrapper;
