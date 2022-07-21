import React, { useState, useEffect } from "react";
import {
  Link as RouterLink,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Toast from "./../../../Toast";
import Cookies from "js-cookie";
import dashboardDataLoad from "./Dashboard.Service";

import "./Dashboard.Component.scss";

import ProfileComponent from "./PROFILE/Profile.Component";
import LoaderSpinerComponent from "./../../LOADERSPINER/LoaderSpiner.Component";
import AutoBaseComponent from "./AUTOBASE/AutoBase.Component";
import ChangeProfileComponent from "./PROFILE/CHANGEUPDATE/ChangeUpdate.Component";
import CreateAutoBaseComponent from "./AUTOBASE/CREATEAUTOBASE/CreateAutoBase.Component";
import FooterComponent from "../../MAINPAGE/FOOTER/Footer.Component";

const DashboardNotFound = () => {
  let navigate = useNavigate();

  useEffect(() => {
    navigate("/");

    new Toast({
      title: "Ошибка",
      text: `Такого URL адреса не предусмотрено! Вы были переадресованы на главную!`,
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
  }, []);

  return <div></div>;
};

const Dashboard = ({ dataAccount, setDataAccount, getDataAccount }) => {
  const [statusMountChangeProfile, setStatusMountChangeProfile] =
    useState(false);
  const [statusMountCreateAutoBase, setStatusMountCreateAutoBase] =
    useState(false);
  const [loadSpinerActive, setLoadSpinerActive] = useState(false);
  let navigate = useNavigate();

  // datas
  const [allAutoBase, setAllAutoBase] = useState([]);
  const [allPositions, setAllPositions] = useState([]);
  const [allAccounts, setAllAccounts] = useState([]);
  const [allRecordStatuses, setAllRecordsStatuses] = useState([]);
  const [typesGSM, setTypesGSM] = useState([]);
  const [storeHouseItems, setStoreHouseItems] = useState([]);
  const [allVehicles, setAllVehicles] = useState([]);
  const [allRecords, setAllRecords] = useState([]);

  const dashboardComponentMount = () => {
    dashboardDataLoad(dataAccount, navigate, {
      setAllAutoBase,
      setAllPositions,
      setAllAccounts,
      setAllRecordsStatuses,
      setTypesGSM,
      setStoreHouseItems,
      setAllVehicles,
      setAllRecords,
    });
  };

  useEffect(dashboardComponentMount, []);

  return (
    <div className="Dashboard">
      {statusMountChangeProfile === true ? (
        <ChangeProfileComponent
          setStatusMountChangeProfile={setStatusMountChangeProfile}
          setDataAccount={setDataAccount}
          dataAccount={dataAccount}
          getDataAccount={getDataAccount}
        />
      ) : (
        ""
      )}

      {statusMountCreateAutoBase === true ? (
        <CreateAutoBaseComponent
          dashboardComponentMount={dashboardComponentMount}
          setStatusMountCreateAutoBase={setStatusMountCreateAutoBase}
        />
      ) : (
        ""
      )}

      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ""}

      <header className="header">
        <div className="central-container">
          <div
            className="header__logo"
            onClick={() => {
              window.open("http://osu.ru/", "_blank");
            }}
          ></div>

          <div className="header__center">
            <nav className="header__nav">
              <ul>
                <li>
                  <RouterLink to="">Мой профиль</RouterLink>
                </li>

                {dataAccount?.IDposition?.ID === 2 ||
                dataAccount?.IDposition?.ID === 1 ? (
                  <li>
                    <RouterLink to="autobase">Автомобильные базы</RouterLink>
                  </li>
                ) : (
                  ""
                )}

                {dataAccount?.IDposition?.ID === 2 ||
                dataAccount?.IDposition?.ID === 1 ? (
                  <li>
                    <RouterLink to="types-gsm">Виды ГСМ</RouterLink>
                  </li>
                ) : (
                  ""
                )}

                {dataAccount?.IDposition?.ID === 2 ||
                dataAccount?.IDposition?.ID === 1 ? (
                  <li>
                    <RouterLink to="autos">Транспорт</RouterLink>
                  </li>
                ) : (
                  ""
                )}

                {dataAccount?.IDposition?.ID === 2 ||
                dataAccount?.IDposition?.ID === 1 ? (
                  <li>
                    <RouterLink to="workers">Сотрудники</RouterLink>
                  </li>
                ) : (
                  ""
                )}

                {dataAccount?.IDposition?.ID === 3 ||
                dataAccount?.IDposition?.ID === 1 ? (
                  <li>
                    <RouterLink to="storehouse">Склад</RouterLink>
                  </li>
                ) : (
                  ""
                )}

                {dataAccount?.IDposition?.ID === 3 ||
                dataAccount?.IDposition?.ID === 1 ? (
                  <li>
                    <RouterLink to="records">Путевые листы</RouterLink>
                  </li>
                ) : (
                  ""
                )}

                {dataAccount?.IDposition?.ID === 4 ||
                dataAccount?.IDposition?.ID === 1 ? (
                  <li>
                    <RouterLink to="carwork">Работа с автомобилем</RouterLink>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </nav>
          </div>

          <div className="header__right">
            <button
              className="header-dashboard"
              onClick={() => {
                setLoadSpinerActive(true);

                new Toast({
                  title: "Ошибка",
                  text: `Вы вышли из аккаунта`,
                  theme: "info",
                  autohide: true,
                  interval: 2000,
                });

                setDataAccount(null);
                Cookies.remove("GSM_DIPLOM_COOKIES_JWT");

                setTimeout(() => {
                  window.location.href = `/`;
                }, 2000);
              }}
            >
              Выход
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="central-container">
          <Routes>
            <Route path="*" element={<DashboardNotFound />} />

            <Route
              index
              element={
                <ProfileComponent
                  dataAccount={dataAccount}
                  setStatusMountChangeProfile={setStatusMountChangeProfile}
                  allAutoBase={allAutoBase}
                  allAccounts={allAccounts}
                  typesGSM={typesGSM}
                  storeHouseItems={storeHouseItems}
                  allVehicles={allVehicles}
                  allRecords={allRecords}
                />
              }
            />
            <Route
              path="autobase"
              element={
                <AutoBaseComponent
                  allAutoBase={allAutoBase}
                  setStatusMountCreateAutoBase={setStatusMountCreateAutoBase}
                />
              }
            />
          </Routes>
        </div>
      </main>

      <FooterComponent />
    </div>
  );
};

export default Dashboard;
