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
    <div className="CreateAutoBase">
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ""}

      <div className="CreateAutoBase__popup-form">
        <header className="CreateAutoBase__header">
          <div className="CreateAutoBase__title">
            <span>Создание автомобильной базы</span>
          </div>

          <button
            className="CreateAutoBase__button-close"
            onClick={() => {
              setStatusMountCreateAutoBase(false);
            }}
          >
            X
          </button>
        </header>

        <main className="CreateAutoBase__main">
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
