import Cookies from 'js-cookie';
const { URL_BACKEND } = require('../../../../../CONFIG.json');

const ActionFuelingProcessService = async (
  dashboardComponentMount,
  {
    fillingListCurrentVeh,
    liters,
    statusMountActionFuelingProcess,
    thisItemStoreHouse,
  }
) => {
  const tempThisFillingList = JSON.parse(JSON.stringify(fillingListCurrentVeh));
  const tempThisVehicle = JSON.parse(
    JSON.stringify(statusMountActionFuelingProcess)
  );
  const tempThisLiter = Number(liters);
  const tempThisItemStoreHouse = JSON.parse(JSON.stringify(thisItemStoreHouse));

  ////////////////////////////////////////

  if (
    tempThisLiter + Number(tempThisFillingList.UsedLiters) >
    Number(tempThisFillingList.Liters)
  )
    return {
      ok: false,
      status: 400,
      responseFetch: `Вы не можете заправить больше чем вам положено подписантом!`,
    };

  if (tempThisLiter > Number(tempThisItemStoreHouse.Liters))
    return {
      ok: false,
      status: 400,
      responseFetch: `На складе нет столько топлива типа "${tempThisItemStoreHouse.IDtypegsm.Name}"`,
    };

  tempThisFillingList.UsedLiters =
    Number(tempThisFillingList.UsedLiters) + tempThisLiter;
  tempThisFillingList.IDrecord = tempThisFillingList.IDrecord.ID;

  tempThisItemStoreHouse.Liters =
    Number(tempThisItemStoreHouse.Liters) - tempThisLiter;
  tempThisItemStoreHouse.IDtypegsm = tempThisItemStoreHouse.IDtypegsm.ID;

  tempThisVehicle.Liters = Number(tempThisVehicle.Liters) + tempThisLiter;
  tempThisVehicle.IDautobase = tempThisVehicle.IDautobase.ID;
  tempThisVehicle.IDtypegsm = tempThisVehicle.IDtypegsm.ID;

  ////////////////////////////////////////

  console.log(`Заправочная ведомость на авто`, tempThisFillingList);
  console.log(`liters`, liters);

  // tempThisItemStoreHouse отправить на сервак склад
  // tempThisVehicle отправить на сервак машину

  dashboardComponentMount();
};

export default ActionFuelingProcessService;
