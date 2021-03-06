import React, { useState } from "react";

import "./CreateAutoBase.Component.scss";

import LoaderSpinerComponent from "./../../../../LOADERSPINER/LoaderSpiner.Component";

import CreateAutoBaseController from "./CreateAutoBase.Controller";

const CreateAutoBase = ({
  dashboardComponentMount,
  setStatusMountCreateAutoBase,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [nameAutoBase, setNameAutoBase] = useState(``);

  return (
    <div className="CreateAutoBase modal-window">
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ""}

      <div className="modal-window__popup-form">
        <header className="modal-window__header">
          <div className="modal-window__title">
            <span>Создание автомобильной базы</span>
          </div>

          <button
            className="modal-window__button-close"
            onClick={() => {
              setStatusMountCreateAutoBase(false);
            }}
          >
            X
          </button>
        </header>

        <main className="modal-window__main">
          <div className="text-field text-field_floating-3">
            <input
              className="text-field__input"
              id="NameAutoBase"
              name="NameAutoBase"
              placeholder="NameAutoBase"
              value={nameAutoBase}
              onChange={(e) => {
                setNameAutoBase(e.target.value);
              }}
            />
            <label className="text-field__label" htmlFor="NameAutoBase">
              Введите название автомобильной базы
            </label>
          </div>

          <button
            className="beautiful-button beautiful-button-green"
            onClick={() => {
              CreateAutoBaseController(
                dashboardComponentMount,
                { nameAutoBase },
                setLoadSpinerActive,
                setStatusMountCreateAutoBase
              );
            }}
          >
            создать
          </button>
        </main>
      </div>
    </div>
  );
};

export default CreateAutoBase;
