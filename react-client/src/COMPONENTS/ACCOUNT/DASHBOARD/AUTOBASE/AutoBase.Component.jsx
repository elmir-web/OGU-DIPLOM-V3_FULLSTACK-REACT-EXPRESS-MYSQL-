import React from "react";
import { RiDeleteBin4Line } from "react-icons/ri";
import { MdOutlineCreate } from "react-icons/md";

import "./AutoBase.Component.scss";

const AutoBase = ({
  allAutoBase,
  setStatusMountCreateAutoBase,
  setStatusMountChangeAutoBase,
  setStatusMountRemoveAutoBase,
}) => {
  return (
    <div className="AutoBase">
      <button
        className="beautiful-button beautiful-button-green"
        style={{ marginBottom: "50px" }}
        onClick={() => {
          setStatusMountCreateAutoBase(true);
        }}
      >
        создать автомобильную базу
      </button>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID автобазы</th>
              <th>Название автобазы</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {allAutoBase.length ? (
              allAutoBase.map((itemAutoBase) => {
                return (
                  <tr key={itemAutoBase.ID}>
                    <td>{itemAutoBase.ID}</td>
                    <td>{itemAutoBase.Name}</td>
                    <td className="table-buttons">
                      <button
                        className="table-button beautiful-button-blue"
                        onClick={() => {
                          setStatusMountChangeAutoBase(itemAutoBase);
                        }}
                      >
                        <MdOutlineCreate />
                      </button>

                      <button
                        className="table-button beautiful-button-red"
                        onClick={() => {
                          setStatusMountRemoveAutoBase(itemAutoBase);
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
                <td colSpan="3">Автомобильные базы не найдены</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AutoBase;
