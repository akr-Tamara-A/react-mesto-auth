import React, { useState, useCallback } from "react";
import PopupWithForm from "../Popups/PopupWithForm";
import Input from "../Input/Input";

export default function AddPlacePopup({onAddPlace, ...props}) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const handleChangeTitle = useCallback(evt => {
    setTitle(evt.target.value);
  }, [setTitle]);

  const handleChangeLink = useCallback(evt => {
    setLink(evt.target.value);
  }, [setLink]);

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();
    onAddPlace(title, link);
    setTitle('');
    setLink('');
  }, [title, link, onAddPlace]);


  return (
    <PopupWithForm
      name="addPhoto"
      title="Новое место"
      submitValue="Сохранить"
      {...props}
      onSubmit={handleSubmit}
    >
      <Input
        name="photoTitle"
        type="text"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        isRequired={true}
        value={title}
        onChange={handleChangeTitle}
      />
      <Input
        name="photoLink"
        type="url"
        placeholder="Ссылка на картинку"
        isRequired={true}
        value={link}
        onChange={handleChangeLink}
      />
    </PopupWithForm>
  );
}
