import React, { useState } from "react";
import Select from "react-select";
import classes from "./MultiSelect.module.scss";
import { Capitalize } from "../../helper/commonHelpers";

const MultiselectDropdown = (props) => {
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      borderColor: "#dadce0",
      marginTop: 10,
      padding: 4,
      width: "100%",
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        padding: "10px",
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? "#141e30"
          : isFocused
          ? "#596372"
          : undefined,
        color: isDisabled
          ? "#596372"
          : isSelected
          ? "#141e30"
          : isFocused
          ? "#f2f2f2"
          : "#141e30",
        borderColor: isDisabled
          ? "#f2f2f2"
          : isSelected
          ? "#f2f2f2"
          : isFocused
          ? "#f2f2f2"
          : "#596372",
        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? "#141e30"
              : "#141e30"
            : undefined,
        },
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        color: "#141e30",
        ":hover": {
          backgroundColor: "red",
          color: "white",
        },
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: "white",
      backgroundColor: "#141e30",
      borderRadius: 0,
      textTransform: "capitalize",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "white",
      backgroundColor: "#141e30",
      ":hover": {
        backgroundColor: "red",
        color: "white",
      },
      borderRadius: 0,
    }),
  };

  let options = [];
  if (props?.data?.data) {
    const newData = props?.data?.data.filter(
      (elem) => elem.totalNoOfQuestions > 0
    );
    newData.map((item) => {
      const opt = { label: Capitalize(item?.name), value: item?._id };
      options.push(opt);
    });
  }
  if(props?.data){
    options = props?.data
  }
  return (
    <div className={`${classes.container} ${props.className}`}>
      <Select
        key={props.category}
        isMulti={props.isMulti}
        options={options}
        value={props.selected}
        onChange={props.handleChange}
        placeholder={props.category}
        className={classes.multiSelect}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.label}
        styles={colourStyles}
      />
    </div>
  );
};

export default MultiselectDropdown;
