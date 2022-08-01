import React, { useState } from 'react';

import './ActionVehicle.Component.scss';

import ActionVehicleController from './ActionVehicle.Controller';

import LoaderSpinerComponent from '../../../../LOADERSPINER/LoaderSpiner.Component';

const ActionVehicle = ({}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);

  return (
    <div className='ActionVehicle modal-window'>
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}
    </div>
  );
};

export default ActionVehicle;
