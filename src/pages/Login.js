import React, { useEffect, useState } from "react";

import Header from "../components/Header/Header";

import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import Input from "../components/Input/Input";


/** Страница авторизации пользователя */
function Login() {
  const handleSubmit = (evt) => {
    console.log('sign-in');
    evt.preventDefault();
  };

  /** Основная разметка */
  return (
    <>
      <Header>
        <Link to='/sign-up' className="link header__link">Регистрация</Link>
      </Header>
      <div className="content page__content">
        <Form
          title="Вход"
          submitValue="Войти"
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
      </div>

      <Footer />
    </>
  );
}

export default Login;
