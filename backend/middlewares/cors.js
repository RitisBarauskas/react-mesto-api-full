const allowedCors = [
  "https://praktikum.tk",
  "http://praktikum.tk",
  "localhost:3000",
  "https://mesto.website",
  "http://mesto.website",
  "https://mesto.website",
  "84.201.167.129"
];

const defaultCors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers["access-control-request-headers"];
  // if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", "*");
  // }
  // if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
  // }
  next();
};

module.exports = {
  defaultCors,
};
