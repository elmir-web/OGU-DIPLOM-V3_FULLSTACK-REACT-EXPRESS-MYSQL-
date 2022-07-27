import React, { useState } from 'react';

import './ChangeStoreHouse.Component.scss';

import ChangeStoreHouseController from './ChangeStoreHouse.Controller';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

const ChangeStoreHouse = ({
  dashboardComponentMount,
  statusMountChangeStoreHouseItem,
  setStatusMountChangeStoreHouseItem,
  typesGSM,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [idItemStoreHouse, setIDItemStoreHouse] = useState(
    statusMountChangeStoreHouseItem.ID
  );
  const [idTypeGSM, setIDTypeGSM] = useState(
    statusMountChangeStoreHouseItem.IDtypegsm
  );
  const [liters, setLiters] = useState(statusMountChangeStoreHouseItem.Liters);

  return (
    <div className='ChangeStoreHouse modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>Редактирование элемента склада ID: {idItemStoreHouse}</span>
          </div>

          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountChangeStoreHouseItem(null);
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
              value={idTypeGSM?.ID !== undefined ? idTypeGSM.ID : idTypeGSM}
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
              ChangeStoreHouseController(
                dashboardComponentMount,
                {
                  idItemStoreHouse,
                  idTypeGSM,
                  liters,
                },
                setLoadSpinerActive,
                setStatusMountChangeStoreHouseItem
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

export default ChangeStoreHouse;
