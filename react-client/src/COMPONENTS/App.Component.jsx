import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.Component.scss";

import MainPageComponent from "./MAINPAGE/MainPage.Component";
import RegisterComponent from "./ACCOUNT/REGISTER/Register.Component";
import AuthComponent from "./ACCOUNT/AUTH/Auth.Component";

const App = () => {
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

        <Route path="/account/login" element={<AuthComponent />} />
        {/* workerAccount={workerAccount}
              setWorkerAccount={setWorkerAccount} */}

        {/* <Route
          path="/account/dashboard/*"
          element={
            <Dashboard
              workerAccount={workerAccount}
              setWorkerAccount={setWorkerAccount}
            />
          }
        /> */}
      </Routes>
    </div>
  );
};

export default App;
