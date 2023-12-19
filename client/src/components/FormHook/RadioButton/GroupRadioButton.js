import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import styles from "./RadioButton.module.scss";

function GroupRadioButton({ name, options, defaultValue, disabled }) {
  const { control } = useFormContext();
  return (
    <div>
      {options.map((option, index) => (
        <div key={index}>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
              <div key={index} className={styles.radioButton}>
                <label>
                  <input
                    type="radio"
                    value={option.option}
                    checked={
                      field.value
                        ? field.value.option === option.option
                        : defaultValue?.option === option.option
                    }
                    onChange={() =>
                      field.onChange({
                        option: option.option,
                        checked: true,
                      })
                    }
                    disabled={disabled}
                    style={{ marginRight: "5px", width: "fit-content" }}
                  />
                  <span className={styles.radioLabelStyle}>
                    {option.option}
                  </span>
                </label>
              </div>
            )}
          />
        </div>
      ))}
    </div>
  );
}

export default GroupRadioButton;
