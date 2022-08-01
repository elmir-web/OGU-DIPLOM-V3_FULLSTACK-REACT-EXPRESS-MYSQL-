import Cookies from 'js-cookie';
import moment from 'moment';

const { URL_BACKEND } = require('../../../../../CONFIG.json');

const ClosedRecordService = async (
  dashboardComponentMount,
  { statusMountClosedRecord },
  { kilometersTraveled, consumptionOneKilometr }
) => {
  const tempUserAuthCookie = Cookies.get('GSM_DIPLOM_COOKIES_JWT');

  let responseFetch = await fetch(`${URL_BACKEND}/api/record/change`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${tempUserAuthCookie}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ID: statusMountClosedRecord.ID,
      Number: statusMountClosedRecord.Number,
      RecordStatus: 2,
      DateOpen: moment(statusMountClosedRecord.DateOpen).format('YYYY-MM-DD'),
      DateClose: moment(new Date()).format('YYYY-MM-DD'),
      KilometrsOpen: statusMountClosedRecord.KilometrsOpen,
      KilometrsClose: statusMountClosedRecord.IDvehicle.Kilometrs,
      UsedLiters: kilometersTraveled * consumptionOneKilometr,
      IDvehicle: statusMountClosedRecord.IDvehicle.ID,
      IDtypegsm: statusMountClosedRecord.IDtypegsm.ID,
      IDsigner: statusMountClosedRecord.IDsigner.ID,
      IDdriver: statusMountClosedRecord.IDdriver.ID,
      IDautobase: statusMountClosedRecord.IDautobase.ID,
    }),
  });

  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  dashboardComponentMount();

  return { ok, status, responseFetch };
};

export default ClosedRecordService;
