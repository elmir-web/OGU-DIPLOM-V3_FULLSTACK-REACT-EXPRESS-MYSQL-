import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import "./Auth.Component.scss";

import AuthController from "./Auth.Controller";
import LoaderSpinerComponent from "../../LOADERSPINER/LoaderSpiner.Component";

const Auth = ({ dataAccount, setDataAccount }) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);

  const [loginUser, setLoginUser] = useState(``);
  const [passwordUser, setPasswordUser] = useState(``);

  const navigate = useNavigate();

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

      <footer className="footer">
        <div className="central-container">
          <div>
            Началом работы считается третий курс. Предмет Дмитрия Владимировича
            Горбачёва - "БД и СуБД".
          </div>

          <div>
            Проект разрабатывается согласно моему решению о расширении до темы
            диплома. Разработчик - студент З-18ПИнж(ба)РПиС -{" "}
            <a href="http://elmir-web.github.io" target="_blank">
              Кубагушев Эльмир
            </a>
            .
          </div>
          <div>
            Тема диплома: "Прогнозирование стратегического запаса топлива".
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Auth;
