import React, { useEffect } from "react";
import {
  Link as RouterLink,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Toast from "./../../../Toast";

import "./Dashboard.Component.scss";

import ProfileComponent from "./PROFILE/Profile.Component";

const DashboardNotFound = ({}) => {
  let navigate = useNavigate();

  useEffect(() => {
    navigate("/");

    new Toast({
      title: "Ошибка",
      text: `Такого URL адреса не предусмотрено! Вы были переадресованы на главную!`,
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
  }, []);

  return <div></div>;
};

const Dashboard = ({ dataAccount, setDataAccount }) => {
  return (
    <div className="Dashboard">
      <header className="header">
        <div className="central-container">
          <div
            className="header__logo"
            onClick={() => {
              window.open("http://osu.ru/", "_blank");
            }}
          ></div>

          <div className="header__center">
            <nav className="header__nav">
              <ul>
                <li>
                  <RouterLink to="">Мой профиль</RouterLink>
                </li>
                <li>
                  <RouterLink to="autobase">Автомобильные базы</RouterLink>
                </li>
                <li>
                  <RouterLink to="types-gsm">Виды ГСМ</RouterLink>
                </li>
                <li>
                  <RouterLink to="autos">Все автомобили</RouterLink>
                </li>
                <li>
                  <RouterLink to="workers">Рабочий персонал</RouterLink>
                </li>
                <li>
                  <RouterLink to="storehouse">Склад</RouterLink>
                </li>
                <li>
                  <RouterLink to="records">Путевые листы</RouterLink>
                </li>
                <li>
                  <RouterLink to="carwork">Работа с автомобилем</RouterLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header__right">
            <RouterLink to="/" className="header-dashboard">
              Выход
            </RouterLink>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="central-container">
          <Routes>
            <Route path="*" element={<DashboardNotFound />} />

            <Route
              index
              element={
                <ProfileComponent
                  dataAccount={dataAccount}
                  setDataAccount={setDataAccount}
                />
              }
            />
          </Routes>
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

export default Dashboard;
