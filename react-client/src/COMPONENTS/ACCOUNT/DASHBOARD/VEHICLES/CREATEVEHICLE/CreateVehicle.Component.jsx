import React, { useState } from 'react';

import './CreateVehicle.Component.scss';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

import CreateVehicleController from './CreateVehicle.Controller';

const CreateVehicle = ({
  dashboardComponentMount,
  setStatusMountCreateVehicle,
  allAutoBase,
  typesGSM,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [model, setModel] = useState(``);
  const [number, setNumber] = useState(``);
  const [idAutoBase, setIDdAutoBase] = useState(
    allAutoBase[0]?.ID !== undefined || allAutoBase[0]?.ID !== null
      ? allAutoBase[0]?.ID
      : 0
  );
  const [idTypeGSM, setIDTypeGSM] = useState(
    typesGSM[0]?.ID !== undefined || typesGSM[0]?.ID !== null
      ? typesGSM[0]?.ID
      : 0
  );
  const [kilometrs, setKilometrs] = useState(0);
  const [liters, setLiters] = useState(0.0);
  const [expense, setExpense] = useState(0.0);

  return (
    <div className='CreateVehicle modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>Создание транспорта</span>
          </div>

          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountCreateVehicle(false);
            }}
          >
            X
          </button>
        </header>

        <main className='modal-window__main'>
          <div className='text-field text-field_floating-3'>
            <input
              className='text-field__input'
              id='ModelVehicle'
              name='ModelVehicle'
              placeholder='ModelVehicle'
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
              }}
            />
            <label className='text-field__label' htmlFor='ModelVehicle'>
              Введите модель транспорта
            </label>
          </div>

          <div className='text-field text-field_floating-3'>
            <input
              className='text-field__input'
              id='NumberVehicle'
              name='NumberVehicle'
              placeholder='NumberVehicle'
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
            <label className='text-field__label' htmlFor='NumberVehicle'>
              Введите гос.номер
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
              id='IDTypeGSMVehicle'
              name='IDTypeGSMVehicle'
              placeholder='IDTypeGSMVehicle'
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
            <label className='text-field__label' htmlFor='IDTypeGSMVehicle'>
              -- Выберите тип ГСМ --
            </label>
          </div>

          <div className='text-field text-field_floating-3'>
            <input
              className='text-field__input'
              id='KilometrsVehicle'
              name='KilometrsVehicle'
              placeholder='KilometrsVehicle'
              value={kilometrs}
              onChange={(e) => {
                setKilometrs(e.target.value);
              }}
            />
            <label className='text-field__label' htmlFor='KilometrsVehicle'>
              Введите пробег спидометра
            </label>
          </div>

          <div className='text-field text-field_floating-3'>
            <input
              className='text-field__input'
              id='LitersVehicle'
              name='LitersVehicle'
              placeholder='LitersVehicle'
              value={liters}
              onChange={(e) => {
                setLiters(e.target.value);
              }}
            />
            <label className='text-field__label' htmlFor='LitersVehicle'>
              Введите литры в транспорте
            </label>
          </div>

          <div className='text-field text-field_floating-3'>
            <input
              className='text-field__input'
              id='ExpenseVehicle'
              name='ExpenseVehicle'
              placeholder='ExpenseVehicle'
              value={expense}
              onChange={(e) => {
                setExpense(e.target.value);
              }}
            />
            <label className='text-field__label' htmlFor='ExpenseVehicle'>
              Введите расход / 100 км
            </label>
          </div>

          <button
            className='beautiful-button beautiful-button-green'
            onClick={() => {
              CreateVehicleController(
                dashboardComponentMount,
                {
                  model,
                  number,
                  idAutoBase,
                  idTypeGSM,
                  kilometrs,
                  liters,
                  expense,
                },
                setLoadSpinerActive,
                setStatusMountCreateVehicle
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

export default CreateVehicle;
