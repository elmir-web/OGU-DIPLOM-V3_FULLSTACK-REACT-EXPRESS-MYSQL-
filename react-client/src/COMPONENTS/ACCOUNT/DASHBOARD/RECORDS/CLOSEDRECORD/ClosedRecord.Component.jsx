import React, { useState, useEffect } from 'react';
import moment from 'moment';

import './ClosedRecord.Component.scss';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

import ClosedRecordController from './ClosedRecord.Controller';

const ClosedRecord = ({
  dashboardComponentMount,
  statusMountClosedRecord,
  setStatusMountClosedRecord,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [kilometersTraveled, setKilometersTraveled] = useState(null);
  const [consumptionOneKilometr, setConsumptionOneKilometr] = useState(null);

  useEffect(() => {
    setKilometersTraveled(
      Number(statusMountClosedRecord.IDvehicle.Kilometrs) -
        Number(statusMountClosedRecord.KilometrsOpen)
    );

    setConsumptionOneKilometr(
      Number(statusMountClosedRecord.IDvehicle.Expense) / 100
    );
  }, []);

  return (
    <div className='ClosedRecord modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>
              Закрытие путевого листа ID: {statusMountClosedRecord.ID}
            </span>
          </div>
          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountClosedRecord(null);
            }}
          >
            X
          </button>
        </header>

        <main className='modal-window__main'>
          <div className='modal-window__question'>
            <p className='modal-window__question-text'>
              Вы действительно хотите закрыть путевой лист?
            </p>
            <p className='modal-window__question-data'>
              Открыть его позже уже не получится.
              <br />
              Номер путевого листа: {statusMountClosedRecord.Number}
              <br />
              Дата открытия:{' '}
              {moment(statusMountClosedRecord.DateOpen).format('YYYY-MM-DD')}
              <br />
              <br />
              ДАТА ЗАКРЫТИЯ: {moment(new Date()).format('YYYY-MM-DD')}{' '}
              (СЕГОДНЯ!)
              <br />
              <br />
              Пробег открытия: {statusMountClosedRecord.KilometrsOpen}
              <br />
              Пробег закрытия: {
                statusMountClosedRecord.IDvehicle.Kilometrs
              }{' '}
              (ПРОБЕГ АВТОМОБИЛЯ!)
              <br />
              Пройдено километров: {kilometersTraveled}
              <br />
              Использовано топлива:{' '}
              {kilometersTraveled * consumptionOneKilometr}
              <br />
              Автомобиль: {statusMountClosedRecord.IDvehicle.Model} :{' '}
              {statusMountClosedRecord.IDvehicle.Number}
              <br />
              Расход автомобиля: {statusMountClosedRecord.IDvehicle.Expense}
              /100км
              <br />
              Подписант: {statusMountClosedRecord.IDsigner.SurName}{' '}
              {statusMountClosedRecord.IDsigner.Name}{' '}
              {statusMountClosedRecord.IDsigner.MiddleName}
              <br />
              Водитель: {statusMountClosedRecord.IDdriver.SurName}{' '}
              {statusMountClosedRecord.IDdriver.Name}{' '}
              {statusMountClosedRecord.IDdriver.MiddleName}
              <br />
              Автомобильная база: {statusMountClosedRecord.IDautobase.Name}
            </p>
          </div>

          <div className='remove-object-buttons'>
            <button
              className='remove-object-buttons__no beautiful-button-green'
              onClick={() => {
                setStatusMountClosedRecord(null);
              }}
            >
              НЕТ
            </button>

            <button
              className='remove-object-buttons__yes beautiful-button-red'
              onClick={() => {
                ClosedRecordController(
                  dashboardComponentMount,
                  {
                    statusMountClosedRecord,
                  },
                  { kilometersTraveled, consumptionOneKilometr },
                  setLoadSpinerActive,
                  setStatusMountClosedRecord
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

export default ClosedRecord;
