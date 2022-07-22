import React, { useState } from "react";

import "./RemoveAutoBase.Component.scss";

import LoaderSpinerComponent from "./../../../../LOADERSPINER/LoaderSpiner.Component";

import RemoveAutoBaseController from "./RemoveAutoBase.Controller";

const RemoveAutoBase = ({
  dashboardComponentMount,
  setStatusMountRemoveAutoBase,
  statusMountRemoveAutoBase,
}) => {
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);

  return (
    <div className="RemoveAutoBase modal-window">
      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ""}

      <div className="modal-window__popup-form">
        <header className="modal-window__header">
          <div className="modal-window__title">
            <span>
              Удаление автомобильной базы ID: {statusMountRemoveAutoBase.ID}
            </span>
          </div>

          <button
            className="modal-window__button-close"
            onClick={() => {
              setStatusMountRemoveAutoBase(null);
            }}
          >
            X
          </button>
        </header>

        <main className="modal-window__main">
          <div className="modal-window__question">
            <p className="modal-window__question-text">
              Вы действительно хотите удалить автобазу?
            </p>
            <p className="modal-window__question-data">
              Название: {statusMountRemoveAutoBase.Name}
            </p>
          </div>

          <div className="remove-object-buttons">
            <button
              className="remove-object-buttons__no beautiful-button-green"
              onClick={() => {
                setStatusMountRemoveAutoBase(null);
              }}
            >
              НЕТ
            </button>

            <button
              className="remove-object-buttons__yes beautiful-button-red"
              onClick={() => {
                RemoveAutoBaseController(
                  dashboardComponentMount,
                  {
                    statusMountRemoveAutoBase,
                  },
                  setLoadSpinerActive,
                  setStatusMountRemoveAutoBase
                );
              }}
            >
              да
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RemoveAutoBase;
