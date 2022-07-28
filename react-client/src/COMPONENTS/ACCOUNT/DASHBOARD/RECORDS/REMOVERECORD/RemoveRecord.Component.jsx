import React, { useState } from 'react';

import './RemoveRecord.Component.scss';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

import RemoveRecordController from './RemoveRecord.Controller';

const RemoveRecord = ({
  dashboardComponentMount,
  statusMountRemoveRecord,
  setStatusMountRemoveRecord,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);

  return (
    <div className='RemoveRecord modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>
              Удаление путевого листа ID: {statusMountRemoveRecord.ID}
            </span>
          </div>
          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountRemoveRecord(null);
            }}
          >
            X
          </button>
        </header>

        <main className='modal-window__main'>
          <div className='modal-window__question'>
            <p className='modal-window__question-text'>
              Вы действительно хотите удалить путевой лист?
            </p>
            <p className='modal-window__question-data'>
              Номер: {statusMountRemoveRecord.Number}
              <br />
              Статус:{' '}
              {statusMountRemoveRecord.RecordStatus === 1 ? 'Открыт' : 'Закрыт'}
              <br />
            </p>
          </div>

          <div className='remove-object-buttons'>
            <button
              className='remove-object-buttons__no beautiful-button-green'
              onClick={() => {
                setStatusMountRemoveRecord(null);
              }}
            >
              НЕТ
            </button>

            <button
              className='remove-object-buttons__yes beautiful-button-red'
              onClick={() => {
                RemoveRecordController(
                  dashboardComponentMount,
                  {
                    statusMountRemoveRecord,
                  },
                  setLoadSpinerActive,
                  setStatusMountRemoveRecord
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

export default RemoveRecord;
