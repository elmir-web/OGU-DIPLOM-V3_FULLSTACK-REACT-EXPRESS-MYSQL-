import React, { useState, useEffect } from 'react';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { HiLockClosed } from 'react-icons/hi';
import Toast from './../../../../Toast';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import './FillingList.Component.scss';

const FillingList = ({
  fillingListItems,
  setStatusMountCreateItemFillingList,
  setStatusMountChangeItemFillingList,
  setStatusMountRemoveItemFillingList,
  dataAccount,
}) => {
  const navigate = useNavigate();

  return <div className='FillingList'>FillingList</div>;
};

export default FillingList;
