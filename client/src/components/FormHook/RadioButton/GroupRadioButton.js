import React from "react";
import { Controller, useFormContext } from "react-hook-form";

function GroupRadioButton({ name, options, handleChange,defaultValue }) {
  const { control } = useFormContext();
  console.log(options);
//   function toggleRadio(option,onChange){
//     const isChecked=options.filter(item=>item.checked===true)
//     if(isChecked.length>0){
//         const updatedChecked={...isChecked[0],checked:false}
//     }
//      onChange({
//         option: option.option,
//         checked: !option.checked ? true : false,
//       });
    
//   }
  return (
    <div>
      {/* <label>{label}</label> */}

      {options.map((option, index) => (
       
        <div key={index}>
             {console.log(option,"optttt")}
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            //  defaultValue={checked ? option : ''}
            render={({ field }) => (
              <>
              {console.log(field)}
                <input
                  type="radio"
                  id={option.option}
                  onChange={(e) => {
                    handleChange({
                        option: option.option,
                        checked: !option.checked ? true : false,
                      })
                    // console.log(e, option, "optionass");
                    // toggleRadio(option,field.onChange)
                  }}
                />
                <label>{option.option}</label>
              </>
            )}
          />
        </div>
      ))}
    </div>
  );
}

export default GroupRadioButton;
