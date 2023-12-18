import React from "react";
import { Controller, useFormContext } from "react-hook-form";

function RHFCheckbox({ name, label }) {
  const { control } = useFormContext();

  return (
    <div>
      <label htmlFor={name}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        {label}
      </label>
    </div>
  );
}



function GroupCheckBox({ name, options ,onChange}) {
  const { control } = useFormContext();

  return (
    <div>
      
      {options.map((  {option,checked}, index) => (
       <div key={index}>
       <Controller
         name={`${name}[${index}].checked`}
         control={control}
         defaultValue={checked}
         render={({ field }) => (
           <>
             <input type="checkbox" id={option} {...field} />
             <label htmlFor={option}>{option}</label>
           </>
         )}
       />
       <Controller
         name={`${name}[${index}].option`}
         control={control}
         defaultValue={option}
         render={({ field }) => <input type="hidden" {...field} />}
       />
     </div>
      ))}
    </div>
  );
}

export { RHFCheckbox, GroupCheckBox };
