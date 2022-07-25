import React, { useState } from 'react';

import './RemoveVehicle.Component.scss';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

import RemoveVehicleController from './RemoveVehicle.Controller';

const RemoveVehicle = ({
  dashboardComponentMount,
  statusMountRemoveVehicle,
  setStatusMountRemoveVehicle,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);

  return (
    <div className='RemoveVehicle modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>Удаление транспорта ID: {statusMountRemoveVehicle.ID}</span>
          </div>
          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountRemoveVehicle(null);
            }}
          >
            X
          </button>
        </header>

        <main className='modal-window__main'>
          <div className='modal-window__question'>
            <p className='modal-window__question-text'>
              Вы действительно хотите удалить транспорт?
            </p>
            <p className='modal-window__question-data'>
              Модель: {statusMountRemoveVehicle.Model}
              <br />
              Гос.номер: {statusMountRemoveVehicle.Number}
            </p>
          </div>

          <div className='remove-object-buttons'>
            <button
              className='remove-object-buttons__no beautiful-button-green'
              onClick={() => {
                setStatusMountRemoveVehicle(null);
              }}
            >
              НЕТ
            </button>

            <button
              className='remove-object-buttons__yes beautiful-button-red'
              onClick={() => {
                RemoveVehicleController(
                  dashboardComponentMount,
                  {
                    statusMountRemoveVehicle,
                  },
                  setLoadSpinerActive,
                  setStatusMountRemoveVehicle
                );
              }}
            >
              да
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RemoveVehicle;
