import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import styles from "./RadioButton.module.scss";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

function GroupRadioButton({ name, options, defaultValue, disabled }) {
  const { control  , formState: { errors },} = useFormContext();
  return (
    <div>
      {options.map((option, index) => (
        <div key={index}>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            shouldUnregister={false}
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
      {errors[name]?.message?.length > 0 && (
        <ErrorMessage error={errors[name]?.message} />
      )}
    </div>
  );
}

export default GroupRadioButton;
