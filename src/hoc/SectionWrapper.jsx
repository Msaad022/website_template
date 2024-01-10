import { Footer } from "../components";
import { Toaster } from "react-hot-toast";

const StarWrapper = (Component) =>
  function HOC() {
    return (
      <>
        <Toaster />
        <Component />
        <Footer />
      </>
    );
  };

export default StarWrapper;
