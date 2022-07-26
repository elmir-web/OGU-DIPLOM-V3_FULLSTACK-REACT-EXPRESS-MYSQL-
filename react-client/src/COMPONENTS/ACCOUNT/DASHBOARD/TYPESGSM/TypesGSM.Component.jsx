import React, { useEffect } from 'react';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { MdOutlineCreate } from 'react-icons/md';
import Toast from './../../../../Toast';
import { useNavigate } from 'react-router-dom';

import './TypesGSM.Component.scss';

const TypesGSM = ({
  typesGSM,
  setStatusMountCreateTypeGSM,
  setStatusMountChangeTypeGSM,
  setStatusMountRemoveTypeGSM,
  dataAccount,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (dataAccount?.IDposition.ID !== 1 && dataAccount?.IDposition.ID !== 2) {
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
    <div className='TypesGSM'>
      <button
        className='beautiful-button beautiful-button-green'
        style={{ marginBottom: '50px' }}
        onClick={() => {
          setStatusMountCreateTypeGSM(true);
        }}
      >
        создать тип ГСМ
      </button>

      <div className='table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>ID ГСМ</th>
              <th>Название ГСМ</th>
              <th>Вес литра в кг</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {typesGSM.length ? (
              typesGSM.map((typegsm) => {
                return (
                  <tr key={typegsm.ID}>
                    <td>{typegsm.ID}</td>
                    <td>{typegsm.Name}</td>
                    <td>{typegsm.ForKilo}</td>
                    <td className='table-buttons'>
                      <button
                        className='table-button beautiful-button-blue'
                        onClick={() => {
                          setStatusMountChangeTypeGSM(typegsm);
                        }}
                      >
                        <MdOutlineCreate />
                      </button>

                      <button
                        className='table-button beautiful-button-red'
                        onClick={() => {
                          setStatusMountRemoveTypeGSM(typegsm);
                        }}
                      >
                        <RiDeleteBin4Line />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan='3'>Типы ГСМ не найдены</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TypesGSM;
