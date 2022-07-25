import React, { useState } from 'react';

import './CreateTypeGSM.Component.scss';

import LoaderSpinerComponent from './../../../../LOADERSPINER/LoaderSpiner.Component';

import CreateTypeGSMController from './CreateTypeGSM.Controller';

const CreateTypeGSM = ({
  dashboardComponentMount,
  setStatusMountCreateTypeGSM,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  const [nameTypeGSM, setNameTypeGSM] = useState(``);
  const [forKiloTypeGSM, setForKiloTypeGSM] = useState(``);

  return (
    <div className='CreateTypeGSM modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <div className='modal-window__popup-form'>
        <header className='modal-window__header'>
          <div className='modal-window__title'>
            <span>Создание типа ГСМ</span>
          </div>

          <button
            className='modal-window__button-close'
            onClick={() => {
              setStatusMountCreateTypeGSM(false);
            }}
          >
            X
          </button>
        </header>

        <main className='modal-window__main'>
          <div className='text-field text-field_floating-3'>
            <input
              className='text-field__input'
              id='NameTypeGSM'
              name='NameTypeGSM'
              placeholder='NameTypeGSM'
              value={nameTypeGSM}
              onChange={(e) => {
                setNameTypeGSM(e.target.value);
              }}
            />
            <label className='text-field__label' htmlFor='NameTypeGSM'>
              Введите название типа ГСМ
            </label>
          </div>

          <div className='text-field text-field_floating-3'>
            <input
              className='text-field__input'
              id='ForKiloTypeGSM'
              name='ForKiloTypeGSM'
              placeholder='ForKiloTypeGSM'
              value={forKiloTypeGSM}
              onChange={(e) => {
                setForKiloTypeGSM(e.target.value);
              }}
            />
            <label className='text-field__label' htmlFor='ForKiloTypeGSM'>
              Введите вес литра в килограммах
            </label>
          </div>

          <button
            className='beautiful-button beautiful-button-green'
            onClick={() => {
              CreateTypeGSMController(
                dashboardComponentMount,
                { nameTypeGSM, forKiloTypeGSM },
                setLoadSpinerActive,
                setStatusMountCreateTypeGSM
              );
            }}
          >
            создать
          </button>
        </main>
      </div>
    </div>
  );
};

export default CreateTypeGSM;
