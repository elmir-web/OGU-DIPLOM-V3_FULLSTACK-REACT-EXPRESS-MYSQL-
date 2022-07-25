import React from 'react';

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

      <div>Vehicles</div>
    </div>
  );
};

export default Vehicles;
