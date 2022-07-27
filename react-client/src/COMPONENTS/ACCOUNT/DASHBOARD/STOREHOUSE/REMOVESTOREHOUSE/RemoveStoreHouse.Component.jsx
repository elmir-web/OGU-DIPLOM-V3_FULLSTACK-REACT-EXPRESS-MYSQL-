import React, { useState } from 'react';

import './RemoveStoreHouse.Component.scss';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

import RemoveStoreHouseController from './RemoveStoreHouse.Controller';

const RemoveStoreHouse = ({
  dashboardComponentMount,
  statusMountRemoveStoreHouseItem,
  setStatusMountRemoveStoreHouseItem,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);

  return (
    <div className='RemoveStoreHouse modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>
              Удаление элемента склада ID: {statusMountRemoveStoreHouseItem.ID}
            </span>
          </div>
          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountRemoveStoreHouseItem(null);
            }}
          >
            X
          </button>
        </header>

        <main className='modal-window__main'>
          <div className='modal-window__question'>
            <p className='modal-window__question-text'>
              Вы действительно хотите удалить элемент склада?
            </p>
            <p className='modal-window__question-data'>
              Вид: {statusMountRemoveStoreHouseItem.IDtypegsm.Name}
              <br />
              {statusMountRemoveStoreHouseItem.Liters} литров
            </p>
          </div>

          <div className='remove-object-buttons'>
            <button
              className='remove-object-buttons__no beautiful-button-green'
              onClick={() => {
                setStatusMountRemoveStoreHouseItem(null);
              }}
            >
              НЕТ
            </button>

            <button
              className='remove-object-buttons__yes beautiful-button-red'
              onClick={() => {
                RemoveStoreHouseController(
                  dashboardComponentMount,
                  {
                    statusMountRemoveStoreHouseItem,
                  },
                  setLoadSpinerActive,
                  setStatusMountRemoveStoreHouseItem
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

export default RemoveStoreHouse;
