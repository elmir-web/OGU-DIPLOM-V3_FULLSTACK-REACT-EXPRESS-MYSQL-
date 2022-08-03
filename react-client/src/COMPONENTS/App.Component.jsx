import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Toast from '../Toast';

import './App.Component.scss';

import MainPageComponent from './MAINPAGE/MainPage.Component';
import RegisterComponent from './ACCOUNT/REGISTER/Register.Component';
import AuthComponent from './ACCOUNT/AUTH/Auth.Component';
import DashboardComponent from './ACCOUNT/DASHBOARD/Dashboard.Component';

const App = () => {
  const [dataAccount, setDataAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tempUserAuthCookie = Cookies.get('GSM_DIPLOM_COOKIES_JWT');

    // (async () => {
    //   if (tempUserAuthCookie !== undefined && dataAccount === null) {
    //     const { ok, status, responseFetch } = await getDataAccount({
    //       tempUserAuthCookie,
    //     });

    //     if (ok === true && status === 200) {
    //       setDataAccount(responseFetch);

    //       new Toast({
    //         title: 'Автоматическая авторизация',
    //         text: `Вы автоматически авторизировались. Если вы не в профиле, нажмите "Личный Кабинет"`,
    //         theme: 'info',
    //         autohide: true,
    //         interval: 10000,
    //       });
    //     } else {
    //       new Toast({
    //         title: 'Ошибка автоматической авторизации',
    //         text: `Мы пытались автоматически вас авторизировать, но у нас не получилось. Авторизуйтесь используя логин и пароль`,
    //         theme: 'danger',
    //         autohide: true,
    //         interval: 10000,
    //       });

    //       setDataAccount(null);

    //       Cookies.remove('GSM_DIPLOM_COOKIES_JWT');

    //       navigate('/');
    //     }
    //   }
    // })();

    // if (dataAccount === null && tempUserAuthCookie !== undefined) {
    //   setTimeout(async () => {
    //     const { ok, status, responseFetch } = await getDataAccount({
    //       tempUserAuthCookie,
    //     });

    //     setDataAccount(responseFetch);
    //   }, 200);
    // }
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route
          path='*'
          element={
            <MainPageComponent
              error={{ status: true, message: 'Такая страница не найдена' }}
            />
          }
        />

        <Route path='/' element={<MainPageComponent />} />

        <Route
          path='/account/register'
          element={<RegisterComponent dataAccount={dataAccount} />}
        />

        <Route
          path='/account/login'
          element={
            <AuthComponent
              setDataAccount={setDataAccount}
              dataAccount={dataAccount}
            />
          }
        />

        <Route
          path='/account/dashboard/*'
          element={
            <DashboardComponent
              dataAccount={dataAccount}
              setDataAccount={setDataAccount}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
