import React, { useState } from 'react';

import './ClosedItemFillingList.Component.scss';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

import ClosedItemFillingListController from './ClosedItemFillingList.Controller';

const ClosedItemFillingList = ({
  dashboardComponentMount,
  statusMountClosedFillingList,
  setStatusMountClosedFillingList,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);

  return (
    <div className='ClosedItemFillingList modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>
              Закрытие заправочной ведомости ID:{' '}
              {statusMountClosedFillingList.ID}
            </span>
          </div>
          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountClosedFillingList(null);
            }}
          >
            X
          </button>
        </header>

        <main className='modal-window__main'>
          <div className='modal-window__question'>
            <p className='modal-window__question-text'>
              Вы действительно хотите закрыть заправочную ведомость?
            </p>
            <p className='modal-window__question-data'>
              Открыть ее позже уже не получится.
              <br />
              Номер заправочной ведомости: {statusMountClosedFillingList.Number}
              <br />
              Разрешено литров: {statusMountClosedFillingList.Liters}
              <br />
              Использовано литров: {statusMountClosedFillingList.UsedLiters}
            </p>
          </div>

          <div className='remove-object-buttons'>
            <button
              className='remove-object-buttons__no beautiful-button-green'
              onClick={() => {
                setStatusMountClosedFillingList(null);
              }}
            >
              НЕТ
            </button>

            <button
              className='remove-object-buttons__yes beautiful-button-red'
              onClick={() => {
                ClosedItemFillingListController(
                  dashboardComponentMount,
                  {
                    statusMountClosedFillingList,
                  },
                  setLoadSpinerActive,
                  setStatusMountClosedFillingList
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

export default ClosedItemFillingList;
