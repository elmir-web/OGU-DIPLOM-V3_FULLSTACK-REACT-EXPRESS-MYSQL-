import React, { useState } from 'react';

import './ChangeVehicle.Component.scss';

import ChangeVehicleController from './ChangeVehicle.Controller';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

const ChangeVehicle = ({
  dashboardComponentMount,
  statusMountChangeVehicle,
  setStatusMountChangeVehicle,
  allAutoBase,
  typesGSM,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [IDVehicle, setIDVehicle] = useState(statusMountChangeVehicle.ID);
  const [model, setModel] = useState(statusMountChangeVehicle.Model);
  const [number, setNumber] = useState(statusMountChangeVehicle.Number);
  const [idAutoBase, setIDdAutoBase] = useState(
    statusMountChangeVehicle.IDautobase
  );
  const [idTypeGSM, setIDTypeGSM] = useState(
    statusMountChangeVehicle.IDtypegsm
  );
  const [kilometrs, setKilometrs] = useState(
    statusMountChangeVehicle.Kilometrs
  );
  const [liters, setLiters] = useState(statusMountChangeVehicle.Liters);
  const [expense, setExpense] = useState(statusMountChangeVehicle.Expense);

  return (
    <div className='ChangeVehicle modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>Редактирование транспорта ID: {IDVehicle}</span>
          </div>

          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountChangeVehicle(null);
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
              value={idAutoBase?.ID !== undefined ? idAutoBase?.ID : idAutoBase}
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
              ChangeVehicleController(
                dashboardComponentMount,
                {
                  IDVehicle,
                  model,
                  number,
                  idAutoBase,
                  idTypeGSM,
                  kilometrs,
                  liters,
                  expense,
                },
                setLoadSpinerActive,
                setStatusMountChangeVehicle
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

export default ChangeVehicle;
