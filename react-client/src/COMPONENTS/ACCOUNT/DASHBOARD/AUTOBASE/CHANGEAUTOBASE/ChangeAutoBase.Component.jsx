import React, { useState } from "react";

import "./ChangeAutoBase.Component.scss";

import LoaderSpinerComponent from "./../../../../LOADERSPINER/LoaderSpiner.Component";

import ChangeAutoBaseController from "./ChangeAutoBase.Controller";

const ChangeAutoBase = ({
  dashboardComponentMount,
  setStatusMountChangeAutoBase,
  statusMountChangeAutoBase,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [IDAutoBase, setIDAutoBase] = useState(statusMountChangeAutoBase.ID);
  const [nameAutoBase, setNameAutoBase] = useState(
    statusMountChangeAutoBase.Name
  );

  return (
    <div className="ChangeAutoBase modal-window">
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ""}

      <div className="modal-window__popup-form">
        <header className="modal-window__header">
          <div className="modal-window__title">
            <span>Редактирование автомобильной базы ID: {IDAutoBase}</span>
          </div>

          <button
            className="modal-window__button-close"
            onClick={() => {
              setStatusMountChangeAutoBase(null);
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
              ChangeAutoBaseController(
                dashboardComponentMount,
                { IDAutoBase, nameAutoBase },
                setLoadSpinerActive,
                setStatusMountChangeAutoBase
              );
            }}
          >
            обновить информацию
          </button>
        </main>
      </div>
    </div>
  );
};

export default ChangeAutoBase;
