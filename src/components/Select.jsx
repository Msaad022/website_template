import Select from "react-select";

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white", color: "red",padding: '6px 0px', border:'none' ,boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 20px 3px"}),
  option: (styles, { isSelected, isFocused }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? "rgb(246, 246, 246)"
        : isFocused
        ? "rgb(98, 189, 94)"
        : undefined,
      color: isSelected ? "black" : isFocused ? "white" : "rgb(98, 189, 94)",
      textAlign: "start",
    };
  },
  singleValue: (styles) => ({
    ...styles,
    color: "rgb(98, 189, 94)",
    textAlign: "start",
  }),
};
export const SelectElement = ({ sortSelectedHandler }) => {

  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
    { value: "highest_price", label: "Highest price" },
    { value: "lowest_price", label: "Lowest price" },
    { value: "highest_rate", label: "Highest rate" },
    { value: "lowest_rate", label: "Lowest rate" },
  ];

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={sortOptions[0]}
      options={sortOptions}
      styles={colourStyles}
      name="color"
      onChange={(e) => sortSelectedHandler(e)}
    />
  );
};

export default SelectElement;
