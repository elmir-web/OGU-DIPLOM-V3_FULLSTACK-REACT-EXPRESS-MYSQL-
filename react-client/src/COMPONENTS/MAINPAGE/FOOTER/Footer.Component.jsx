import React from "react";

import "./Footer.Component.scss";

const Footer = () => {
  return (
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
  );
};

export default Footer;
