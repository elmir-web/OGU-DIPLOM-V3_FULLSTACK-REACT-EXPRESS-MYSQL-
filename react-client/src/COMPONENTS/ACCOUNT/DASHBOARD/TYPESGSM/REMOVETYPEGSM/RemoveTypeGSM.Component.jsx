import React, { useState } from 'react';

import './RemoveTypeGSM.Component.scss';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

import RemoveTypeGSMController from './RemoveTypeGSM.Controller';

const RemoveTypeGSM = ({
  dashboardComponentMount,
  setStatusMountRemoveTypeGSM,
  statusMountRemoveTypeGSM,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);

  return (
    <div className='RemoveTypeGSM modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>
              Удаление автомобильной базы ID: {statusMountRemoveTypeGSM.ID}
            </span>
          </div>

          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountRemoveTypeGSM(null);
            }}
          >
            X
          </button>
        </header>

        <main className='modal-window__main'>
          <div className='modal-window__question'>
            <p className='modal-window__question-text'>
              Вы действительно хотите удалить тип ГСМ?
            </p>
            <p className='modal-window__question-data'>
              Название: {statusMountRemoveTypeGSM.Name}
            </p>
          </div>

          <div className='remove-object-buttons'>
            <button
              className='remove-object-buttons__no beautiful-button-green'
              onClick={() => {
                setStatusMountRemoveTypeGSM(null);
              }}
            >
              НЕТ
            </button>

            <button
              className='remove-object-buttons__yes beautiful-button-red'
              onClick={() => {
                RemoveTypeGSMController(
                  dashboardComponentMount,
                  {
                    statusMountRemoveTypeGSM,
                  },
                  setLoadSpinerActive,
                  setStatusMountRemoveTypeGSM
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

export default RemoveTypeGSM;
