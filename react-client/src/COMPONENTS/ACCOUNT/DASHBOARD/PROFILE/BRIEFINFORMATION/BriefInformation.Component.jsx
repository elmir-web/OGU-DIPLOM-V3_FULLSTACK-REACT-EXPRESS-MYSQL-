import React from 'react';
import moment from 'moment';
import { MdOutlineFoundation } from 'react-icons/md';
import { FaGasPump, FaWarehouse } from 'react-icons/fa';
import { AiFillCar } from 'react-icons/ai';
import { GrUserWorker } from 'react-icons/gr';
import { RiFileListLine } from 'react-icons/ri';
import { SiGooglesheets } from 'react-icons/si';

import './BriefInformation.Component..scss';

const BriefInformation = ({
  dataAccount,
  allAutoBase,
  allAccounts,
  typesGSM,
  storeHouseItems,
  allVehicles,
  allRecords,
  fillingListItems,
}) => {
  React.useEffect(() => {}, []);

  if (dataAccount?.IDposition?.ID === 2 || dataAccount?.IDposition?.ID === 1)
    return (
      <div className='BriefInformation'>
        <div className='BriefInformation__top'>
          <h2>Статистика</h2>
        </div>
        <div className='BriefInformation__items'>
          <div className='static-item'>
            <MdOutlineFoundation size='50px' />

            <div className='item-info'>
              <div className='item-value'>{allAutoBase.length}</div>
              <div className='item-title'>Автомобильные базы</div>
            </div>
          </div>
          <div className='static-item'>
            <FaGasPump size='50px' />

            <div className='item-info'>
              <div className='item-value'>{typesGSM.length}</div>
              <div className='item-title'>Виды гсм</div>
            </div>
          </div>
          <div className='static-item'>
            <AiFillCar size='50px' />

            <div className='item-info'>
              <div className='item-value'>{allVehicles.length}</div>
              <div className='item-title'>Автомобили</div>
            </div>
          </div>
          <div className='static-item'>
            <GrUserWorker size='50px' />

            <div className='item-info'>
              <div className='item-value'>{allAccounts.length}</div>
              <div className='item-title'>Сотрудники</div>
            </div>
          </div>
          {dataAccount?.IDposition?.ID === 1 ? (
            <div className='static-item'>
              <FaWarehouse size='50px' />

              <div className='item-info'>
                <div className='item-value'>{storeHouseItems.length}</div>
                <div className='item-title'>Элементов на складе</div>
              </div>
            </div>
          ) : (
            ''
          )}
          {dataAccount?.IDposition?.ID === 1 ? (
            <div className='static-item'>
              <RiFileListLine size='50px' />

              <div className='item-info'>
                <div className='item-value'>{allRecords.length}</div>
                <div className='item-title'>путевые листы</div>
              </div>
            </div>
          ) : (
            ''
          )}
          {dataAccount?.IDposition?.ID === 1 ? (
            <div className='static-item'>
              <SiGooglesheets size='50px' />

              <div className='item-info'>
                <div className='item-value'>{fillingListItems.length}</div>
                <div className='item-title'>заправочные ведомости</div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  else if (
    dataAccount?.IDposition?.ID === 3 ||
    dataAccount?.IDposition?.ID === 1
  )
    return (
      <div className='BriefInformation'>
        <div className='BriefInformation__items'>
          <div className='static-item'>
            <FaWarehouse size='50px' />

            <div className='item-info'>
              <div className='item-value'>{storeHouseItems.length}</div>
              <div className='item-title'>Элементов на складе</div>
            </div>
          </div>

          <div className='static-item'>
            <RiFileListLine size='50px' />

            <div className='item-info'>
              <div className='item-value'>{allRecords.length}</div>
              <div className='item-title'>путевые листы</div>
            </div>
          </div>

          <div className='static-item'>
            <SiGooglesheets size='50px' />

            <div className='item-info'>
              <div className='item-value'>{fillingListItems.length}</div>
              <div className='item-title'>заправочные ведомости</div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default BriefInformation;
