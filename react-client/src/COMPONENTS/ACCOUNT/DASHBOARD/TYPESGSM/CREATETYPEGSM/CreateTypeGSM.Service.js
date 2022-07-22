import Cookies from "js-cookie";
const { URL_BACKEND } = require("./../../../../../CONFIG.json");

const CreateTypeGSMService = async (
  dashboardComponentMount,
  { nameTypeGSM, forKiloTypeGSM }
) => {
  const tempUserAuthCookie = Cookies.get("GSM_DIPLOM_COOKIES_JWT");

  let responseFetch = await fetch(`${URL_BACKEND}/api/type-gsm/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tempUserAuthCookie}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Name: nameTypeGSM,
      ForKilo: forKiloTypeGSM,
    }),
  });

  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  dashboardComponentMount();

  return { ok, status, responseFetch };
};

export default CreateTypeGSMService;
