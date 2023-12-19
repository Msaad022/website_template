const PageTitle = ({title}) => {
  return (
    <div className="page-title-area bg-19">
      <div className="container">
        <div className="page-title-content">
          <h2>{title}</h2>

          <ul>
            <li>
              <a href="#">Home</a>
            </li>

            <li>Shop</li>

            <li className="active">{title}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
