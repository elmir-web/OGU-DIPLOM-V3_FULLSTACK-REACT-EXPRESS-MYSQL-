import React, { useState, useEffect } from 'react';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { HiLockClosed } from 'react-icons/hi';
import Toast from './../../../../Toast';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import './FillingList.Component.scss';

const FillingList = ({
  fillingListItems,
  setStatusMountCreateItemFillingList,
  setStatusMountClosedFillingList,
  dataAccount,
}) => {
  const navigate = useNavigate();
  const [allOpenedFillingLists, setAllOpenedFillingLists] = useState(null);
  const [allClosedFillingLists, setAllClosedFillingLists] = useState(null);
  const [turnShowFillingList, setTurnShowFillingList] = useState(true);

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

    const tempOpenedFillingLists = fillingListItems.filter((list) => {
      return list.FillingStatus === 1;
    });

    setAllOpenedFillingLists(tempOpenedFillingLists);

    const tempClosedFillingLists = fillingListItems.filter((list) => {
      return list.FillingStatus === 2;
    });

    setAllClosedFillingLists(tempClosedFillingLists);
  }, []);

  useEffect(() => {
    const tempOpenedFillingLists = fillingListItems.filter((list) => {
      return list.FillingStatus === 1;
    });

    setAllOpenedFillingLists(tempOpenedFillingLists);

    const tempClosedFillingLists = fillingListItems.filter((list) => {
      return list.FillingStatus === 2;
    });

    setAllClosedFillingLists(tempClosedFillingLists);
  }, [fillingListItems]);

  return (
    <div className='FillingList'>
      <button
        className='beautiful-button beautiful-button-green'
        style={{ marginBottom: '50px' }}
        onClick={() => {
          setStatusMountCreateItemFillingList(true);
        }}
      >
        создать заправочную ведомость
      </button>

      <button
        className='beautiful-button beautiful-button-green'
        onClick={() => {
          setTurnShowFillingList(!turnShowFillingList);
        }}
      >
        Показать {turnShowFillingList === true ? 'закрытые' : 'открытые'}{' '}
        заправочные ведомости
      </button>

      {turnShowFillingList === true ? (
        <div className='table-wrapper'>
          <h1>Открытые заправочные ведомости</h1>

          <table>
            <thead>
              <tr>
                <th>Действия</th>
                <th>ID</th>
                <th>Номер</th>
                <th>Разрешено литров</th>
                <th>Использовано литров</th>
                <th>Путевой лист к</th>
              </tr>
            </thead>
            <tbody>
              {allOpenedFillingLists && allOpenedFillingLists.length ? (
                allOpenedFillingLists.map((list) => {
                  return (
                    <tr key={list.ID}>
                      <td className='table-buttons'>
                        <button
                          className='table-button beautiful-button-blue'
                          onClick={() => {
                            if (list.IDrecord.IDsigner.ID !== dataAccount.ID) {
                              new Toast({
                                title: 'Ошибка получении доступа',
                                text: `Вы не можете закрыть не свою ведомость!`,
                                theme: 'danger',
                                autohide: true,
                                interval: 3000,
                              });
                              return;
                            }
                            setStatusMountClosedFillingList(list);
                          }}
                        >
                          <HiLockClosed />
                        </button>
                      </td>
                      <td>{list.ID}</td>
                      <td>{list.Number}</td>
                      <td>{list.Liters}</td>
                      <td>{list.UsedLiters}</td>
                      <td>
                        {list.IDrecord.Number} : {list.IDrecord.IDvehicle.Model}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan='6'>заправочные ведомости не найдены</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='table-wrapper'>
          <h1>Закрытые заправочные ведомости</h1>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Номер</th>
                <th>Разрешено литров</th>
                <th>Использовано литров</th>
                <th>Путевой лист к</th>
              </tr>
            </thead>
            <tbody>
              {allClosedFillingLists && allClosedFillingLists.length ? (
                allClosedFillingLists.map((list) => {
                  return (
                    <tr key={list.ID}>
                      <td>{list.ID}</td>
                      <td>{list.Number}</td>
                      <td>{list.Liters}</td>
                      <td>{list.UsedLiters}</td>
                      <td>
                        {list.IDrecord.Number} : {list.IDrecord.IDvehicle.Model}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan='6'>заправочные ведомости не найдены</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FillingList;
