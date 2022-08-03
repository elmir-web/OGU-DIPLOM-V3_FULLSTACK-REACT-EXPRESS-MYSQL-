import React, { useState } from 'react';

import './ActionFuelingProcess.Component.scss';

import ActionFuelingProcessController from './ActionFuelingProcess.Controller';

import LoaderSpinerComponent from '../../../../LOADERSPINER/LoaderSpiner.Component';

const ActionFuelingProcess = ({
  dashboardComponentMount,
  statusMountActionFuelingProcess,
  setStatusMountActionFuelingProcess,
  funcFetchMyVehicle,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [kilometrs, setKilometrs] = useState(0);
  const [liters, setLiters] = useState(0);

  React.useEffect(() => {
    console.log(statusMountActionFuelingProcess);
  }, []);

  return (
    <div className='ActionFuelingProcess modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>Заправить: {statusMountActionFuelingProcess.Model}</span>
          </div>

          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountActionFuelingProcess(null);
            }}
          >
            X
          </button>
        </header>

        <main className='modal-window__main'>
          <div className='text-field text-field_floating-3'>
            <input
              className='text-field__input'
              id='ExpenseVehicle'
              name='ExpenseVehicle'
              placeholder='ExpenseVehicle'
              value={liters}
              onChange={(e) => {
                setLiters(e.target.value);
              }}
            />
            <label className='text-field__label' htmlFor='ExpenseVehicle'>
              Введите количество заправляемого топлива
            </label>
          </div>

          <button
            className='beautiful-button beautiful-button-green'
            onClick={() => {
              // ChangeVehicleController(
              //   dashboardComponentMount,
              //   {
              //     IDVehicle,
              //     model,
              //     number,
              //     idAutoBase,
              //     idTypeGSM,
              //     kilometrs,
              //     liters,
              //     expense,
              //   },
              //   setLoadSpinerActive,
              //   setStatusMountChangeVehicle
              // );
            }}
          >
            работать с автомобилем
          </button>
        </main>
      </div>
    </div>
  );
};

export default ActionFuelingProcess;
