import React from 'react';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { MdOutlineCreate } from 'react-icons/md';

import './Vehicles.Component.scss';

const Vehicles = ({
  allVehicles,
  setStatusMountCreateVehicle,
  setStatusMountChangeVehicle,
  setStatusMountRemoveVehicle,
}) => {
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
                <td colSpan='8'>Транспорт не найден</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vehicles;
