import React, { useState } from 'react';

import './ActionFuelingProcess.Component.scss';

import ActionFuelingProcessController from './ActionFuelingProcess.Controller';

import LoaderSpinerComponent from '../../../../LOADERSPINER/LoaderSpiner.Component';

const ActionFuelingProcess = ({
  dashboardComponentMount,
  statusMountActionFuelingProcess,
  setStatusMountActionFuelingProcess,
  fillingListItems,
  storeHouseItems,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [liters, setLiters] = useState(0);
  const [fillingListCurrentVeh, setFillingListCurrentVeh] = useState(null);
  const [thisItemStoreHouse, setThisItemStoreHouse] = useState(null);

  React.useEffect(() => {
    let tempIDGSM = null;

    for (let index = 0; index < fillingListItems.length; index++) {
      if (
        fillingListItems[index].IDrecord.IDvehicle.ID ===
        statusMountActionFuelingProcess.ID
      ) {
        tempIDGSM = fillingListItems[index].IDrecord.IDtypegsm.ID;

        setFillingListCurrentVeh(fillingListItems[index]);
      }
    }

    for (let index = 0; index < storeHouseItems.length; index++) {
      if (storeHouseItems[index].IDtypegsm.ID === tempIDGSM) {
        setThisItemStoreHouse(storeHouseItems[index]);
      }
    }
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
          <div className='modal-window__question'>
            <p className='modal-window__question-data'>
              Статус заправочной ведомости:{' '}
              {fillingListCurrentVeh?.FillingStatus === 1
                ? 'Открыта'
                : 'Закрыта'}
              <br />
              {fillingListCurrentVeh?.FillingStatus === 2 && (
                <span>
                  Заправить автомобиль невозможно!
                  <br />
                </span>
              )}
              Топливо автомобиля: {thisItemStoreHouse?.IDtypegsm.Name}
              <br />
              Номер ведомости: {fillingListCurrentVeh?.Number}
              <br />
              Разрешено заправить: {fillingListCurrentVeh?.Liters}
              <br />
              Заправлено: {fillingListCurrentVeh?.UsedLiters}
              <br />
              Номер путевого листа: {fillingListCurrentVeh?.IDrecord?.Number}
              <br />
            </p>
          </div>

          {fillingListCurrentVeh?.FillingStatus === 1 && (
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
          )}

          {fillingListCurrentVeh?.FillingStatus === 1 && (
            <button
              className='beautiful-button beautiful-button-green'
              onClick={() => {
                ActionFuelingProcessController(
                  dashboardComponentMount,
                  {
                    fillingListCurrentVeh,
                    liters,
                    statusMountActionFuelingProcess,
                    thisItemStoreHouse,
                  },
                  setLoadSpinerActive,
                  setStatusMountActionFuelingProcess
                );
              }}
            >
              заправить
            </button>
          )}
        </main>
      </div>
    </div>
  );
};

export default ActionFuelingProcess;
