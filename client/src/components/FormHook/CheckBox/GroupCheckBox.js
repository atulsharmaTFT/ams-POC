import React from "react";
import { Controller, useFormContext } from "react-hook-form";

function GroupCheckBox({ name, options, onChange, defaultValue }) {
  const { control } = useFormContext();

  return (
    <div>
      {options.map((option, index) => (
        <div key={index}>
          <Controller
            name={`${name}[${index}].checked`}
            control={control}
            defaultValue={option?.checked}
            render={({ field }) => (
              <>
                <input
                  type="checkbox"
                  id={option?.option}
                  checked={field.value}
                  {...field}
                />
                <label>{option?.option}</label>
              </>
            )}
          />
          <Controller
            name={`${name}[${index}].option`}
            control={control}
            defaultValue={option?.option}
            render={({ field }) => <input type="hidden" {...field} />}
          />
        </div>
      ))}
    </div>
  );
}

export { GroupCheckBox };
