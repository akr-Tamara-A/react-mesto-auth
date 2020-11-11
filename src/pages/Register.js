import React, { useEffect, useState } from "react";

import Header from "../components/Header/Header";

import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import Input from "../components/Input/Input";
import InfoTooltip from "../components/InfoTooltip";


/** Страница авторизации пользователя */
function Register() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (evt) => {
    console.log('sign-in');
    setIsOpen(true);
    console.log(registerData);
    evt.preventDefault();
  };

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

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
            name="email"
            type="email"
            placeholder="E-mail"
            isRequired={true}
            theme="dark"
            // value={description}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Пароль"
            isRequired={true}
            theme="dark"
            // value={description}
            onChange={handleChange}
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

