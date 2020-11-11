import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Form from "../components/Form";
import Input from "../components/Input/Input";

import * as auth from '../Auth.js';


/** Страница авторизации пользователя */
function Login(props) {
  const history = useHistory();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (evt) => {
    console.log(loginData);
    evt.preventDefault();
    if (!loginData.email || !loginData.password) {
      return;
    }
    auth
      .authorize(loginData.email, loginData.password)
      .then((res) => {
        console.log(res);
        if (res.token) {
          props.handleLogin();
          // history.push("/mesto-react");
        } else {
          return Promise.reject(`Что-то пошло не так: ${res.error}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  /** Основная разметка */
  return (
    <>
      <Header>
        <Link to='/signup' className="link header__link">Регистрация</Link>
      </Header>
      <div className="content page__content">
        <Form
          title="Вход"
          submitValue="Войти"
          onSubmit={handleSubmit}
          formClass="page"
        >
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            isRequired={true}
            theme="dark"
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Пароль"
            isRequired={true}
            theme="dark"
            onChange={handleChange}
          />
        </Form>
      </div>

      <Footer />
    </>
  );
}

export default Login;
