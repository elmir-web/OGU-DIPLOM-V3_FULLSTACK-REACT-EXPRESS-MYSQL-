import React, { useState } from 'react';

import './CreateWorkerAccount.Component.scss';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

import CreateWorkerAccountController from './CreateWorkerAccount.Controller';

const CreateWorkerAccount = ({
  dashboardComponentMount,
  setStatusMountCreateWorkerAccount,
  allAutoBase,
  allPositions,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [surName, setSurName] = useState(``);
  const [name, setName] = useState(``);
  const [middleName, setMiddleName] = useState(``);
  const [loginUser, setLoginUser] = useState(``);
  const [passwordUser, setPasswordUser] = useState(``);
  const [idAutoBase, setIDdAutoBase] = useState(
    allAutoBase[0]?.ID !== undefined || allAutoBase[0]?.ID !== null
      ? allAutoBase[0]?.ID
      : 0
  );
  const [idPosition, setIDPosition] = useState(
    allPositions[0]?.ID !== undefined || allPositions[0]?.ID !== null
      ? allPositions[0]?.ID
      : 0
  );

  return (
    <div className='CreateWorkerAccount modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>Создание аккаунта</span>
          </div>

          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountCreateWorkerAccount(false);
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
              value={idAutoBase}
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
              value={idPosition}
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
              CreateWorkerAccountController(
                dashboardComponentMount,
                {
                  surName,
                  name,
                  middleName,
                  loginUser,
                  passwordUser,
                  idAutoBase,
                  idPosition,
                },
                setLoadSpinerActive,
                setStatusMountCreateWorkerAccount
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

export default CreateWorkerAccount;
