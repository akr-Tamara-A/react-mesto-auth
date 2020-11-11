import React from 'react';
import Popup from './Popup';
import './styles/infoBlock.css';


/** Компонент "Попап редактирование профиля" */
export default function InfoTooltip(props) {

  return (
    <Popup name="infoTooltip" popupStyle="popup_style_form" {...props}>
      <div className="infoBlock">
        <img 
          className="infoBlock__icon" 
          src={`${props.isSuccess ? '../images/yes.svg' : '../images/no.svg'}`}
          alt={`${props.isSuccess ? 'Успешно' : 'Неудача'}`} 
        />
        <p className="infoBlock__text">
        {`${props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`} 
        </p>
      </div>
    </Popup>
  );
}
