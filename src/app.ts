require("dotenv").config();
import express from "express";
import clients from "./apiClients";

export const cors = require("cors");
export const app = express();
const db = require("./database/config/db");
const PORT = process.env.PORT || 5000;

const connectToDB = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectToDB();

const corsOptions = {
  origin:
    process.env.ENV === "staging"
      ? "http://localhost:3000"
      : "https://honestdata.world",
  optionsSuccessStatus: 200,
};
const errorMessage: string = "It's not you, it's me...";

const test = require("./database/models/test");

app.get("/", cors(corsOptions), async (req, res) => {
  const newTest = await test.create({ name: "hello world!!!" });
  console.log(newTest);
  res.send("It's alive!");
});

app.get("/environment", cors(corsOptions), (req, res) => {
  res.status(200).send(`Environment: ${process.env.ENV}`);
});

app.get("/status", cors(corsOptions), (req, res) => {
  res.status(200).json({
    status: 200,
    message: "You're all ready!",
  });
});

app.get("/available_endpoints", cors(corsOptions), (req, res) => {
  const _clients = Object.keys(clients).map((c) => ({
    uid: clients[c].uid,
    name: clients[c].name,
    endpoint: clients[c].endpoint,
    description: clients[c].description,
    source: clients[c].source,
  }));
  res.status(200).json(_clients);
});

app.get("/src/:src", cors(corsOptions), async (req, res) => {
  try {
    const api = new clients[req.params.src].api();
    const _res = await api.router(api.endpointsKeys[0].key);
    res.json(_res);
  } catch (e) {
    console.log(e);
    if (e instanceof TypeError) {
      res.status(404).json({
        response: 404,
        errorMessage: "Data source not found",
      });
    } else {
      res.status(500).json({
        response: 500,
        errorMessage,
      });
    }
  }
});

app.get("/src/:src/:endpoint", cors(corsOptions), async (req, res) => {
  try {
    const api = new clients[req.params.src].api();
    const _res = await api.router(req.params.endpoint);
    res.json(_res);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      response: 500,
      errorMessage,
    });
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
