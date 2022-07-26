import React, { useState } from 'react';

import './RemoveWorkerAccount.Component.scss';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

import RemoveWorkerAccountController from './RemoveWorkerAccount.Controller';

const RemoveWorkerAccount = ({
  dashboardComponentMount,
  statusMountRemoveWorkerAccount,
  setStatusMountRemoveWorkerAccount,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);

  return (
    <div className='RemoveWorkerAccount modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>
              Удаление аккаунта ID: {statusMountRemoveWorkerAccount.ID}
            </span>
          </div>
          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountRemoveWorkerAccount(null);
            }}
          >
            X
          </button>
        </header>

        <main className='modal-window__main'>
          <div className='modal-window__question'>
            <p className='modal-window__question-text'>
              Вы действительно хотите удалить аккаунт?
            </p>
            <p className='modal-window__question-data'>
              Фамилия: {statusMountRemoveWorkerAccount.SurName}
              <br />
              Имя: {statusMountRemoveWorkerAccount.Name}
              <br />
              Отчество: {statusMountRemoveWorkerAccount.MiddleName}
            </p>
          </div>

          <div className='remove-object-buttons'>
            <button
              className='remove-object-buttons__no beautiful-button-green'
              onClick={() => {
                setStatusMountRemoveWorkerAccount(null);
              }}
            >
              НЕТ
            </button>

            <button
              className='remove-object-buttons__yes beautiful-button-red'
              onClick={() => {
                RemoveWorkerAccountController(
                  dashboardComponentMount,
                  {
                    statusMountRemoveWorkerAccount,
                  },
                  setLoadSpinerActive,
                  setStatusMountRemoveWorkerAccount
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

export default RemoveWorkerAccount;
