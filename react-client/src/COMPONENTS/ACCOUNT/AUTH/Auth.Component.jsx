import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import "./Auth.Component.scss";

import AuthController from "./Auth.Controller";
import LoaderSpinerComponent from "../../LOADERSPINER/LoaderSpiner.Component";

const Auth = () => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);

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
    </div>
  );
};

export default Auth;
