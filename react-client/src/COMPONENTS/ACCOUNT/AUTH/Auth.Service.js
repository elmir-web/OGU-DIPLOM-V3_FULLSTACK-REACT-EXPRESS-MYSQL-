const { URL_BACKEND } = require("./../../../CONFIG.json");

const AuthService = async ({ loginUser, passwordUser }) => {
  let responseFetch = await fetch(`${URL_BACKEND}/api/account/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      LoginUser: loginUser,
      PasswordUser: passwordUser,
    }),
  });

  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  return { ok, status, responseFetch };
};

export default AuthService;
