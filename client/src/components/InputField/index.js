import React from "react";
import styles from "./inputField.module.scss";
// import ErrorMessage from "../ErrorMessage";

const InputField = ({
  textColor,
  label,
  fieldName,
  placeholder,
  onChange,
  disabled,
  type,
  onIconClick: propsOnIconClick,
  containerOverrideClassName,
  labelClassName,
  inputOverrideClassName,
  suffixIcon,
  suffixIconText,
  rules,
  register,
  error,
  suffixIconOverrideClassName,
  onEnter,
  info,
  maxlength,
  overrideErrorClassName,
  style,
  min,
  max,
  step,
  ...rest
}) => {
  const getClassNames = () => {
    const classNames = [styles.input];
    if (inputOverrideClassName) {
      classNames.push(inputOverrideClassName);
    }
    if (disabled) {
      classNames.push(styles.disabledInput);
    }
    if (error) {
      classNames.push(styles.invalid);
    }
    return classNames.join(" ");
  };

  const onIconClick = () => {
    propsOnIconClick && propsOnIconClick();
  };

  const onKeyPress = (e) => {
    if (e.charCode === 13) {
      onEnter && onEnter();
    }
  };
  return (
    <div
      style={style}
      className={`${styles.inputAndLabelContainer} ${containerOverrideClassName}`}
    >
      {label && (
        <div className={`${styles.label} ${labelClassName}`}>
          {label}
          {info && <div>{info}</div>}
        </div>
      )}
      <div className={getClassNames()}>
        <input
          style={{ color: textColor }}
          type={type}
          name={fieldName}
          onChange={onChange}
          placeholder={placeholder}
          onKeyPress={onKeyPress}
          maxLength={maxlength}
          min={min}
          max={max}
          step={step}
          {...register(fieldName)}
          {...rest}
        />
        {suffixIcon && (
          <i
            onClick={onIconClick}
            className={`${suffixIcon} ${
              styles.suffixIcon
            } ${suffixIconOverrideClassName} ${
              propsOnIconClick ? styles.cursor_pointer : ""
            }`}
          />
        )}
        {suffixIconText && (
          <div className={styles.suffixIconText}>{suffixIconText}</div>
        )}
      </div>
      {/* <ErrorMessage
        error={error}
        overrideErrorClassName={overrideErrorClassName}
      /> */}
    </div>
  );
};

InputField.defaultProps = {
  type: "text",
  rules: {},
  onChange: null,
  register: () => {},
  containerOverrideClassName: "",
  labelClassName: "",
  suffixIconOverrideClassName: "",
  suffixIconText: "",
};

export default React.memo(InputField);
