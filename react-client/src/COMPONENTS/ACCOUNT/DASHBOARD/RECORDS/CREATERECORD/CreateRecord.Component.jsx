import React, { useState, useEffect } from 'react';

import './CreateRecord.Component.scss';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

import CreateRecordController from './CreateRecord.Controller';

const CreateRecord = ({
  dashboardComponentMount,
  setStatusMountCreateRecord,
  allVehicles,
  allAccounts,
  dataAccount,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [number, setNumber] = useState(``);
  const [idVehicle, setIDVehicle] = useState(
    allVehicles[0]?.ID !== undefined || allVehicles[0]?.ID !== null
      ? allVehicles[0]?.ID
      : 0
  );
  const [allDriver, setAllDrivers] = useState(null);
  const [idDriver, setIDDriver] = useState(null);

  useEffect(() => {
    let tempAllDrivers = [];

    for (let index = 0; index < allAccounts.length; index++) {
      if (allAccounts[index].IDposition.ID === 4)
        tempAllDrivers.push(allAccounts[index]);
    }

    setAllDrivers(tempAllDrivers);

    setIDDriver(tempAllDrivers[0].ID);
  }, []);

  return (
    <div className='CreateRecord modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>Создание путевого листа</span>
          </div>

          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountCreateRecord(false);
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
              Введите номер путевого листа
            </label>
          </div>

          <div className='text-field text-field_floating-3'>
            <select
              className='text-field__input'
              id='IDVehicle'
              name='IDVehicle'
              placeholder='IDVehicle'
              onChange={(event) => {
                setIDVehicle(event.target.value);
              }}
              value={idVehicle}
            >
              {allVehicles.map((vehicle) => {
                return (
                  <option key={vehicle.ID} value={vehicle.ID}>
                    {vehicle.Model} : {vehicle.Number}
                  </option>
                );
              })}
            </select>
            <label className='text-field__label' htmlFor='IDVehicle'>
              -- Выберите автомобиль --
            </label>
          </div>

          {allDriver !== null ? (
            <div className='text-field text-field_floating-3'>
              <select
                className='text-field__input'
                id='IDDriver'
                name='IDDriver'
                placeholder='IDDriver'
                value={idDriver}
                onChange={(event) => {
                  setIDDriver(event.target.value);
                }}
              >
                {allDriver.map((driver, i) => {
                  return (
                    <option key={i} value={driver?.ID}>
                      {driver?.SurName} {driver?.Name} {driver?.MiddleName}
                    </option>
                  );
                })}
              </select>
              <label className='text-field__label' htmlFor='IDDriver'>
                -- Выберите водителя --
              </label>
            </div>
          ) : (
            ''
          )}

          <button
            className='beautiful-button beautiful-button-green'
            onClick={() => {
              CreateRecordController(
                dashboardComponentMount,
                { number, idVehicle, idDriver },
                { allVehicles, dataAccount },
                setLoadSpinerActive,
                setStatusMountCreateRecord
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

export default CreateRecord;
