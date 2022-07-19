const jwt = require(`jsonwebtoken`);
const axios = require(`axios`);

const {
  SERVER_WORKING_ON_ADRESS,
  SERVER_START_ON_PORT,
  SERVER_SECRET_KEY,
} = require(`./../ServerConfig.json`);

module.exports = function (roles) {
  return async function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" });
      }

      if (token === `system.system.system`) {
        return next();
      }

      const decodedData = jwt.verify(token, SERVER_SECRET_KEY);

      const getWorker = await axios.get(
        `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/position/get/${decodedData.IDposition}`,
        {
          headers: {
            Authorization: `Bearer system.system.system`,
          },
        }
      );

      let hasRole = false;

      for (let index = 0; index < roles.length; index++) {
        if (getWorker.data.Name === roles[index]) {
          hasRole = true;
          break;
        }
      }

      if (!hasRole) {
        return res.status(403).json({ access: false, message: "Нет доступа" });
      }

      req.userData = decodedData;

      next();
    } catch (err) {
      console.log(err);

      res
        .status(403)
        .json({ access: false, message: `Пользователь не авторизован` });
    }
  };
};
