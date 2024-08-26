const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    // checking if the user exist or not
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(201).send({
        message: "User already Exist",
        success: false,
      });
    }
    // hasing the password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;

    // creating a new user

    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      document: req.file.buffer,
      ContentType: req.file.mimetype,
      docName: req.file.originalname,
    });

    // saving the user detail in the database

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      message: "USer created successfully",
      success: true,
      token: token,
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
      success: false,
    });
  }
};

const user = async (req, res) => {
  try {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
      const { userId } = jwt.verify(token, process.env.SECRET);
      const data = await userModel.findById(userId).select("-password");
      return res.status(201).send({
        message: "Validation successfull",
        success: true,
        data: data,
      });
    }
  } catch (error) {
    res.status(401).send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { signup, user };
