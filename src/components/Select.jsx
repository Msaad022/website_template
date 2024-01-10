export const SelectElement = ({ sortSelectedHandler }) => {

  const options = [
    {
      id: "latestID",
      name: "fav_language",
      val: "latest",
      text: "Latest",
      checked: true,
    },
    {
      id: "oldestID",
      name: "fav_language",
      val: "oldest",
      text: "Oldest",
      checked: false,
    },
    {
      id: "highest_priceID",
      name: "fav_language",
      val: "highest price",
      text: "Highest price",
      checked: false,
    },
    {
      id: "lowest_priceID",
      name: "fav_language",
      val: "lowest price",
      text: "Lowest price",
      checked: false,
    },
    {
      id: "highest_rateID",
      name: "fav_language",
      val: "highest rate",
      text: "Highest rate",
      checked: false,
    },
    {
      id: "lowest_rateID",
      name: "fav_language",
      val: "lowest rate",
      text: "Lowest rate",
      checked: false,
    },
  ];
  return (
    <>
      <p id="listbox1label" role="label" className="sr-only">
        SortBy
      </p>
      {/* 
          This code is a Select simulation that is responsive on all browsers without changing the design, without JavaScript, and works with the ssr.
      But it is not better with Accessibility 
       */}

      <HandlerSelect options={options} globalChanged={sortSelectedHandler} />
    </>
  );
};

export default SelectElement;

export function HandlerSelect({ options, globalChanged }) {
  return (
    <fieldset
      action="#"
      role="listbox"
      id="listbox1"
      aria-labelledby="listbox1label"
      className="relative w-full text-gray-700 sm:text-sm select-none min-w-44 z-20"
      tabIndex={3}
    >
      <div
        tabIndex={4}
        className="focus:pointer-events-none peer/back h-9 w-full bg-white border border-gray-300 rounded-lg [&:focus+div>div:first-child]:border-t [&:focus+div_label]:max-h-screen [&:focus+div_label]:opacity-100 "
      ></div>
      <div className="w-full absolute peer-focus/back:shadow-lg  [&>div:first-child]:pt-1 [&>div:last-child]:pb-1 ">
        {options.map(({ id, name, val, text, checked }, index) => {
          return (
            <div
              tabIndex={5 + index}
              role="button"
              aria-pressed="false"
              key={id}
              className="px-1"
            >
              <input
                type="radio"
                className="peer/input hidden [&:checked~label>span]:bg-main-color [&:checked~label>span]:text-white [&:checked+div]:flex" //
                id={`${id}`}
                name={`${name}`}
                value={`${val}`}
                defaultChecked={checked}
                onChange={(e) => globalChanged(e)}
              />
              <div className="pointer-events-none items-center hidden h-9 pl-2 w-full absolute -top-9 overflow-x-hidden">
                <span className="block w-full">{text}</span>
              </div>
              <label
                htmlFor={`${id}`}
                className="block bg-white opacity-0 max-h-0 transition-[opacity_1s_ease-out] cursor-pointer overflow-hidden"
              >
                <span className="block p-1 hover:bg-gray-200">{text}</span>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
