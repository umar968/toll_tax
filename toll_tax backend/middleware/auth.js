const jwt = require("jsonwebtoken");
const User = require("../models/Users");
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: "fail",
        message: "You must login first (Provide JWT)",
      });
    } else {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode._id);
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: `No user found with id ${decode._id}`,
        });
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "You must login first",
    });
  }
};
