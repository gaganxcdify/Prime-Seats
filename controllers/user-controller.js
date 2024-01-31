import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return next(err);
  }
  if (!users) {
    return res.status(500).json({ message: "unexpected error" });
  }
  return res.status(200).json({ users });
};

export const postSignupUser = async (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (
    !firstName &&
    firstName.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === "" &&
    !phone
  ) {
    return res.status(422).json({ message: "Invalid User" });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  let user;
  try {
    user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword, 
    });
    user = await user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(422).json({ message: "Invalid user" });
  }
  return res.status(201).json({ user });
};
 
export const updateUser = async (req, res, next)=>{
  const id = req.params.id;
  

}