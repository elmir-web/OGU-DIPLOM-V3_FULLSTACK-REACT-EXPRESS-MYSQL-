import React, { useState } from 'react';

import './CreateItemFillingList.Component.scss';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

import CreateItemFillingListController from './CreateItemFillingList.Controller';

const CreateItemFillingList = ({
  dashboardComponentMount,
  setStatusMountCreateItemFillingList,
  allRecords,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [number, setNumber] = useState(``);
  const [liters, setLiters] = useState(0);
  const [IDrecord, setIDRecord] = useState(
    allRecords[0]?.ID !== undefined || allRecords[0]?.ID !== null
      ? allRecords[0]?.ID
      : 0
  );

  return (
    <div className='CreateItemFillingList modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>Создание путевого листа</span>
          </div>

          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountCreateItemFillingList(false);
            }}
          >
            X
          </button>
        </header>

        <main className='modal-window__main'>
          <div className='text-field text-field_floating-3'>
            <input
              className='text-field__input'
              id='PasswordUser'
              name='PasswordUser'
              placeholder='PasswordUser'
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
            <label className='text-field__label' htmlFor='PasswordUser'>
              Введите номер заправочной ведомости
            </label>
          </div>

          <div className='text-field text-field_floating-3'>
            <input
              className='text-field__input'
              id='PasswordUser'
              name='PasswordUser'
              placeholder='PasswordUser'
              value={liters}
              onChange={(e) => {
                setLiters(e.target.value);
              }}
            />
            <label className='text-field__label' htmlFor='PasswordUser'>
              Введите количество литров
            </label>
          </div>

          <div className='text-field text-field_floating-3'>
            <select
              className='text-field__input'
              id='IDVehicle'
              name='IDVehicle'
              placeholder='IDVehicle'
              onChange={(event) => {
                setIDRecord(event.target.value);
              }}
              value={IDrecord}
            >
              {allRecords.map((record) => {
                return (
                  <option key={record.ID} value={record.ID}>
                    {record.Number} :{' '}
                    {record.IDvehicle.Model + ' ' + record.IDvehicle.Number}
                  </option>
                );
              })}
            </select>
            <label className='text-field__label' htmlFor='IDVehicle'>
              -- Выберите путевой лист автомобиля --
            </label>
          </div>

          <button
            className='beautiful-button beautiful-button-green'
            onClick={() => {
              CreateItemFillingListController(
                dashboardComponentMount,
                { number, liters, IDrecord },
                setLoadSpinerActive,
                setStatusMountCreateItemFillingList
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

export default CreateItemFillingList;
