import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Toast from "./../../../Toast";

import "./Register.Component.scss";

import RegisterController from "./Register.Controller";
import LoaderSpinerComponent from "../../LOADERSPINER/LoaderSpiner.Component";

const Register = ({ dataAccount }) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);

  const [surName, setSurName] = useState(``);
  const [name, setName] = useState(``);
  const [middleName, setMiddleName] = useState(``);
  const [loginUser, setLoginUser] = useState(``);
  const [passwordUser, setPasswordUser] = useState(``);

  const navigate = useNavigate();

  useEffect(() => {
    if (dataAccount !== null) {
      new Toast({
        title: "Оповещение о авторизации",
        text: `Впринципе, вам не надо регистрацию. Просто нажмите "Главная", а потом "Личный Кабинет".`,
        theme: "info",
        autohide: true,
        interval: 10000,
      });
    }
  }, []);

  return (
    <div className="Register">
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
          <h2>Регистрация аккаунта в системе на позицию стажера-кандидата</h2>

          <div className="text-field text-field_floating-3">
            <input
              className="text-field__input"
              id="SurName"
              name="SurName"
              placeholder="SurName"
              value={surName}
              onChange={(e) => {
                setSurName(e.target.value);
              }}
            />
            <label className="text-field__label" htmlFor="SurName">
              Ваша фамилия
            </label>
          </div>

          <div className="text-field text-field_floating-3">
            <input
              className="text-field__input"
              id="Name"
              name="Name"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label className="text-field__label" htmlFor="Name">
              Ваше имя
            </label>
          </div>

          <div className="text-field text-field_floating-3">
            <input
              className="text-field__input"
              id="MiddleName"
              name="MiddleName"
              placeholder="MiddleName"
              value={middleName}
              onChange={(e) => {
                setMiddleName(e.target.value);
              }}
            />
            <label className="text-field__label" htmlFor="MiddleName">
              Ваше отчество
            </label>
          </div>

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
              Придумайте ваш логин
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
              Придумайте ваш пароль
            </label>
          </div>

          <button
            className="beautiful-button beautiful-button-green"
            onClick={() => {
              RegisterController(
                { surName, name, middleName, loginUser, passwordUser },
                setLoadSpinerActive,
                navigate
              );
            }}
          >
            регистрация
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

export default Register;
