import React from "react";

import "./Profile.Component.scss";

const Profile = ({ MountedChildrenComponent, dataAccount }) => {
  console.log(dataAccount);

  return (
    <div className="Profile">
      <div className="profile-wrapper">
        <div className="content-main">
          <h2>
            {dataAccount?.SurName} {dataAccount?.Name} {dataAccount?.MiddleName}
          </h2>

          <p>Должность: {dataAccount?.IDposition.Name}</p>
          <p>Логин: {dataAccount?.LoginUser}</p>
          <p>Автобаза: {dataAccount?.IDautobases.Name}</p>
        </div>

        <div className="settings-wrapper">
          <button
            className="beautiful-button beautiful-button-green"
            onClick={() => {
              MountedChildrenComponent(`mount`, `change-profile`);
            }}
          >
            редактировать профиль
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
