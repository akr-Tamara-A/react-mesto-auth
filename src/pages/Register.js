import React, { useEffect, useState } from "react";

import Header from "../components/Header/Header";

import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import Input from "../components/Input/Input";
import InfoTooltip from "../components/InfoTooltip";


/** Страница авторизации пользователя */
function Register() {
  const [isOpen, setIsOpen] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);

  const handleSubmit = (evt) => {
    console.log('sign-in');
    setIsOpen(true);
    evt.preventDefault();
  };

  const handleClose = () => {
    setIsOpen(false);
  }

  /** Основная разметка */
  return (
    <>
      <Header>
        <Link to='/sign-in' className="link header__link">Войти</Link>
      </Header>
      <div className="content page__content">
        <Form
          title="Регистрация"
          submitValue="Зарегистрироваться"
          onSubmit={handleSubmit}
          formClass="page"
        >
          <Input
            name="userEmail"
            type="email"
            placeholder="E-mail"
            isRequired={true}
            theme="dark"
            // value={description}
            // onChange={handleOnChangeDescription}
          />
          <Input
            name="userPassword"
            type="password"
            placeholder="Пароль"
            isRequired={true}
            theme="dark"
            // value={description}
            // onChange={handleOnChangeDescription}
          />
        </Form>
        <Link className="link form__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </div>

      <Footer />
      <InfoTooltip isOpen={isOpen} isSuccess={isSuccess} onClose={handleClose} />
    </>
  );
}

export default Register;

