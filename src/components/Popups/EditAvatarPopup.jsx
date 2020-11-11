import React, { useCallback, createRef } from "react";
import PopupWithForm from "../Popups/PopupWithForm";
import Input from "../Input/Input";
import Popup from "../Popup";
import Form from "../Form";

export default function EditAvatarPopup({ onUpdateAvatar, ...props }) {
  const inputRef = createRef();

  const handleSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      onUpdateAvatar(inputRef.current.value);
    },
    [inputRef, onUpdateAvatar]
  );

  return (
    <Popup 
      name="editAvatar" 
      popupStyle="popup_style_form"
      {...props}
      >
      <Form
        title="Обновить аватар" 
        submitValue="Сохранить"
        formClass="popup"
        onSubmit={handleSubmit}
      >
        <Input
          name="avatar"
          theme="light"
          type="url"
          placeholder="Ссылка на новый аватар"
          isRequired={true}
          ref={inputRef}
        />
      </Form>
    </Popup>
  );
}
