import Cookies from 'js-cookie';
import moment from 'moment';

const { URL_BACKEND } = require('../../../../../CONFIG.json');

const CreateRecordService = async (
  dashboardComponentMount,
  { number, idVehicle, idDriver },
  { allVehicles, dataAccount }
) => {
  const tempUserAuthCookie = Cookies.get('GSM_DIPLOM_COOKIES_JWT');

  let tempThisVehicle = null;

  for (let i = 0; i < allVehicles.length; i++) {
    if (allVehicles[i].ID === Number(idVehicle)) {
      tempThisVehicle = allVehicles[i];
    }
  }

  let responseFetch = await fetch(`${URL_BACKEND}/api/record/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tempUserAuthCookie}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Number: number,
      RecordStatus: 1,
      DateOpen: moment(new Date()).format('YYYY-MM-DD'),
      DateClose: null,
      KilometrsOpen: tempThisVehicle.Kilometrs,
      KilometrsClose: null,
      UsedLiters: 0,
      IDvehicle: tempThisVehicle.ID,
      IDtypegsm: tempThisVehicle.IDtypegsm.ID,
      IDsigner: dataAccount.ID,
      IDdriver: idDriver,
      IDautobase: tempThisVehicle.IDautobase.ID,
    }),
  });

  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  dashboardComponentMount();

  return { ok, status, responseFetch };
};

export default CreateRecordService;
