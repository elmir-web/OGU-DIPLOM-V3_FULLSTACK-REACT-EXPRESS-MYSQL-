import Cookies from 'js-cookie';
const { URL_BACKEND } = require('./../../../CONFIG.json');

const AuthService = async ({ loginUser, passwordUser }, setDataAccount) => {
  let responseFetch = await fetch(`${URL_BACKEND}/api/account/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      LoginUser: loginUser,
      PasswordUser: passwordUser,
    }),
  });

  console.log(responseFetch);

  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  Cookies.set('GSM_DIPLOM_COOKIES_JWT', responseFetch.JWT);

  setDataAccount(responseFetch.account);

  return { ok, status, responseFetch };
};

export default AuthService;
