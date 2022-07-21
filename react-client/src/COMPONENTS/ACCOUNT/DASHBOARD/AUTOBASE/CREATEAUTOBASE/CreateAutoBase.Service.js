import Cookies from "js-cookie";
const { URL_BACKEND } = require("./../../../../../CONFIG.json");

const CreateAutoBaseService = async (
  dashboardComponentMount,
  { nameAutoBase }
) => {
  const tempUserAuthCookie = Cookies.get("GSM_DIPLOM_COOKIES_JWT");

  let responseFetch = await fetch(`${URL_BACKEND}/api/auto-base/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tempUserAuthCookie}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Name: nameAutoBase,
    }),
  });

  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  dashboardComponentMount();

  return { ok, status, responseFetch };
};

export default CreateAutoBaseService;
