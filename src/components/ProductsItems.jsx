import { Link } from "react-router-dom";
import { StartRating, PriceProduct } from "../components";
import HeartFill from '../../public/assets/images/heart.svg'
const ProductsItems = ({products ,productHandler ,addCart ,addWishList }) => {
  return (
    <div className="row">
      {products?.map((item,index) => {
        return (
          <div key={item.id} className="col-lg-4 col-sm-6">
            <div className="single-product">
              <div className="product-img">
                <img src={item.images[0]} alt="Image" />

                <span
                  style={{
                    backgroundColor: item.state == "Sale" ? "#ed1d24" : "",
                  }}
                >
                  {item.state}
                </span>

                <ul>
                  <li>
                    <a
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => productHandler(item.id)}
                    >
                      <i className="bx bx-show-alt"></i>
                    </a>
                  </li>
                  <li>
                    <button type="button" onClick={()=>addCart(item.id,1,item.quantity)} className="default-btn">
                      <i className="bx bx-cart"></i>
                      Add to Cart
                    </button>
                  </li>
                  <li>
                    <a type="button" onClick={()=> addWishList(item.id,index,item.is_liked)}>
                      {
                        item.is_liked ? (
                          <img src={HeartFill} alt="heart" />
                        ):(
                          <i className="bx bx-heart"></i>
                        )
                      }
                    </a>
                  </li>
                </ul>
              </div>

              <Link to={`/products/${item.id}`}>
                <h3>{item.name}</h3>
              </Link>
              <ul className="ratingStars">
                <StartRating stars={item.stars} />
              </ul>

              <PriceProduct price={item.new_price} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsItems;
