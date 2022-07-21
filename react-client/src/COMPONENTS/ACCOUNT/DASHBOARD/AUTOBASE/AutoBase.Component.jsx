import React from "react";
import { RiDeleteBin4Line } from "react-icons/ri";
import { MdOutlineCreate } from "react-icons/md";

import "./AutoBase.Component.scss";

const AutoBase = ({ allAutoBase, setStatusMountCreateAutoBase }) => {
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
                      <button className="table-button beautiful-button-red">
                        <RiDeleteBin4Line />
                      </button>

                      <button className="table-button beautiful-button-blue">
                        <MdOutlineCreate />
                      </button>

                      {/* <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => {
                          deleteAutoBase(
                            itemAutoBase,
                            statusAccessEditing,
                            loadAutoBases
                          );
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{ ml: 1 }}
                        onClick={() => {
                          beginUpdateAutoBase(
                            itemAutoBase,
                            statusAccessEditing,
                            changedAutoBase,
                            setChangedAutoBase
                          );
                        }}
                      >
                        <BorderColorIcon fontSize="small" />
                      </Button> */}
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
