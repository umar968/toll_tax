const { default: mongoose } = require("mongoose");
const { findOneAndUpdate } = require("../models/Vehicles");
const Vehicle = require("../models/Vehicles");

// Calculate cost without distance
// When a vehicle is entered check if it has already been added and has not exited
// check if a vehicle has already existed record then while exiting it should not change to prev record
//

exports.getAllVehicles = async (req, res) => {
  const vehicles = await Vehicle.find();
  res.status(200).json({
    status: "success",
    vehicles,
  });
};

exports.enterVehicle = async (req, res) => {
  try {
    // If already entered and exited OK
    // If already entered and not exited False

    const vehicleTemp = await Vehicle.find({
      numberPlate: req.body.numberPlate,
    });

    if (vehicleTemp.length) {
      // Prev Record found
      const vehicleWithOutExit = vehicleTemp.filter(
        (val) => val.exitPoint === ""
      );

      if (vehicleWithOutExit.length) {
        // Prev record and has not exited road yet
        return res.status(200).json({
          status: "error",
          message:
            "A vehicle record exist in which it has entered not exited motorway",
        });
      }
    }
    // No prev record
    const newVehicle = req.body;
    newVehicle["exitPoint"] = "";
    newVehicle["cost"] = 0;
    const vehicle = await Vehicle.create(newVehicle);
    return res.status(201).json({
      status: "success",
      message: "",
      vehicle,
    });
  } catch (err) {
    res.status(404).json({
      status: "failure",
    });
  }
};

exports.exitVehicle = async (req, res) => {
  const vehicle = await Vehicle.find({ numberPlate: req.body.numberPlate });
  if (!vehicle.length) {
    return res.status(200).json({
      status: "error",
      message: "Cannot find the vehicle with this number plate",
    });
  }

  const tempVehicle = vehicle.filter((val) => val.exitPoint === "")[0];

  if (typeof tempVehicle === "undefined") {
    return res.status(200).json({
      status: "error",
      message: "Vehicle has already exited. You cannot exit twice",
    });
  }
  tempVehicle.exitPoint = req.body.exitPoint;
  // Here cal distance b/w entry and exit

  distance =
    Math.abs(
      tempVehicle.exitPoint.charCodeAt(0) - tempVehicle.entryPoint.charCodeAt(0)
    ) * 20;
  tempVehicle.cost = 20 + Number(distance) * 0.2;
  // Check the day and then multiply the cost
  /////////////////////////
  // special day discount and
  let date = new Date();
  let dayOfWeek = date.getDay();

  // weekend double charges
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    tempVehicle.cost *= 1.5;
  }

  /////////////////////////
  const temp = await Vehicle.findOneAndUpdate(tempVehicle._id, tempVehicle, {
    new: true,
  }).exec();
  res.status(200).json({
    status: "success",
    message: "Exited Successfully",
    vehicle: temp,
  });
};
