import React, { useState, useCallback } from "react";
import PopupWithForm from "../Popups/PopupWithForm";
import Input from "../Input/Input";
import Popup from "../Popup";
import Form from "../Form";

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
    <Popup
      name="addPhoto"
      popupStyle="popup_style_form"
      {...props}
      >
      <Form
        title="Новое место"
        formClass="popup"
        submitValue="Сохранить"
        onSubmit={handleSubmit}
      >
        <Input
          name="photoTitle"
          theme="light"
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
          theme="light"
          type="url"
          placeholder="Ссылка на картинку"
          isRequired={true}
          value={link}
          onChange={handleChangeLink}
        />
      </Form>
    </Popup>
  );
}
