import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.Component.scss";

import MainPageComponent from "./MAINPAGE/MainPage.Component";
import RegisterComponent from "./ACCOUNT/REGISTER/Register.Component";
import AuthComponent from "./ACCOUNT/AUTH/Auth.Component";
import DashboardComponent from "./ACCOUNT/DASHBOARD/Dashboard.Component";

const App = () => {
  const [dataAccount, setDataAccount] = useState(null);

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

        <Route path="/account/register" element={<RegisterComponent />} />
        {/*workerAccount={workerAccount} */}

        <Route
          path="/account/login"
          element={
            <AuthComponent
              dataAccount={dataAccount}
              setDataAccount={setDataAccount}
            />
          }
        />

        <Route
          path="/account/dashboard/*"
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
