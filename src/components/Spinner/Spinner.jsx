import React from 'react'; 
import './Spinner.css'; 
 
/** Компонент "Спиннер" */ 
export default function Spinner() { 
  /** Разметка спиннера */ 
  return ( 
    <div className="spinner"> 
      <div className="spinner__item"></div> 
    </div> 
  ); 
} 