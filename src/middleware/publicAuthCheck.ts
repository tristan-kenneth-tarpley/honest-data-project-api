export const cors = require("cors");
const corsOptions = {
  origin:
    process.env.ENV === "development"
      ? "http://localhost:3000"
      : "https://honestdata.world",
  optionsSuccessStatus: 200,
};

module.exports = () => cors(corsOptions);
