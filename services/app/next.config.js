require("dotenv").config({ path: `${__dirname}/.env` });

module.exports = {
  env: {
    API_URI: process.env.API_URI
  }
};
