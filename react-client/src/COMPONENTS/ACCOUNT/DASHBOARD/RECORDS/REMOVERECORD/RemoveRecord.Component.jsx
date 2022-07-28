import React, { useState } from 'react';

import './RemoveRecord.Component.scss';

import RemoveRecordController from './RemoveRecord.Controller';

const RemoveRecord = ({
  dashboardComponentMount,
  statusMountRemoveRecord,
  setStatusMountRemoveRecord,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);

  return <div className='RemoveRecord'>RemoveRecord</div>;
};

export default RemoveRecord;
