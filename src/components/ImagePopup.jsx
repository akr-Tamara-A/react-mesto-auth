import React from 'react';
import Popup from './Popup';

/** Компонент "Попап просмотра фото" */
export default function ImagePopup(props) {
  /** Разметка попапа просмотра фото */
  return (
    <Popup
      name="viewPlace" 
      popupStyle="popup_style_view"
      {...props}
    >
      <div className="popup__view">
        <img 
          src={props.card && props.card.link} 
          alt={props.card && props.card.name} 
          className="popup__photo" />
        <p className="popup__photo-title">
          {props.card && props.card.name}
        </p>
      </div>
    </Popup>
    // <div id="popupViewPhoto" className={`popup popup_style_view ${props.card && "popup_opened"}`}>
    //   <div className="popup__container">
    //     <button
    //       name="viewPhotoClose"
    //       type="button"
    //       title="Закрыть окно"
    //       onClick={props.onClose}
    //       className="popup__close"
    //     />
    //     <div className="popup__view">
    //       <img 
    //         src={props.card && props.card.link} 
    //         alt={props.card && props.card.name} 
    //         className="popup__photo" />
    //       <p className="popup__photo-title">{props.card && props.card.name}</p>
    //     </div>
    //   </div>
    // </div>
  );
}


