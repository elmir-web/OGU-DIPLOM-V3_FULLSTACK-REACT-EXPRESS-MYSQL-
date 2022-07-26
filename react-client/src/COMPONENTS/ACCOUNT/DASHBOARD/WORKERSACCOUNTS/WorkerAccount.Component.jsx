import React, { useEffect } from 'react';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { MdOutlineCreate } from 'react-icons/md';
import Toast from './../../../../Toast';
import { useNavigate } from 'react-router-dom';

import './WorkerAccount.Component.scss';

const WorkerAccount = ({
  allAccounts,
  setStatusMountCreateWorkerAccount,
  setStatusMountChangeWorkerAccount,
  setStatusMountRemoveWorkerAccount,
  dataAccount,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (dataAccount?.IDposition.ID !== 1 && dataAccount?.IDposition.ID !== 2) {
      new Toast({
        title: 'Ошибка получении доступа',
        text: `У вас нет доступа к данному функционалу!`,
        theme: 'danger',
        autohide: true,
        interval: 3000,
      });

      navigate(`/account/dashboard/`);
      return;
    }
  }, []);

  return (
    <div className='WorkerAccount'>
      <button
        className='beautiful-button beautiful-button-green'
        style={{ marginBottom: '50px' }}
        onClick={() => {
          setStatusMountCreateWorkerAccount(true);
        }}
      >
        создать аккаунт сотрудника
      </button>

      <div className='table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Логин</th>
              <th>Пароль</th>
              <th>АвтоБаза</th>
              <th>Роль</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {allAccounts.length ? (
              allAccounts.map((account) => {
                return (
                  <tr key={account.ID}>
                    <td>{account.ID}</td>
                    <td>{account.SurName}</td>
                    <td>{account.Name}</td>
                    <td>{account.MiddleName}</td>
                    <td>{account.LoginUser}</td>
                    <td>{account.PasswordUser}</td>
                    <td>{account.IDautobases.Name}</td>
                    <td>{account.IDposition.Name}</td>
                    <td className='table-buttons'>
                      <button
                        className='table-button beautiful-button-blue'
                        onClick={() => {
                          setStatusMountChangeWorkerAccount(account);
                        }}
                      >
                        <MdOutlineCreate />
                      </button>

                      <button
                        className='table-button beautiful-button-red'
                        onClick={() => {
                          setStatusMountRemoveWorkerAccount(account);
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
                <td colSpan='9'>Аккаунты сотрудников не найдены</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerAccount;
