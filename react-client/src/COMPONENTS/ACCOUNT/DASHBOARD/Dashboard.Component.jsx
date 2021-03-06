import React, { useState, useEffect } from 'react';
import {
  Link as RouterLink,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import Toast from './../../../Toast';
import Cookies from 'js-cookie';
import dashboardDataLoad from './Dashboard.Service';

import './Dashboard.Component.scss';

import ProfileComponent from './PROFILE/Profile.Component';
import ChangeProfileComponent from './PROFILE/CHANGEUPDATE/ChangeUpdate.Component';

import LoaderSpinerComponent from './../../LOADERSPINER/LoaderSpiner.Component';

import AutoBaseComponent from './AUTOBASE/AutoBase.Component';
import CreateAutoBaseComponent from './AUTOBASE/CREATEAUTOBASE/CreateAutoBase.Component';
import ChangeAutoBaseComponent from './AUTOBASE/CHANGEAUTOBASE/ChangeAutoBase.Component';
import RemoveAutoBaseComponent from './AUTOBASE/REMOVEAUTOBASE/RemoveAutoBase.Component';

import TypesGSMComponent from './TYPESGSM/TypesGSM.Component';
import CreateTypeGSMComponent from './TYPESGSM/CREATETYPEGSM/CreateTypeGSM.Component';
import ChangeTypeGSMComponent from './TYPESGSM/CHANGETYPEGSM/ChangeTypeGSM.Component';
import RemoveTypeGSMComponent from './TYPESGSM/REMOVETYPEGSM/RemoveTypeGSM.Component';

import VehiclesComponent from './VEHICLES/Vehicles.Component';
import ChangeVehicleComponent from './VEHICLES/CHANGEVEHICLE/ChangeVehicle.Component';
import CreateVehicleComponent from './VEHICLES/CREATEVEHICLE/CreateVehicle.Component';
import RemoveVehicleComponent from './VEHICLES/REMOVEVEHICLE/RemoveVehicle.Component';

import WorkerAccountComponent from './WORKERSACCOUNTS/WorkerAccount.Component';
import ChangeWorkerAccountComponent from './WORKERSACCOUNTS/CHANGEWORKERACCOUNT/ChangeWorkerAccount.Component';
import CreateWorkerAccountComponent from './WORKERSACCOUNTS/CREATEWORKERACCOUNT/CreateWorkerAccount.Component';
import RemoveWorkerAccountComponent from './WORKERSACCOUNTS/REMOVEWORKERACCOUNT/RemoveWorkerAccount.Component';

import StoreHouseComponent from './STOREHOUSE/StoreHouse.Component';
import ChangeStoreHouseComponent from './STOREHOUSE/CHANGESTOREHOUSE/ChangeStoreHouse.Component';
import CreateStoreHouseComponent from './STOREHOUSE/CREATESTOREHOUSE/CreateStoreHouse.Component';
import RemoveStoreHouseComponent from './STOREHOUSE/REMOVESTOREHOUSE/RemoveStoreHouse.Component';

import RecordsComponent from './RECORDS/Records.Component';
import ClosedRecordComponent from './RECORDS/CLOSEDRECORD/ClosedRecord.Component';
import CreateRecordComponent from './RECORDS/CREATERECORD/CreateRecord.Component';
import RemoveRecordComponent from './RECORDS/REMOVERECORD/RemoveRecord.Component';

import FillingListComponent from './FILLINGLIST/FillingList.Component';
import CreateItemFillingListComponent from './FILLINGLIST/CREATEITEMFILLINGLIST/CreateItemFillingList.Component';
import ClosedItemFillingListComponent from './FILLINGLIST/CLOSEDITEMFILLINGLIST/ClosedItemFillingList.Component';

import VehicleWorkComponent from './VEHICLEWORK/VehicleWork.Component';
import ActionFuelingProcessComponent from './VEHICLEWORK/ACTIONFUELINGPROCESS/ActionFuelingProcess.Component';

import FooterComponent from '../../MAINPAGE/FOOTER/Footer.Component';

const { URL_BACKEND } = require('./../../../CONFIG.json');

const DashboardNotFound = () => {
  let navigate = useNavigate();

  useEffect(() => {
    navigate('/');

    new Toast({
      title: '????????????',
      text: `???????????? URL ???????????? ???? ??????????????????????????! ???? ???????? ???????????????????????????? ???? ??????????????!`,
      theme: 'danger',
      autohide: true,
      interval: 10000,
    });
  }, []);

  return <div></div>;
};

const getDataAccount = async ({ myJWT }) => {
  let responseFetch = await fetch(`${URL_BACKEND}/api/account/my-data`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${myJWT}`,
    },
  });
  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  return {
    ok,
    status,
    responseFetch,
  };
};

const clearDataAccount = ({ setDataAccount, navigate }) => {
  new Toast({
    title: '???????????? ???????????????????????????? ??????????????????????',
    text: `???? ???????????????? ?????????????????????????? ?????? ????????????????????????????, ???? ?? ?????? ???? ????????????????????. ?????????????????????????? ?????????????????? ?????????? ?? ????????????`,
    theme: 'danger',
    autohide: true,
    interval: 10000,
  });

  setDataAccount(null);

  Cookies.remove('GSM_DIPLOM_COOKIES_JWT');

  navigate('/');
};

const Dashboard = ({ dataAccount, setDataAccount }) => {
  const [statusMountChangeProfile, setStatusMountChangeProfile] =
    useState(false);

  const [statusMountCreateAutoBase, setStatusMountCreateAutoBase] =
    useState(false);
  const [statusMountChangeAutoBase, setStatusMountChangeAutoBase] =
    useState(null);
  const [statusMountRemoveAutoBase, setStatusMountRemoveAutoBase] =
    useState(null);

  const [statusMountCreateTypeGSM, setStatusMountCreateTypeGSM] =
    useState(false);
  const [statusMountChangeTypeGSM, setStatusMountChangeTypeGSM] =
    useState(null);
  const [statusMountRemoveTypeGSM, setStatusMountRemoveTypeGSM] =
    useState(null);

  const [statusMountCreateVehicle, setStatusMountCreateVehicle] =
    useState(false);
  const [statusMountChangeVehicle, setStatusMountChangeVehicle] =
    useState(null);
  const [statusMountRemoveVehicle, setStatusMountRemoveVehicle] =
    useState(null);

  const [statusMountCreateWorkerAccount, setStatusMountCreateWorkerAccount] =
    useState(false);
  const [statusMountChangeWorkerAccount, setStatusMountChangeWorkerAccount] =
    useState(null);
  const [statusMountRemoveWorkerAccount, setStatusMountRemoveWorkerAccount] =
    useState(null);

  const [statusMountCreateStoreHouseItem, setStatusMountCreateStoreHouseItem] =
    useState(false);
  const [statusMountChangeStoreHouseItem, setStatusMountChangeStoreHouseItem] =
    useState(null);
  const [statusMountRemoveStoreHouseItem, setStatusMountRemoveStoreHouseItem] =
    useState(null);

  const [statusMountCreateRecord, setStatusMountCreateRecord] = useState(false);
  const [statusMountClosedRecord, setStatusMountClosedRecord] = useState(null);
  const [statusMountRemoveRecord, setStatusMountRemoveRecord] = useState(null);

  const [
    statusMountCreateItemFillingList,
    setStatusMountCreateItemFillingList,
  ] = useState(false);
  const [statusMountClosedFillingList, setStatusMountClosedFillingList] =
    useState(null);

  const [statusMountActionFuelingProcess, setStatusMountActionFuelingProcess] =
    useState(null);

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
  const [fillingListItems, setFillingListItems] = useState([]);
  const [myVehicles, setMyVehicles] = useState(null);

  const dashboardComponentMount = () => {
    const myJWT = Cookies.get('GSM_DIPLOM_COOKIES_JWT');

    if (myJWT === undefined) clearDataAccount({ setDataAccount, navigate });

    (async () => {
      const { ok, status, responseFetch } = await getDataAccount({ myJWT });

      if (ok === true && status === 200)
        new Toast({
          title: '???????????????????????????? ??????????????????????',
          text: `???? ?????????????????????????? ????????????????????????????????. ???????? ???? ???? ?? ??????????????, ?????????????? "???????????? ??????????????"`,
          theme: 'info',
          autohide: true,
          interval: 10000,
        });
      else clearDataAccount({ setDataAccount, navigate });

      setDataAccount(responseFetch);

      dashboardDataLoad(responseFetch, dataAccount, navigate, {
        setAllAutoBase,
        setAllPositions,
        setAllAccounts,
        setAllRecordsStatuses,
        setTypesGSM,
        setStoreHouseItems,
        setAllVehicles,
        setAllRecords,
        setFillingListItems,
        setMyVehicles,
      });
    })();
  };

  useEffect(dashboardComponentMount, []);

  return (
    <div className='Dashboard'>
      {statusMountChangeProfile === true ? (
        <ChangeProfileComponent
          setStatusMountChangeProfile={setStatusMountChangeProfile}
          setDataAccount={setDataAccount}
          dataAccount={dataAccount}
          getDataAccount={getDataAccount}
        />
      ) : (
        ''
      )}

      {statusMountCreateAutoBase === true ? (
        <CreateAutoBaseComponent
          dashboardComponentMount={dashboardComponentMount}
          setStatusMountCreateAutoBase={setStatusMountCreateAutoBase}
        />
      ) : (
        ''
      )}

      {statusMountChangeAutoBase !== null ? (
        <ChangeAutoBaseComponent
          dashboardComponentMount={dashboardComponentMount}
          setStatusMountChangeAutoBase={setStatusMountChangeAutoBase}
          statusMountChangeAutoBase={statusMountChangeAutoBase}
        />
      ) : (
        ''
      )}

      {statusMountRemoveAutoBase !== null ? (
        <RemoveAutoBaseComponent
          dashboardComponentMount={dashboardComponentMount}
          setStatusMountRemoveAutoBase={setStatusMountRemoveAutoBase}
          statusMountRemoveAutoBase={statusMountRemoveAutoBase}
        />
      ) : (
        ''
      )}

      {statusMountCreateTypeGSM === true ? (
        <CreateTypeGSMComponent
          dashboardComponentMount={dashboardComponentMount}
          setStatusMountCreateTypeGSM={setStatusMountCreateTypeGSM}
        />
      ) : (
        ''
      )}

      {statusMountChangeTypeGSM !== null ? (
        <ChangeTypeGSMComponent
          dashboardComponentMount={dashboardComponentMount}
          setStatusMountChangeTypeGSM={setStatusMountChangeTypeGSM}
          statusMountChangeTypeGSM={statusMountChangeTypeGSM}
        />
      ) : (
        ''
      )}

      {statusMountRemoveTypeGSM !== null ? (
        <RemoveTypeGSMComponent
          dashboardComponentMount={dashboardComponentMount}
          setStatusMountRemoveTypeGSM={setStatusMountRemoveTypeGSM}
          statusMountRemoveTypeGSM={statusMountRemoveTypeGSM}
        />
      ) : (
        ''
      )}

      {statusMountCreateVehicle === true ? (
        <CreateVehicleComponent
          dashboardComponentMount={dashboardComponentMount}
          setStatusMountCreateVehicle={setStatusMountCreateVehicle}
          allAutoBase={allAutoBase}
          typesGSM={typesGSM}
        />
      ) : (
        ''
      )}

      {statusMountChangeVehicle !== null ? (
        <ChangeVehicleComponent
          dashboardComponentMount={dashboardComponentMount}
          statusMountChangeVehicle={statusMountChangeVehicle}
          setStatusMountChangeVehicle={setStatusMountChangeVehicle}
          allAutoBase={allAutoBase}
          typesGSM={typesGSM}
        />
      ) : (
        ''
      )}

      {statusMountRemoveVehicle !== null ? (
        <RemoveVehicleComponent
          dashboardComponentMount={dashboardComponentMount}
          statusMountRemoveVehicle={statusMountRemoveVehicle}
          setStatusMountRemoveVehicle={setStatusMountRemoveVehicle}
        />
      ) : (
        ''
      )}

      {statusMountCreateWorkerAccount === true ? (
        <CreateWorkerAccountComponent
          dashboardComponentMount={dashboardComponentMount}
          setStatusMountCreateWorkerAccount={setStatusMountCreateWorkerAccount}
          allAutoBase={allAutoBase}
          allPositions={allPositions}
        />
      ) : (
        ''
      )}

      {statusMountChangeWorkerAccount !== null ? (
        <ChangeWorkerAccountComponent
          dashboardComponentMount={dashboardComponentMount}
          statusMountChangeWorkerAccount={statusMountChangeWorkerAccount}
          setStatusMountChangeWorkerAccount={setStatusMountChangeWorkerAccount}
          allAutoBase={allAutoBase}
          allPositions={allPositions}
        />
      ) : (
        ''
      )}

      {statusMountRemoveWorkerAccount !== null ? (
        <RemoveWorkerAccountComponent
          dashboardComponentMount={dashboardComponentMount}
          statusMountRemoveWorkerAccount={statusMountRemoveWorkerAccount}
          setStatusMountRemoveWorkerAccount={setStatusMountRemoveWorkerAccount}
        />
      ) : (
        ''
      )}

      {statusMountCreateStoreHouseItem === true ? (
        <CreateStoreHouseComponent
          dashboardComponentMount={dashboardComponentMount}
          setStatusMountCreateStoreHouseItem={
            setStatusMountCreateStoreHouseItem
          }
          typesGSM={typesGSM}
        />
      ) : (
        ''
      )}

      {statusMountChangeStoreHouseItem !== null ? (
        <ChangeStoreHouseComponent
          dashboardComponentMount={dashboardComponentMount}
          statusMountChangeStoreHouseItem={statusMountChangeStoreHouseItem}
          setStatusMountChangeStoreHouseItem={
            setStatusMountChangeStoreHouseItem
          }
          typesGSM={typesGSM}
        />
      ) : (
        ''
      )}

      {statusMountRemoveStoreHouseItem !== null ? (
        <RemoveStoreHouseComponent
          dashboardComponentMount={dashboardComponentMount}
          statusMountRemoveStoreHouseItem={statusMountRemoveStoreHouseItem}
          setStatusMountRemoveStoreHouseItem={
            setStatusMountRemoveStoreHouseItem
          }
        />
      ) : (
        ''
      )}

      {statusMountCreateRecord === true ? (
        <CreateRecordComponent
          dashboardComponentMount={dashboardComponentMount}
          setStatusMountCreateRecord={setStatusMountCreateRecord}
          allVehicles={allVehicles}
          allAccounts={allAccounts}
          dataAccount={dataAccount}
        />
      ) : (
        ''
      )}

      {statusMountClosedRecord !== null ? (
        <ClosedRecordComponent
          dashboardComponentMount={dashboardComponentMount}
          statusMountClosedRecord={statusMountClosedRecord}
          setStatusMountClosedRecord={setStatusMountClosedRecord}
        />
      ) : (
        ''
      )}

      {statusMountRemoveRecord !== null ? (
        <RemoveRecordComponent
          dashboardComponentMount={dashboardComponentMount}
          statusMountRemoveRecord={statusMountRemoveRecord}
          setStatusMountRemoveRecord={setStatusMountRemoveRecord}
        />
      ) : (
        ''
      )}

      {statusMountCreateItemFillingList === true ? (
        <CreateItemFillingListComponent
          dashboardComponentMount={dashboardComponentMount}
          setStatusMountCreateItemFillingList={
            setStatusMountCreateItemFillingList
          }
          allRecords={allRecords}
          dataAccount={dataAccount}
        />
      ) : (
        ''
      )}

      {statusMountClosedFillingList !== null ? (
        <ClosedItemFillingListComponent
          dashboardComponentMount={dashboardComponentMount}
          statusMountClosedFillingList={statusMountClosedFillingList}
          setStatusMountClosedFillingList={setStatusMountClosedFillingList}
        />
      ) : (
        ''
      )}

      {statusMountActionFuelingProcess !== null && (
        <ActionFuelingProcessComponent
          dashboardComponentMount={dashboardComponentMount}
          statusMountActionFuelingProcess={statusMountActionFuelingProcess}
          setStatusMountActionFuelingProcess={
            setStatusMountActionFuelingProcess
          }
          fillingListItems={fillingListItems}
          storeHouseItems={storeHouseItems}
        />
      )}

      {loadSpinerActive === true ? <LoaderSpinerComponent /> : ''}

      <header className='header'>
        <div className='central-container'>
          <div
            className='header__logo'
            onClick={() => {
              window.open('http://osu.ru/', '_blank');
            }}
          ></div>

          <div className='header__center'>
            <nav className='header__nav'>
              <ul>
                <li>
                  <RouterLink to=''>?????? ??????????????</RouterLink>
                </li>

                {/* ?????????? */}
                {dataAccount?.IDposition?.ID === 2 ||
                dataAccount?.IDposition?.ID === 1 ? (
                  <li>
                    <RouterLink to='autobase'>?????????????????????????? ????????</RouterLink>
                  </li>
                ) : (
                  ''
                )}

                {dataAccount?.IDposition?.ID === 2 ||
                dataAccount?.IDposition?.ID === 1 ? (
                  <li>
                    <RouterLink to='types-gsm'>???????? ??????</RouterLink>
                  </li>
                ) : (
                  ''
                )}

                {dataAccount?.IDposition?.ID === 2 ||
                dataAccount?.IDposition?.ID === 1 ? (
                  <li>
                    <RouterLink to='vehicles'>??????????????????</RouterLink>
                  </li>
                ) : (
                  ''
                )}

                {dataAccount?.IDposition?.ID === 2 ||
                dataAccount?.IDposition?.ID === 1 ? (
                  <li>
                    <RouterLink to='accounts'>????????????????????</RouterLink>
                  </li>
                ) : (
                  ''
                )}
                {/* ?????????? */}

                {/* ?????????????????? */}
                {dataAccount?.IDposition?.ID === 3 ||
                dataAccount?.IDposition?.ID === 1 ? (
                  <li>
                    <RouterLink to='storehouse'>??????????</RouterLink>
                  </li>
                ) : (
                  ''
                )}

                {dataAccount?.IDposition?.ID === 3 ||
                dataAccount?.IDposition?.ID === 1 ? (
                  <li>
                    <RouterLink to='records'>?????????????? ??????????</RouterLink>
                  </li>
                ) : (
                  ''
                )}

                {dataAccount?.IDposition?.ID === 3 ||
                dataAccount?.IDposition?.ID === 1 ? (
                  <li>
                    <RouterLink to='filling-list'>
                      ?????????????????????? ??????????????????
                    </RouterLink>
                  </li>
                ) : (
                  ''
                )}
                {/* ?????????????????? */}

                {/* ???????????????? */}
                {dataAccount?.IDposition?.ID === 4 ||
                dataAccount?.IDposition?.ID === 1 ? (
                  <li>
                    <RouterLink to='vehiclework'>
                      ???????????? ?? ??????????????????????
                    </RouterLink>
                  </li>
                ) : (
                  ''
                )}
                {/* ???????????????? */}
              </ul>
            </nav>
          </div>

          <div className='header__right'>
            <button
              className='header-dashboard'
              onClick={() => {
                setLoadSpinerActive(true);

                new Toast({
                  title: '????????????',
                  text: `???? ?????????? ???? ????????????????`,
                  theme: 'info',
                  autohide: true,
                  interval: 2000,
                });

                setDataAccount(null);
                Cookies.remove('GSM_DIPLOM_COOKIES_JWT');

                setTimeout(() => {
                  window.location.href = `/`;
                }, 2000);
              }}
            >
              ??????????
            </button>
          </div>
        </div>
      </header>

      <main className='main'>
        <div className='central-container'>
          <Routes>
            <Route path='*' element={<DashboardNotFound />} />

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
                  fillingListItems={fillingListItems}
                />
              }
            />

            {/* ?????????? */}
            <Route
              path='autobase'
              element={
                <AutoBaseComponent
                  allAutoBase={allAutoBase}
                  setStatusMountCreateAutoBase={setStatusMountCreateAutoBase}
                  setStatusMountChangeAutoBase={setStatusMountChangeAutoBase}
                  setStatusMountRemoveAutoBase={setStatusMountRemoveAutoBase}
                  dataAccount={dataAccount}
                />
              }
            />

            <Route
              path='types-gsm'
              element={
                <TypesGSMComponent
                  typesGSM={typesGSM}
                  setStatusMountCreateTypeGSM={setStatusMountCreateTypeGSM}
                  setStatusMountChangeTypeGSM={setStatusMountChangeTypeGSM}
                  setStatusMountRemoveTypeGSM={setStatusMountRemoveTypeGSM}
                  dataAccount={dataAccount}
                />
              }
            />

            <Route
              path='vehicles'
              element={
                <VehiclesComponent
                  allVehicles={allVehicles}
                  setStatusMountCreateVehicle={setStatusMountCreateVehicle}
                  setStatusMountChangeVehicle={setStatusMountChangeVehicle}
                  setStatusMountRemoveVehicle={setStatusMountRemoveVehicle}
                  dataAccount={dataAccount}
                />
              }
            />

            <Route
              path='accounts'
              element={
                <WorkerAccountComponent
                  allAccounts={allAccounts}
                  setStatusMountCreateWorkerAccount={
                    setStatusMountCreateWorkerAccount
                  }
                  setStatusMountChangeWorkerAccount={
                    setStatusMountChangeWorkerAccount
                  }
                  setStatusMountRemoveWorkerAccount={
                    setStatusMountRemoveWorkerAccount
                  }
                  dataAccount={dataAccount}
                />
              }
            />
            {/* ?????????? */}

            {/* ?????????????????? */}
            <Route
              path='storehouse'
              element={
                <StoreHouseComponent
                  storeHouseItems={storeHouseItems}
                  setStatusMountCreateStoreHouseItem={
                    setStatusMountCreateStoreHouseItem
                  }
                  setStatusMountChangeStoreHouseItem={
                    setStatusMountChangeStoreHouseItem
                  }
                  setStatusMountRemoveStoreHouseItem={
                    setStatusMountRemoveStoreHouseItem
                  }
                  dataAccount={dataAccount}
                />
              }
            />

            <Route
              path='records'
              element={
                <RecordsComponent
                  allRecords={allRecords}
                  setStatusMountCreateRecord={setStatusMountCreateRecord}
                  setStatusMountClosedRecord={setStatusMountClosedRecord}
                  setStatusMountRemoveRecord={setStatusMountRemoveRecord}
                  dataAccount={dataAccount}
                />
              }
            />

            <Route
              path='filling-list'
              element={
                <FillingListComponent
                  fillingListItems={fillingListItems}
                  setStatusMountCreateItemFillingList={
                    setStatusMountCreateItemFillingList
                  }
                  setStatusMountClosedFillingList={
                    setStatusMountClosedFillingList
                  }
                  dataAccount={dataAccount}
                />
              }
            />
            {/* ?????????????????? */}

            {/* ???????????????? */}
            <Route
              path='vehiclework'
              element={
                <VehicleWorkComponent
                  myVehicles={myVehicles}
                  setStatusMountActionFuelingProcess={
                    setStatusMountActionFuelingProcess
                  }
                  dataAccount={dataAccount}
                />
              }
            />
            {/* ???????????????? */}
          </Routes>
        </div>
      </main>

      <FooterComponent />
    </div>
  );
};

export default Dashboard;
