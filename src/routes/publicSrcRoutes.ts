const express = require("express");
const router = new express.Router();

import clients from "../apiClients";

router.get("/:src", async (req, res) => {
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
        errorMessage: "It's not you, it's me",
      });
    }
  }
});

router.get("/:src/:endpoint", async (req, res) => {
  try {
    const api = new clients[req.params.src].api();
    const _res = await api.router(req.params.endpoint);
    res.json(_res);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      response: 500,
      errorMessage: "It's not you, it's me",
    });
  }
});

module.exports = router;
