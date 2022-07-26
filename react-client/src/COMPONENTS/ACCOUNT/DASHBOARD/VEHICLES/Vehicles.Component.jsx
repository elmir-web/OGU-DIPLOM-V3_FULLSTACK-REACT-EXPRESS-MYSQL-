import React, { useEffect } from 'react';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { MdOutlineCreate } from 'react-icons/md';
import Toast from './../../../../Toast';
import { useNavigate } from 'react-router-dom';

import './Vehicles.Component.scss';

const Vehicles = ({
  allVehicles,
  setStatusMountCreateVehicle,
  setStatusMountChangeVehicle,
  setStatusMountRemoveVehicle,
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
    <div className='Vehicles'>
      <button
        className='beautiful-button beautiful-button-green'
        style={{ marginBottom: '50px' }}
        onClick={() => {
          setStatusMountCreateVehicle(true);
        }}
      >
        создать тип ГСМ
      </button>

      <div className='table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Модель</th>
              <th>Гос.номер</th>
              <th>Автомобильная база</th>
              <th>Тип ГСМ</th>
              <th>Пробег</th>
              <th>Топливо</th>
              <th>Расход</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {allVehicles.length ? (
              allVehicles.map((vehicle) => {
                return (
                  <tr key={vehicle.ID}>
                    <td>{vehicle.ID}</td>
                    <td>{vehicle.Model}</td>
                    <td>{vehicle.Number}</td>
                    <td>{vehicle.IDautobase.Name}</td>
                    <td>{vehicle.IDtypegsm.Name}</td>
                    <td>{vehicle.Kilometrs}</td>
                    <td>{vehicle.Liters}</td>
                    <td>{vehicle.Expense}</td>
                    <td className='table-buttons'>
                      <button
                        className='table-button beautiful-button-blue'
                        onClick={() => {
                          setStatusMountChangeVehicle(vehicle);
                        }}
                      >
                        <MdOutlineCreate />
                      </button>

                      <button
                        className='table-button beautiful-button-red'
                        onClick={() => {
                          setStatusMountRemoveVehicle(vehicle);
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
                <td colSpan='9'>Транспорт не найден</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vehicles;
