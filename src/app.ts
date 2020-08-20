require("dotenv").config();

const express = require("express");
const config = require("./config");
export const app = express();

import clients from "./apiClients";

require("./models").connect(config.dbUri);

const PORT = process.env.PORT || 5000;
const { publicAuthCheck } = require("./middleware");

app.get("/", publicAuthCheck(), async (req, res) => {
  res.send("hello world");
});

app.get("/environment", publicAuthCheck(), (req, res) => {
  res.status(200).send(`Environment: ${process.env.ENV}`);
});

app.get("/status", publicAuthCheck(), (req, res) => {
  res.status(200).json({
    status: 200,
    message: "You're all ready!",
  });
});

app.get("/available_endpoints", publicAuthCheck(), (req, res) => {
  const _clients = Object.keys(clients).map((c) => ({
    uid: clients[c].uid,
    name: clients[c].name,
    endpoint: clients[c].endpoint,
    description: clients[c].description,
    source: clients[c].source,
  }));
  res.status(200).json(_clients);
});

app.use("/src", publicAuthCheck());
app.use("/src", require("./routes/publicSrcRoutes"));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
