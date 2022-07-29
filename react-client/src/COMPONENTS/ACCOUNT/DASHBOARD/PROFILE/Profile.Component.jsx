import React from 'react';

import './Profile.Component.scss';

import BriefInformation from './BRIEFINFORMATION/BriefInformation.Component';

const Profile = ({
  dataAccount,
  setStatusMountChangeProfile,
  allAutoBase,
  allAccounts,
  typesGSM,
  storeHouseItems,
  allVehicles,
  allRecords,
  fillingListItems,
}) => {
  return (
    <div className='Profile'>
      <div className='profile-wrapper'>
        <div className='content-main'>
          <h2>
            {dataAccount?.SurName} {dataAccount?.Name} {dataAccount?.MiddleName}
          </h2>

          <p>Должность: {dataAccount?.IDposition.Name}</p>
          <p>Логин: {dataAccount?.LoginUser}</p>
          <p>Автобаза: {dataAccount?.IDautobases.Name}</p>
        </div>

        <div className='settings-wrapper'>
          <button
            className='beautiful-button beautiful-button-green'
            onClick={() => {
              setStatusMountChangeProfile(true);
            }}
          >
            редактировать профиль
          </button>
        </div>
      </div>

      <div className='Profile__parent-wrapper'>
        <BriefInformation
          dataAccount={dataAccount}
          allAutoBase={allAutoBase}
          allAccounts={allAccounts}
          typesGSM={typesGSM}
          storeHouseItems={storeHouseItems}
          allVehicles={allVehicles}
          allRecords={allRecords}
          fillingListItems={fillingListItems}
        />
      </div>
    </div>
  );
};

export default Profile;
