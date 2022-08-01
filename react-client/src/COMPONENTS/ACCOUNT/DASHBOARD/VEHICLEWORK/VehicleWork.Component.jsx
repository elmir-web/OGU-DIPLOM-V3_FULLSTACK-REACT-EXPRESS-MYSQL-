import React, { useState, useEffect } from 'react';
import Toast from './../../../../Toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { GrCar } from 'react-icons/gr';

import './VehicleWork.Component.scss';

import CONFIG from './../../../../CONFIG.json';

const VehicleWork = ({ dataAccount }) => {
  const navigate = useNavigate();
  const [myVehicles, setMyVehicles] = useState(null);

  useEffect(() => {
    if (dataAccount?.IDposition.ID !== 1 && dataAccount?.IDposition.ID !== 4) {
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

    const fetchMyVehicles = async () => {
      const tempUserAuthCookie = Cookies.get('GSM_DIPLOM_COOKIES_JWT');

      const dataMyAllVehicles = await fetch(
        `${CONFIG.URL_BACKEND}/api/my-vehicles/by-account/${dataAccount.ID}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${tempUserAuthCookie}`,
          },
        }
      );

      setMyVehicles(await dataMyAllVehicles.json());
    };

    fetchMyVehicles();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='VehicleWork'>
      <h1>Мои автомобили ({myVehicles && myVehicles.length})</h1>

      <div className='VehicleWork__items'>
        {myVehicles &&
          myVehicles.map((veh) => {
            console.log(veh);

            return (
              <div key={veh.ID} className='VehicleWork__item'>
                <div className='VehicleWork__item-content'>
                  <div className='VehicleWork__item-icon'>
                    <GrCar fontSize='80px' />
                  </div>

                  <div className='VehicleWork__item-body'>
                    <h3>{veh.Model}</h3>
                    <p>Модель: {veh.Model}</p>
                    <p>Гос. номер: {veh.Number}</p>
                    <p>Пробег: {veh.Kilometrs}</p>
                    <p>
                      Топливо: {veh.Liters} литров вида "{veh.IDtypegsm.Name}"
                    </p>
                    <p>Расход: {veh.Expense}/100км</p>
                    <p>АвтоБаза: {veh.IDautobase.Name}</p>
                  </div>

                  <div className='VehicleWork__item-footer'>
                    <button
                      className='VehicleWork__item-change'
                      onClick={() => {}}
                    >
                      <span>Работать</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default VehicleWork;
