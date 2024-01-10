const IsInt = (n) => Number(n) === n && n % 1 === 0;
import { TiStarFullOutline } from "react-icons/ti";
import { TiStarHalfOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import { TiSocialFacebook } from "react-icons/ti";
export const PriceProduct = ({ price }) => {
  return (
    <div className="tracking-wider text-main-color sm:text-xl">
      <p className="">{`$${price}${IsInt(price) ? ".00" : ""}`}</p>
    </div>
  );
};

export const FacebookButton = () => {
  return (
    <div
      className="fb-share-button"
      data-href="https://www.facebook.com/mohamedsaad001/"
      data-lazy="true"
    >
      <a
        rel="noopener"
        target="_blank"
        href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2Fmohamedsaad001%2F&amp;src=sdkpreparse"
        className="fb-xfbml-parse-ignore"
      >
        <TiSocialFacebook />{" "}
      </a>
    </div>
  );
};

export const StarRating = ({ stars }) => {
  const starsCeil = Math.ceil(stars);

  return (
    <ul className="text-star text-lg flex flex-wrap gap-[2px] py-3">
      {[...Array(5)].map((x, index) => {
        index++;
        return (
          <li key={index}>
            {!IsInt(stars) && index == starsCeil ? (
              <TiStarHalfOutline />
            ) : index <= starsCeil ? (
              <TiStarFullOutline />
            ) : (
              <TiStarOutline />
            )}
          </li>
        );
      })}
    </ul>
  );
};
