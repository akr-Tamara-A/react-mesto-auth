import React from "react";
import './styles/popup.css';

/** Компонент "Попап" */
export default function Popup(props) {

  /** Разметка попапа */
  return (
    <div
      id={props.name}
      className={`popup ${props.popupStyle} ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__container">
        <button
          name="editProfileClose"
          type="button"
          title="Закрыть окно"
          onClick={props.onClose}
          className="popup__close"
        />

        {props.children}
        
      </div>
    </div>
  );
}

