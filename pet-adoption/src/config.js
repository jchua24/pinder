// started code taken directly from lecture content @:
// https://github.com/csc309-winter-2021/react-express-authentication/blob/master/client/src/config.js

const prod = {
  env: "production",
  api_host: "",
};
const dev = {
  env: "development",
  api_host: "http://localhost:5000", // web server localhost port
};

export default process.env.NODE_ENV === "production" ? prod : dev;
