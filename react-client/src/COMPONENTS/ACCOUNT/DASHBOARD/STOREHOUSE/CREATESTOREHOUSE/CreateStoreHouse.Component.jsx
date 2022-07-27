import React, { useState } from 'react';

import './CreateStoreHouse.Component.scss';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

import CreateStoreHouseController from './CreateStoreHouse.Controller';

const CreateStoreHouse = ({
  dashboardComponentMount,
  setStatusMountCreateStoreHouseItem,
  typesGSM,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [idTypeGSM, setIDTypeGSM] = useState(
    typesGSM[0]?.ID !== undefined || typesGSM[0]?.ID !== null
      ? typesGSM[0]?.ID
      : 0
  );
  const [liters, setLiters] = useState(0);

  return (
    <div className='CreateStoreHouse modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>Создание элемента склада</span>
          </div>

          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountCreateStoreHouseItem(false);
            }}
          >
            X
          </button>
        </header>

        <main className='modal-window__main'>
          <div className='text-field text-field_floating-3'>
            <select
              className='text-field__input'
              id='IDAutoBaseVehicle'
              name='IDAutoBaseVehicle'
              placeholder='IDAutoBaseVehicle'
              onChange={(event) => {
                setIDTypeGSM(event.target.value);
              }}
              value={idTypeGSM}
            >
              {typesGSM.map((typegsm) => {
                return (
                  <option key={typegsm.ID} value={typegsm.ID}>
                    {typegsm.Name}
                  </option>
                );
              })}
            </select>
            <label className='text-field__label' htmlFor='IDAutoBaseVehicle'>
              -- Выберите тип ГСМ --
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

          <button
            className='beautiful-button beautiful-button-green'
            onClick={() => {
              CreateStoreHouseController(
                dashboardComponentMount,
                {
                  idTypeGSM,
                  liters,
                },
                setLoadSpinerActive,
                setStatusMountCreateStoreHouseItem
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

export default CreateStoreHouse;
