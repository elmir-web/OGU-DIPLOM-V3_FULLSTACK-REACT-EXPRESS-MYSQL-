import React from "react";
import moment from "moment";
import { MdOutlineFoundation } from "react-icons/md";
import { FaGasPump, FaWarehouse } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { GrUserWorker } from "react-icons/gr";
import { RiFileListLine } from "react-icons/ri";

import "./BriefInformation.Component..scss";

const BriefInformation = ({
  dataAccount,
  allAutoBase,
  allAccounts,
  typesGSM,
  storeHouseItems,
  allVehicles,
  allRecords,
}) => {
  React.useEffect(() => {}, []);

  if (dataAccount?.IDposition?.ID === 2 || dataAccount?.IDposition?.ID === 1)
    return (
      <div className="BriefInformation">
        <div className="BriefInformation__top">
          <h2>Статистика</h2>
        </div>
        <div className="BriefInformation__items">
          <div className="static-item">
            <MdOutlineFoundation size="50px" />

            <div className="item-info">
              <div className="item-value">{allAutoBase.length}</div>
              <div className="item-title">Автомобильные базы</div>
            </div>
          </div>
          <div className="static-item">
            <FaGasPump size="50px" />

            <div className="item-info">
              <div className="item-value">{typesGSM.length}</div>
              <div className="item-title">Виды гсм</div>
            </div>
          </div>
          <div className="static-item">
            <AiFillCar size="50px" />

            <div className="item-info">
              <div className="item-value">{allVehicles.length}</div>
              <div className="item-title">Все автомобили</div>
            </div>
          </div>
          <div className="static-item">
            <GrUserWorker size="50px" />

            <div className="item-info">
              <div className="item-value">{allAccounts.length}</div>
              <div className="item-title">Сотрудники</div>
            </div>
          </div>
          {dataAccount?.IDposition?.ID === 1 ? (
            <div className="static-item">
              <FaWarehouse size="50px" />

              <div className="item-info">
                <div className="item-value">{storeHouseItems.length}</div>
                <div className="item-title">Элементов на складе</div>
              </div>
            </div>
          ) : (
            ""
          )}
          {dataAccount?.IDposition?.ID === 1 ? (
            <div className="static-item">
              <RiFileListLine size="50px" />

              <div className="item-info">
                <div className="item-value">{allRecords.length}</div>
                <div className="item-title">путевые листы</div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  else if (
    dataAccount?.IDposition?.ID === 3 ||
    dataAccount?.IDposition?.ID === 1
  )
    return (
      <div className="BriefInformation">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Статус</th>
                <th>Дата (открытие)</th>
                <th>Дата (закрытие)</th>
                <th>Пробег (открытие)</th>
                <th>Пробег (закрытие)</th>
                <th>Литров (исп)</th>
                <th>Транспорт</th>
                <th>Топливо</th>
                <th>Подписант</th>
                <th>Водитель</th>
                <th>АвтоБаза</th>
              </tr>
            </thead>
            <tbody>
              {allRecords.length ? (
                allRecords?.map((record) => {
                  return (
                    <tr kye={record.ID}>
                      <td>{record.Number}</td>
                      <td>{record.RecordStatus === 1 ? "Открыт" : "Закрыт"}</td>
                      <td>{moment(record.DateOpen).format("YYYY-MM-DD")}</td>
                      <td>{moment(record.DateClose).format("YYYY-MM-DD")}</td>
                      <td>{record.KilometrsOpen}</td>
                      <td>{record.KilometrsClose}</td>
                      <td>{record.UsedLiters}</td>
                      <td>
                        {record.IDvehicle.Model} : {record.IDvehicle.Number}
                      </td>
                      <td>{record.IDtypegsm.Name}</td>
                      <td>
                        {record.IDsigner.SurName} {record.IDsigner.Name}{" "}
                        {record.IDsigner.MiddleName}
                      </td>
                      <td>
                        {record.IDdriver.SurName} {record.IDdriver.Name}{" "}
                        {record.IDdriver.MiddleName}
                      </td>
                      <td>{record.IDautobase.Name}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="12">Путевых листов не найдено</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default BriefInformation;
