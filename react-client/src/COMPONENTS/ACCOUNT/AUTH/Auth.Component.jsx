import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Toast from "./../../../Toast";

import "./Auth.Component.scss";

import AuthController from "./Auth.Controller";
import LoaderSpinerComponent from "../../LOADERSPINER/LoaderSpiner.Component";
import FooterComponent from "./../../MAINPAGE/FOOTER/Footer.Component";

const Auth = ({ setDataAccount, dataAccount }) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);

  const [loginUser, setLoginUser] = useState(``);
  const [passwordUser, setPasswordUser] = useState(``);

  const navigate = useNavigate();

  useEffect(() => {
    if (dataAccount !== null) {
      new Toast({
        title: "Оповещение о авторизации",
        text: `Впринципе, вам не надо авторизацию. Просто нажмите "Главная", а потом "Личный Кабинет".`,
        theme: "info",
        autohide: true,
        interval: 10000,
      });
    }
  }, []);

  return (
    <div className="Auth">
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ""}

      <header className="header">
        <div className="central-container">
          <div
            className="header__logo"
            onClick={() => {
              window.open("http://osu.ru/", "_blank");
            }}
          ></div>

          <div className="header__center">
            <span className="header__desktop-title">
              Проект Оренбургского Государственного Университета
            </span>

            <span className="header__mobile-title">Проект ОГУ</span>
          </div>

          <div className="header__right">
            <RouterLink to="/" className="header-dashboard">
              Главная
            </RouterLink>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="central-container">
          <h2>Авторизация аккаунта в системе</h2>

          <div className="text-field text-field_floating-3">
            <input
              className="text-field__input"
              id="LoginUser"
              name="LoginUser"
              placeholder="LoginUser"
              value={loginUser}
              onChange={(e) => {
                setLoginUser(e.target.value);
              }}
            />
            <label className="text-field__label" htmlFor="LoginUser">
              Введите ваш логин
            </label>
          </div>

          <div className="text-field text-field_floating-3">
            <input
              className="text-field__input"
              id="PasswordUser"
              name="PasswordUser"
              placeholder="PasswordUser"
              value={passwordUser}
              onChange={(e) => {
                setPasswordUser(e.target.value);
              }}
            />
            <label className="text-field__label" htmlFor="PasswordUser">
              Введите ваш пароль
            </label>
          </div>

          <button
            className="beautiful-button beautiful-button-green"
            onClick={() => {
              AuthController(
                {
                  loginUser,
                  passwordUser,
                },
                setLoadSpinerActive,
                navigate,
                setDataAccount
              );
            }}
          >
            авторизация
          </button>
        </div>
      </main>

      <FooterComponent />
    </div>
  );
};

export default Auth;
