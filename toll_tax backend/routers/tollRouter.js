const express = require("express");
const router = express.Router();

const tollController = require("../controllers/tollController");

router.get("/all-vehicles", tollController.getAllVehicles);

router.post("/enter-vehicle", tollController.enterVehicle);

router.patch("/exit-vehicle", tollController.exitVehicle);

module.exports = router;
