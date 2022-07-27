import React, { useEffect } from 'react';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { MdOutlineCreate } from 'react-icons/md';
import Toast from './../../../../Toast';
import { useNavigate } from 'react-router-dom';

import './StoreHouse.Component.scss';

const StoreHouse = ({
  storeHouseItems,
  setStatusMountCreateStoreHouseItem,
  setStatusMountChangeStoreHouseItem,
  setStatusMountRemoveStoreHouseItem,
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
    <div className='StoreHouse'>
      <button
        className='beautiful-button beautiful-button-green'
        style={{ marginBottom: '50px' }}
        onClick={() => {
          setStatusMountCreateStoreHouseItem(true);
        }}
      >
        создать элемент склада
      </button>

      <div className='table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Литры</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {storeHouseItems.length ? (
              storeHouseItems.map((storeHouseItem) => {
                return (
                  <tr key={storeHouseItem.ID}>
                    <td>{storeHouseItem.ID}</td>
                    <td>{storeHouseItem.IDtypegsm.Name}</td>
                    <td>{storeHouseItem.Liters}</td>
                    <td className='table-buttons'>
                      <button
                        className='table-button beautiful-button-blue'
                        onClick={() => {
                          setStatusMountChangeStoreHouseItem(storeHouseItem);
                        }}
                      >
                        <MdOutlineCreate />
                      </button>

                      <button
                        className='table-button beautiful-button-red'
                        onClick={() => {
                          setStatusMountRemoveStoreHouseItem(storeHouseItem);
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
                <td colSpan='3'>Элементы склада не найдены</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreHouse;
