import React, { useState } from 'react';

import './ChangeWorkerAccount.Component.scss';

import ChangeWorkerAccountController from './ChangeWorkerAccount.Controller';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

const ChangeWorkerAccount = ({
  dashboardComponentMount,
  statusMountChangeWorkerAccount,
  setStatusMountChangeWorkerAccount,
  allAutoBase,
  allPositions,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [IDWorker, setIDWorker] = useState(statusMountChangeWorkerAccount.ID);
  const [surName, setSurName] = useState(
    statusMountChangeWorkerAccount.SurName
  );
  const [name, setName] = useState(statusMountChangeWorkerAccount.Name);
  const [middleName, setMiddleName] = useState(
    statusMountChangeWorkerAccount.MiddleName
  );
  const [loginUser, setLoginUser] = useState(
    statusMountChangeWorkerAccount.LoginUser
  );
  const [passwordUser, setPasswordUser] = useState(
    statusMountChangeWorkerAccount.PasswordUser
  );
  const [idAutoBase, setIDdAutoBase] = useState(
    statusMountChangeWorkerAccount.IDautobases
  );
  const [idPosition, setIDPosition] = useState(
    statusMountChangeWorkerAccount.IDposition
  );

  return (
    <div className='ChangeWorkerAccount modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>Редактирование аккаунта ID: {IDWorker}</span>
          </div>

          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountChangeWorkerAccount(null);
            }}
          >
            X
          </button>
        </header>

        <main className='modal-window__main'>
          <div className='text-field text-field_floating-3'>
            <input
              className='text-field__input'
              id='SurName'
              name='SurName'
              placeholder='SurName'
              value={surName}
              onChange={(e) => {
                setSurName(e.target.value);
              }}
            />
            <label className='text-field__label' htmlFor='SurName'>
              Введите фамилию
            </label>
          </div>

          <div className='text-field text-field_floating-3'>
            <input
              className='text-field__input'
              id='Name'
              name='Name'
              placeholder='Name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label className='text-field__label' htmlFor='Name'>
              Введите имя
            </label>
          </div>

          <div className='text-field text-field_floating-3'>
            <input
              className='text-field__input'
              id='MiddleName'
              name='MiddleName'
              placeholder='MiddleName'
              value={middleName}
              onChange={(e) => {
                setMiddleName(e.target.value);
              }}
            />
            <label className='text-field__label' htmlFor='MiddleName'>
              Введите отчество
            </label>
          </div>

          <div className='text-field text-field_floating-3'>
            <input
              className='text-field__input'
              id='LoginUser'
              name='LoginUser'
              placeholder='LoginUser'
              value={loginUser}
              onChange={(e) => {
                setLoginUser(e.target.value);
              }}
            />
            <label className='text-field__label' htmlFor='LoginUser'>
              Введите логин
            </label>
          </div>

          <div className='text-field text-field_floating-3'>
            <input
              className='text-field__input'
              id='PasswordUser'
              name='PasswordUser'
              placeholder='PasswordUser'
              value={passwordUser}
              onChange={(e) => {
                setPasswordUser(e.target.value);
              }}
            />
            <label className='text-field__label' htmlFor='PasswordUser'>
              Введите пароль
            </label>
          </div>

          <div className='text-field text-field_floating-3'>
            <select
              className='text-field__input'
              id='IDAutoBaseVehicle'
              name='IDAutoBaseVehicle'
              placeholder='IDAutoBaseVehicle'
              onChange={(event) => {
                setIDdAutoBase(event.target.value);
              }}
              value={idAutoBase?.ID !== undefined ? idAutoBase.ID : idAutoBase}
            >
              {allAutoBase.map((autobase) => {
                return (
                  <option key={autobase.ID} value={autobase.ID}>
                    {autobase.Name}
                  </option>
                );
              })}
            </select>
            <label className='text-field__label' htmlFor='IDAutoBaseVehicle'>
              -- Выберите автомобильную базу --
            </label>
          </div>

          <div className='text-field text-field_floating-3'>
            <select
              className='text-field__input'
              id='IDPosition'
              name='IDPosition'
              placeholder='IDPosition'
              onChange={(event) => {
                setIDPosition(event.target.value);
              }}
              value={idPosition?.ID !== undefined ? idPosition.ID : idPosition}
            >
              {allPositions.map((position) => {
                return (
                  <option key={position.ID} value={position.ID}>
                    {position.Name}
                  </option>
                );
              })}
            </select>
            <label className='text-field__label' htmlFor='IDPosition'>
              -- Выберите роль --
            </label>
          </div>

          <button
            className='beautiful-button beautiful-button-green'
            onClick={() => {
              ChangeWorkerAccountController(
                dashboardComponentMount,
                {
                  IDWorker,
                  surName,
                  name,
                  middleName,
                  loginUser,
                  passwordUser,
                  idAutoBase,
                  idPosition,
                },
                setLoadSpinerActive,
                setStatusMountChangeWorkerAccount
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

export default ChangeWorkerAccount;
