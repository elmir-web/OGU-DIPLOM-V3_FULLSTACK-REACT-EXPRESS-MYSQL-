import React, { useState } from "react";

import "./ChangeUpdate.Component.scss";

import LoaderSpinerComponent from "./../../../../LOADERSPINER/LoaderSpiner.Component";

import ChangeUpdateController from "./ChangeUpdate.Controller";

const ChangeUpdate = ({
  setStatusMountChangeProfile,
  dataAccount,
  setDataAccount,
  getDataAccount,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [surName, setSurName] = useState(dataAccount.SurName);
  const [name, setName] = useState(dataAccount.Name);
  const [middleName, setMiddleName] = useState(dataAccount.MiddleName);
  const [loginUser, setLoginUser] = useState(dataAccount.LoginUser);
  const [passwordUser, setPasswordUser] = useState(dataAccount.PasswordUser);

  return (
    <div className="ChangeUpdate modal-window">
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ""}

      <div className="modal-window__popup-form">
        <header className="modal-window__header">
          <div className="modal-window__title">
            <span>Редактирование профиля</span>
          </div>

          <button
            className="modal-window__button-close"
            onClick={() => {
              setStatusMountChangeProfile(false);
            }}
          >
            X
          </button>
        </header>

        <main className="modal-window__main">
          <div className="text-field text-field_floating-3">
            <input
              className="text-field__input"
              id="SurName"
              name="SurName"
              placeholder="SurName"
              value={surName}
              onChange={(e) => {
                setSurName(e.target.value);
              }}
            />
            <label className="text-field__label" htmlFor="SurName">
              Ваша фамилия
            </label>
          </div>

          <div className="text-field text-field_floating-3">
            <input
              className="text-field__input"
              id="Name"
              name="Name"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label className="text-field__label" htmlFor="Name">
              Ваше имя
            </label>
          </div>

          <div className="text-field text-field_floating-3">
            <input
              className="text-field__input"
              id="MiddleName"
              name="MiddleName"
              placeholder="MiddleName"
              value={middleName}
              onChange={(e) => {
                setMiddleName(e.target.value);
              }}
            />
            <label className="text-field__label" htmlFor="MiddleName">
              Ваше отчество
            </label>
          </div>

          <div className="text-field text-field_floating-3">
            <input
              className="text-field__input"
              id="LoginUser"
              name="LoginUser"
              placeholder="LoginUser"
              value={loginUser}
              onChange={(e) => {
                setLoginUser(e.target.value);
              }}
            />
            <label className="text-field__label" htmlFor="LoginUser">
              Придумайте ваш логин
            </label>
          </div>

          <div className="text-field text-field_floating-3">
            <input
              className="text-field__input"
              id="PasswordUser"
              name="PasswordUser"
              placeholder="PasswordUser"
              value={passwordUser}
              onChange={(e) => {
                setPasswordUser(e.target.value);
              }}
            />
            <label className="text-field__label" htmlFor="PasswordUser">
              Придумайте ваш пароль
            </label>
          </div>

          <button
            className="beautiful-button beautiful-button-green"
            onClick={() => {
              ChangeUpdateController(
                { surName, name, middleName, loginUser, passwordUser },
                dataAccount,
                setDataAccount,
                setLoadSpinerActive,
                getDataAccount,
                setStatusMountChangeProfile
              );
            }}
          >
            сохранить
          </button>
        </main>
      </div>
    </div>
  );
};

export default ChangeUpdate;
