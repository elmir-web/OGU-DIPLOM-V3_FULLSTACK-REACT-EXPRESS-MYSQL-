import React, { useState } from "react";

import "./ChangeTypeGSM.Component.scss";

import ChangeTypeGSMController from "./ChangeTypeGSM.Controller";

import LoaderSpinerComponent from "./../../../../LOADERSPINER/LoaderSpiner.Component";

const ChangeTypeGSM = ({
  dashboardComponentMount,
  setStatusMountChangeTypeGSM,
  statusMountChangeTypeGSM,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [IDTypeGSM, setIDTypeGSM] = useState(statusMountChangeTypeGSM.ID);
  const [nameTypeGSM, setNameTypeGSM] = useState(statusMountChangeTypeGSM.Name);
  const [forKiloTypeGSM, setForKiloTypeGSM] = useState(
    statusMountChangeTypeGSM.ForKilo
  );

  return (
    <div className="ChangeTypeGSM modal-window">
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ""}

      <div className="modal-window__popup-form">
        <header className="modal-window__header">
          <div className="modal-window__title">
            <span>Редактирование типа ГСМ ID: {IDTypeGSM}</span>
          </div>
          <button
            className="modal-window__button-close"
            onClick={() => {
              setStatusMountChangeTypeGSM(null);
            }}
          >
            X
          </button>
        </header>

        <main className="modal-window__main">
          <div className="text-field text-field_floating-3">
            <input
              className="text-field__input"
              id="NameTypeGSM"
              name="NameTypeGSM"
              placeholder="NameTypeGSM"
              value={nameTypeGSM}
              onChange={(e) => {
                setNameTypeGSM(e.target.value);
              }}
            />
            <label className="text-field__label" htmlFor="NameTypeGSM">
              Введите название типа ГСМ
            </label>
          </div>

          <div className="text-field text-field_floating-3">
            <input
              className="text-field__input"
              id="ForKiloTypeGSM"
              name="ForKiloTypeGSM"
              placeholder="ForKiloTypeGSM"
              value={forKiloTypeGSM}
              onChange={(e) => {
                setForKiloTypeGSM(e.target.value);
              }}
            />
            <label className="text-field__label" htmlFor="ForKiloTypeGSM">
              Введите вес литра в килограммах
            </label>
          </div>

          <button
            className="beautiful-button beautiful-button-green"
            onClick={() => {
              ChangeTypeGSMController(
                dashboardComponentMount,
                { IDTypeGSM, nameTypeGSM, forKiloTypeGSM },
                setLoadSpinerActive,
                setStatusMountChangeTypeGSM
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

export default ChangeTypeGSM;
