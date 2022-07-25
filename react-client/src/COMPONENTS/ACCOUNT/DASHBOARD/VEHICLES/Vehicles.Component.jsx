import React from 'react';

import './Vehicles.Component.scss';

import ChangeVehicleComponent from './CHANGEVEHICLE/ChangeVehicle.Component';
import CreateVehicleComponent from './CREATEVEHICLE/CreateVehicle.Component';
import RemoveVehicleComponent from './REMOVEVEHICLE/RemoveVehicle.Component';

const Vehicles = () => {
  return (
    <div className='Vehicles'>
      <div>Vehicles</div>
      <ChangeVehicleComponent />
      <CreateVehicleComponent />
      <RemoveVehicleComponent />
    </div>
  );
};

export default Vehicles;
