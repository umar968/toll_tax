const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  numberPlate: {
    type: String,
    maxLength: 7,
  },
  entryPoint: {
    type: String,
  },
  exitPoint: {
    type: String,
  },
  cost: {
    type: Number,
  },
});

const vehicleModel = mongoose.model("Vehicle", vehicleSchema);

module.exports = vehicleModel;
