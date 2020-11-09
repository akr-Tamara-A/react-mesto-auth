import React, { useCallback, createRef } from "react";
import PopupWithForm from "../Popups/PopupWithForm";
import Input from "../Input/Input";

export default function EditAvatarPopup({ onUpdateAvatar, ...props}) {
  const inputRef = createRef();

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }, [inputRef, onUpdateAvatar]);

  return (
    <PopupWithForm
      name="editAvatar"
      title="Обновить аватар"
      {...props}
      onSubmit={handleSubmit}
    >
      <Input
        name="avatar"
        type="url"
        placeholder="Ссылка на новый аватар"
        isRequired={true}
        ref={inputRef}
      />
    </PopupWithForm>
  );
}
