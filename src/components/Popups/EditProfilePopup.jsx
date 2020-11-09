import React, { useState, useContext, useCallback, useEffect } from 'react';
import PopupWithForm from "../Popups/PopupWithForm";
import Input from "../Input/Input";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


/** Компонент "Попап редактирование профиля" */
export default function EditProfilePopup({onUpdateUser, ...props}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
    }
  }, [currentUser]);


  const handleOnChangeName = useCallback(evt => {
    setName(evt.target.value);
  }, [setName]);

  const handleOnChangeDescription = useCallback(evt => {
    setDescription(evt.target.value);
  }, [setDescription]);

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();

    onUpdateUser({
      name, 
      about: description});
  }, [name, description, onUpdateUser]);

  return (
    <PopupWithForm
    name="editProfile"
    title="Редактировать профиль"
    submitValue="Сохранить"
    {...props}
    onSubmit={handleSubmit}
  >
    <Input
      name="userName"
      type="text"
      minLength="2"
      maxLength="40"
      pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
      placeholder="Имя пользователя"
      isRequired={true}
      value={name}
      onChange={handleOnChangeName}
      />
    <Input
      name="userJob"
      type="text"
      minLength="2"
      maxLength="200"
      placeholder="О себе"
      isRequired={true}
      value={description}
      onChange={handleOnChangeDescription}
    />
  </PopupWithForm>
  )
}