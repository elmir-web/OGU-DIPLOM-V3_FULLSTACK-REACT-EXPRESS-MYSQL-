import React, { useState, useEffect } from 'react';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { HiLockClosed } from 'react-icons/hi';
import Toast from './../../../../Toast';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import './Records.Component.scss';

const Records = ({
  allRecords,
  setStatusMountCreateRecord,
  setStatusMountClosedRecord,
  setStatusMountRemoveRecord,
  dataAccount,
}) => {
  const navigate = useNavigate();
  const [allOpenedRecords, setAllOpenedRecord] = useState(null);
  const [allClosedRecords, setAllClosedRecord] = useState(null);
  const [turnShowRecords, setTurnShowRecords] = useState(true);

  useEffect(() => {
    if (dataAccount?.IDposition.ID !== 1 && dataAccount?.IDposition.ID !== 3) {
      new Toast({
        title: 'Ошибка получении доступа',
        text: `У вас нет доступа к данному функционалу!`,
        theme: 'danger',
        autohide: true,
        interval: 3000,
      });

      navigate(`/account/dashboard/`);
      return;
    }

    const tempOpenedRecord = allRecords.filter((record) => {
      return record.RecordStatus.ID === 1;
    });

    setAllOpenedRecord(tempOpenedRecord);

    const tempClosedRecord = allRecords.filter((record) => {
      return record.RecordStatus.ID === 2;
    });

    setAllClosedRecord(tempClosedRecord);
  }, []);

  useEffect(() => {
    const tempOpenedRecord = allRecords.filter((record) => {
      return record.RecordStatus.ID === 1;
    });

    setAllOpenedRecord(tempOpenedRecord);

    const tempClosedRecord = allRecords.filter((record) => {
      return record.RecordStatus.ID === 2;
    });

    setAllClosedRecord(tempClosedRecord);
  }, [allRecords]);

  return (
    <div className='Records'>
      <button
        className='beautiful-button beautiful-button-green'
        style={{ marginBottom: '50px' }}
        onClick={() => {
          if (dataAccount.IDposition.ID === 1) {
            new Toast({
              title: 'Ошибка получения доступа',
              text: `Системой не предусмотрено, чтобы суперадмин выступал в роли подписанта!`,
              theme: 'danger',
              autohide: true,
              interval: 3000,
            });
            return;
          }

          setStatusMountCreateRecord(true);
        }}
      >
        создать путевой лист
      </button>

      <button
        className='beautiful-button beautiful-button-green'
        onClick={() => {
          setTurnShowRecords(!turnShowRecords);
        }}
      >
        Показать {turnShowRecords === true ? 'закрытые' : 'открытые'} путевые
        листы
      </button>

      {turnShowRecords === true ? (
        <div className='table-wrapper'>
          <h1>Открытые путевые листы</h1>
          <table>
            <thead>
              <tr>
                <th>Действия</th>
                <th>ID</th>
                <th>Номер</th>
                <th>Дата открытия</th>
                <th>Дата закрытия</th>
                <th>Пробег открытия</th>
                <th>Пробег закрытия</th>
                <th>Использовано литров</th>
                <th>Транспорт</th>
                <th>Топливо</th>
                <th>Подписант</th>
                <th>Водитель</th>
                <th>АвтоБаза</th>
              </tr>
            </thead>
            <tbody>
              {allOpenedRecords !== null ? (
                allOpenedRecords.length ? (
                  allOpenedRecords.map((record) => {
                    return (
                      <tr key={record.ID}>
                        <td className='table-buttons'>
                          <button
                            className='table-button beautiful-button-blue'
                            disabled={
                              record.RecordStatus.ID === 2 ? true : false
                            }
                            onClick={() => {
                              if (
                                dataAccount.IDposition.ID !== 1 &&
                                record.IDsigner.ID !== dataAccount.IDposition.ID
                              ) {
                                new Toast({
                                  title: 'Ошибка получении доступа',
                                  text: `Вы не можете закрыть не свой путевой лист!`,
                                  theme: 'danger',
                                  autohide: true,
                                  interval: 3000,
                                });
                                return;
                              }

                              setStatusMountClosedRecord(record);
                            }}
                          >
                            <HiLockClosed />
                          </button>

                          <button
                            className='table-button beautiful-button-red'
                            onClick={() => {
                              if (
                                dataAccount.IDposition.ID !== 1 &&
                                record.IDsigner.ID !== dataAccount.IDposition.ID
                              ) {
                                new Toast({
                                  title: 'Ошибка получении доступа',
                                  text: `Вы не можете удалить не свой путевой лист!`,
                                  theme: 'danger',
                                  autohide: true,
                                  interval: 3000,
                                });
                                return;
                              }

                              setStatusMountRemoveRecord(record);
                            }}
                          >
                            <RiDeleteBin4Line />
                          </button>
                        </td>
                        <td>{record.ID}</td>
                        <td>{record.Number}</td>
                        <td>{moment(record.DateOpen).format('YYYY-MM-DD')}</td>
                        <td>
                          {moment(record.DateClose).format('YYYY-MM-DD') !==
                          `Invalid date`
                            ? moment(record.DateClose).format('YYYY-MM-DD')
                            : ``}
                        </td>
                        <td>{record.KilometrsOpen}</td>
                        <td>{record.KilometrsClose}</td>
                        <td>{record.UsedLiters}</td>
                        <td>
                          {record.IDvehicle.Model} : {record.IDvehicle.Number}
                        </td>
                        <td>{record.IDtypegsm.Name}</td>
                        <td>
                          {record.IDsigner.SurName} {record.IDsigner.Name}{' '}
                          {record.IDsigner.MiddleName}
                        </td>
                        <td>
                          {record.IDdriver.SurName} {record.IDdriver.Name}{' '}
                          {record.IDdriver.MiddleName}
                        </td>
                        <td>{record.IDautobase.Name}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan='14'>Путевые листы не найдены</td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan='14'>Путевые листы не найдены</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='table-wrapper'>
          <h1>Закрытые путевые листы</h1>
          <table>
            <thead>
              <tr>
                <th>Действия</th>
                <th>ID</th>
                <th>Номер</th>
                <th>Дата открытия</th>
                <th>Дата закрытия</th>
                <th>Пробег открытия</th>
                <th>Пробег закрытия</th>
                <th>Использовано литров</th>
                <th>Транспорт</th>
                <th>Топливо</th>
                <th>Подписант</th>
                <th>Водитель</th>
                <th>АвтоБаза</th>
              </tr>
            </thead>
            <tbody>
              {allClosedRecords.length ? (
                allClosedRecords.map((record) => {
                  return (
                    <tr key={record.ID}>
                      <td className='table-buttons'>
                        <button
                          className='table-button beautiful-button-red'
                          onClick={() => {
                            if (
                              dataAccount.IDposition.ID !== 1 &&
                              record.IDsigner.ID !== dataAccount.IDposition.ID
                            ) {
                              new Toast({
                                title: 'Ошибка получении доступа',
                                text: `Вы не можете удалить не свой путевой лист!`,
                                theme: 'danger',
                                autohide: true,
                                interval: 3000,
                              });
                              return;
                            }

                            setStatusMountRemoveRecord(record);
                          }}
                        >
                          <RiDeleteBin4Line />
                        </button>
                      </td>
                      <td>{record.ID}</td>
                      <td>{record.Number}</td>
                      <td>{moment(record.DateOpen).format('YYYY-MM-DD')}</td>
                      <td>
                        {moment(record.DateClose).format('YYYY-MM-DD') !==
                        `Invalid date`
                          ? moment(record.DateClose).format('YYYY-MM-DD')
                          : ``}
                      </td>
                      <td>{record.KilometrsOpen}</td>
                      <td>{record.KilometrsClose}</td>
                      <td>{record.UsedLiters}</td>
                      <td>
                        {record.IDvehicle.Model} : {record.IDvehicle.Number}
                      </td>
                      <td>{record.IDtypegsm.Name}</td>
                      <td>
                        {record.IDsigner.SurName} {record.IDsigner.Name}{' '}
                        {record.IDsigner.MiddleName}
                      </td>
                      <td>
                        {record.IDdriver.SurName} {record.IDdriver.Name}{' '}
                        {record.IDdriver.MiddleName}
                      </td>
                      <td>{record.IDautobase.Name}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan='14'>Путевые листы не найдены</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Records;
