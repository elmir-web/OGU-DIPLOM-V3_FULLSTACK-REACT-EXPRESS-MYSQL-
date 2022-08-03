import React, { useState, useEffect } from 'react';

import './CreateItemFillingList.Component.scss';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

import CreateItemFillingListController from './CreateItemFillingList.Controller';

const CreateItemFillingList = ({
  dashboardComponentMount,
  setStatusMountCreateItemFillingList,
  allRecords,
  dataAccount,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [number, setNumber] = useState(``);
  const [liters, setLiters] = useState(0);
  const [IDrecord, setIDRecord] = useState(0);
  const [myRecords, setMyRecords] = useState(null);

  useEffect(() => {
    const tempMyRecords = allRecords.filter((record) => {
      return record.IDsigner.ID === dataAccount.ID;
    });

    setMyRecords(tempMyRecords);

    setIDRecord(
      tempMyRecords[0]?.ID !== undefined || tempMyRecords[0]?.ID !== null
        ? tempMyRecords[0]?.ID
        : 0
    );
  }, [allRecords]);

  return (
    <div className='CreateItemFillingList modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>Создание заправочной ведомости</span>
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
              {myRecords &&
                myRecords.map((record) => {
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
