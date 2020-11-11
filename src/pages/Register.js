import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Form from "../components/Form";
import Input from "../components/Input/Input";

import * as auth from '../Auth.js';


/** Страница авторизации пользователя */
function Register(props) {
  const history = useHistory();

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    auth
      .register(registerData.email, registerData.password)
      .then((res) => {
        if(res.data) {
          props.isSuccess(true);
          history.push("/signin");
        } else {
          props.isSuccess(false);
          return Promise.reject(`Что-то пошло не так: ${res.error}`);
        }
      })
      .catch((err) => {
        console.log(err);
        props.isSuccess(false);
      });




    // try {
    //   const data = await auth.register(registerData.email, registerData.password);

    //   if (data.status === 400) {
    //     console.log(data)
    //     props.isSuccess(false);
    //     throw new Error (data.error);
    //   } else {
    //     props.isSuccess(true);
    //     history.push('/sign-in');
    //     setRegisterData({
    //       email: '',
    //       password: '',
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    //   props.isSuccess(false);
    // }
  };

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
        <Link to='/signin' className="link header__link">Войти</Link>
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
            value={registerData.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Пароль"
            isRequired={true}
            theme="dark"
            value={registerData.password}
            onChange={handleChange}
          />
        </Form>
        <Link className="link form__link" to="/signin">Уже зарегистрированы? Войти</Link>
      </div>

      <Footer />
    </>
  );
}

export default Register;
