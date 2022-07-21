import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Toast from "../Toast";

import "./App.Component.scss";

import MainPageComponent from "./MAINPAGE/MainPage.Component";
import RegisterComponent from "./ACCOUNT/REGISTER/Register.Component";
import AuthComponent from "./ACCOUNT/AUTH/Auth.Component";
import DashboardComponent from "./ACCOUNT/DASHBOARD/Dashboard.Component";

const { URL_BACKEND } = require("./../CONFIG.json");

const getDataAccount = async ({ tempUserAuthCookie }) => {
  let responseFetch = await fetch(`${URL_BACKEND}/api/account/my-data`, {
    method: "GET",
    headers: { Authorization: `Bearer ${tempUserAuthCookie}` },
  });

  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  return { ok, status, responseFetch };
};

const App = () => {
  const [dataAccount, setDataAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const tempUserAuthCookie = Cookies.get("GSM_DIPLOM_COOKIES_JWT");

      if (tempUserAuthCookie !== undefined && dataAccount === null) {
        const { ok, status, responseFetch } = await getDataAccount({
          tempUserAuthCookie,
        });

        if (ok === true && status === 200) {
          setDataAccount(responseFetch);

          new Toast({
            title: "Автоматическая авторизация",
            text: `Вы автоматически авторизировались. Если вы не в профиле, нажмите "Личный Кабинет"`,
            theme: "info",
            autohide: true,
            interval: 10000,
          });
        } else {
          new Toast({
            title: "Ошибка автоматической авторизации",
            text: `Мы пытались автоматически вас авторизировать, но у нас не получилось. Авторизуйтесь используя логин и пароль`,
            theme: "danger",
            autohide: true,
            interval: 10000,
          });

          setDataAccount(null);

          Cookies.remove("GSM_DIPLOM_COOKIES_JWT");

          navigate("/");
        }
      }
    })();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="*"
          element={
            <MainPageComponent
              error={{ status: true, message: "Такая страница не найдена" }}
            />
          }
        />

        <Route path="/" element={<MainPageComponent />} />

        <Route
          path="/account/register"
          element={<RegisterComponent dataAccount={dataAccount} />}
        />

        <Route
          path="/account/login"
          element={
            <AuthComponent
              setDataAccount={setDataAccount}
              dataAccount={dataAccount}
            />
          }
        />

        <Route
          path="/account/dashboard/*"
          element={
            <DashboardComponent
              dataAccount={dataAccount}
              setDataAccount={setDataAccount}
              getDataAccount={getDataAccount}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
