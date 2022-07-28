import React, { useEffect } from 'react';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { MdOutlineCreate } from 'react-icons/md';
import Toast from './../../../../Toast';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import './Records.Component.scss';

const Records = ({
  allRecords,
  setStatusMountCreateRecord,
  setStatusMountChangeRecord,
  setStatusMountRemoveRecord,
  dataAccount,
}) => {
  const navigate = useNavigate();

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
  }, []);

  return (
    <div className='Records'>
      <button
        className='beautiful-button beautiful-button-green'
        style={{ marginBottom: '50px' }}
        onClick={() => {
          setStatusMountCreateRecord(true);
        }}
      >
        создать путевой лист
      </button>

      <div className='table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>Действия</th>
              <th>ID</th>
              <th>Номер</th>
              <th>Статус</th>
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
            {allRecords.length ? (
              allRecords.map((record) => {
                return (
                  <tr key={record.ID}>
                    <td className='table-buttons'>
                      <button
                        className='table-button beautiful-button-blue'
                        onClick={() => {
                          setStatusMountChangeRecord(record);
                        }}
                      >
                        <MdOutlineCreate />
                      </button>

                      <button
                        className='table-button beautiful-button-red'
                        onClick={() => {
                          setStatusMountRemoveRecord(record);
                        }}
                      >
                        <RiDeleteBin4Line />
                      </button>
                    </td>
                    <td>{record.ID}</td>
                    <td>{record.Number}</td>
                    <td>{record.RecordStatus.Name}</td>
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
    </div>
  );
};

export default Records;
