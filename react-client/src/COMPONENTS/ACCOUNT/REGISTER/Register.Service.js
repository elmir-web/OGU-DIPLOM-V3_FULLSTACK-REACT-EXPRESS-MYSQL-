const { URL_BACKEND } = require("./../../../CONFIG.json");

const RegisterService = async ({
  surName,
  name,
  middleName,
  loginUser,
  passwordUser,
}) => {
  let responseFetch = await fetch(`${URL_BACKEND}/api/account/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer system.system.system`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      SurName: surName,
      Name: name,
      MiddleName: middleName,
      LoginUser: loginUser,
      PasswordUser: passwordUser,
      IDautobases: 1,
      IDposition: 5,
    }),
  });

  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  return { ok, status, responseFetch };
};

export default RegisterService;
