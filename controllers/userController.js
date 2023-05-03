const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
//login user
const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;
    let user = await userModel.findOne({ userId });
    if (!user) {
      // success = false
      return res
        .status(400)
        .send({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      // success = false
      return res
        .status(400)
        .send({ error: "Please try to login with correct credentials" });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
  }
};

//register user
const registerController = async (req, res) => {
  try {
    let user = await userModel.findOne({ userId: req.body.userId });
    if (user) {
      return res
        .status(400)
        .send({ error: "Sorry a user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const newUser = new userModel({ ...req.body, verified: true });
    await newUser.save();
    res.status(201).send("New User Addeed Sucessfully!");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

module.exports = {
  loginController,
  registerController,
};
