import React, { useEffect } from "react";
import Toast from "./../../Toast";

import "./MainPage.scss";

import { Link as RouterLink } from "react-router-dom";

export default function MainPage({ error }) {
  const componentMounted = () => {
    if (error !== undefined || error?.status === true) {
      new Toast({
        title: "Ошибка",
        text: `Такого URL адреса не предусмотрено! Вы были переадресованы на главную страницу!`,
        theme: "danger",
        autohide: true,
        interval: 10000,
      });
    }
  };

  useEffect(componentMounted, []);

  return (
    <div className="MainPage">
      <header className="header">header</header>
      <main className="main">main</main>
      <footer className="footer">footer</footer>
    </div>
  );
}
