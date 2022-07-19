import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.scss";

import MainPage from "./MAINPAGE/MainPage";
import Register from "./ACCOUNT/REGISTER/Register";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="*"
          element={
            <MainPage
              error={{ status: true, message: "Такая страница не найдена" }}
            />
          }
        />

        <Route path="/" element={<MainPage />} />

        <Route path="/account/register" element={<Register />} />
        {/*workerAccount={workerAccount} */}

        {/* <Route
          path="/account/login"
          element={
            <Login
              workerAccount={workerAccount}
              setWorkerAccount={setWorkerAccount}
            />
          }
        />
        <Route
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
