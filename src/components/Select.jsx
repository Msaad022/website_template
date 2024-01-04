export const SelectElement = ({ sortSelectedHandler }) => {
  sortSelectedHandler = function (e) {
    return console.log(e.target.value);
  };
  const options = [
    {
      id: "latestID",
      classN: "latest",
      name: "fav_language",
      val: "latest",
      text: "Latest",
      checked: true,
    },
    {
      id: "oldestID",
      classN: "oldest",
      name: "fav_language",
      val: "oldest",
      text: "Oldest",
      checked: false,
    },
    {
      id: "highest_priceID",
      classN: "highest_price",
      name: "fav_language",
      val: "highest price",
      text: "Highest price",
      checked: false,
    },
    {
      id: "lowest_priceID",
      classN: "lowest_price",
      name: "fav_language",
      val: "lowest price",
      text: "Lowest price",
      checked: false,
    },
    {
      id: "highest_rateID",
      classN: "highest_rate",
      name: "fav_language",
      val: "highest rate",
      text: "Highest rate",
      checked: false,
    },
    {
      id: "lowest_rateID",
      classN: "lowest_rate",
      name: "fav_language",
      val: "lowest rate",
      text: "Lowest rate",
      checked: false,
    },
  ];
  return (
    // <div className=" min-w-40 w-full ">
    <>
      <p id="listbox1label" role="label" className="sr-only">
        SortBy
      </p>
      <HandlerSelect options={options} globalChanged={sortSelectedHandler} />
    </>
    // </div>
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
      onclick="return listItemClick(event);"
      onkeydown="return listItemKeyEvent(event);"
      onkeypress="return listItemKeyEvent(event);"
      aria-activedescendant="listbox1-1"
      className="group/select relative w-full text-gray-700 sm:text-sm select-none"
    >
      <div
        tabIndex={3}
        className="peer/back h-9 w-full bg-white border border-gray-300 rounded-lg [&:focus+div>div:first-child]:border-t [&:focus+div_label]:max-h-screen [&:focus+div_label]:opacity-100 "
      ></div>
      <div className="w-full absolute peer-focus/back:shadow-lg  [&>div:first-child]:pt-1 [&>div:last-child]:pb-1 "> 
      {/* peer-focus/back:border shadow-lg */}
        {options.map(({ id, name, val, text, checked }) => {
          return (
            <div className="px-1">
              <input
                type="radio"
                className="peer/input hidden [&:checked~label>span]:bg-red-300 [&:checked+div]:flex" //
                id={`${id}`}
                name={`${name}`}
                value={`${val}`}
                defaultChecked={checked}
                onChange={(e) => globalChanged(e)}
              />
              <div
                tabIndex={4}
                className="pointer-events-none items-center hidden h-9 pl-2 w-full absolute -top-9 overflow-x-hidden"
              >
                <span className="block w-full">{text}</span>
              </div>
              <label
                htmlFor={`${id}`}
                // className="hidden duration-150 transition-[display] cursor-pointer overflow-hidden"
                className="block opacity-0 max-h-0 transition-[opacity_1s_ease-out] cursor-pointer overflow-hidden"
              >
                <span className="block p-1 hover:bg-gray-200">
                  {text}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
