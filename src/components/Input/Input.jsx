import React, { forwardRef } from "react";

/** Компонент "Инпут" */
const Input = forwardRef(({ name, isRequired, ...rest }, ref) => {
  /** Разметка инпута */
  return (
    <label className="popup__form-field">
      <input
        ref={ref}
        id={`input-${name}`}
        required={isRequired}
        {...rest}
        className="popup__input"
      />
      <span id={`input-${name}-error`} className="popup__input-error"></span>
    </label>
  );
});
export default Input;
