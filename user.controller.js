const { User } = require("../models");

const userController = {};

userController.list_all_enabled = async (req, res) => {
  try {
    const users = await User.find({
      disabled: false,
    }).lean();
    res.status(200).json({
      success: true,
      data: users,
      message: "Success",
    });
    /*
      En caso de tener 5000 usuarios
      ¿Que implementarias para optimizar la consulta?
    */
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: error,
    });
  }
};

module.exports = userController;
