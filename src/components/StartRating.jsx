const IsInt = (n) => Number(n) === n && n % 1 === 0;

export const PriceProduct = ({ price }) => {
  return (
    <div className="price">
      <span className="new-price">
        {`$${price}${IsInt(price) ? ".00" : ""}`}
      </span>
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
        <i className="bx bxl-facebook"></i>
      </a>
    </div>
  );
};

export const StartRating = ({ stars }) => {
  const starsCeil = Math.ceil(stars);

  return [...Array(5)].map((x, index) => {
    index++;
    return (
      <li key={index}>
        <i
          className={`bx bxs-star ${
            !IsInt(stars) && index == starsCeil
              ? "startRating"
              : index <= starsCeil
              ? "ratingGold"
              : ""
          }`}
        ></i>
      </li>
    );
  });
};
