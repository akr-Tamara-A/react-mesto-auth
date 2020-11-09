import React from "react";

/** Компонент "Попап с формой" */
export default function PopupWithForm(props) {

  /** Разметка попапа с формой */
  return (
    <div
      id={props.name}
      className={`popup popup_style_form ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__container">
        <button
          name="editProfileClose"
          type="button"
          title="Закрыть окно"
          onClick={props.onClose}
          className="popup__close"
        />
        <form
          action="#"
          name={props.name}
          noValidate
          onSubmit={props.onSubmit}
          className="popup__form"
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            name={`${props.name}Submit`}
            type="submit"
            className="popup__submit"
          >
            {props.submitValue}
          </button>
        </form>
      </div>
    </div>
  );
}

