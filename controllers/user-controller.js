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

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
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
  const hashSalt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, hashSalt);
  let user;
  try {
    user = await User.findByIdAndUpdate(id,{
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword})
    }catch(err){
      return console.log(err)
    }
    if(!user){
      return res.status(500).json({message: "Server side error"})
    }
    res.status(200).json({message: "user Updated successfully"})
   
};

export const deleteUser = async(req, res, next)=>{
  const id = req.params.id;
  console.log(id)
  let user;
  try{
    user = await User.findByIdAndDelete(id);

  }catch(err){
    return res.status(500).json({message: "server side error"})
  }
  return res.status(200).json({message: "user deleted successfully"})
}

export const loginUser = async (req, res, next)=>{
  const {email, password} = req.body;

  if(!email && email.trim()==="" && !password && password.trim()===""){
    return res.status(422).json({message: "invalid request"})
  }
  let existingUser
  try{
    existingUser = await User.findOne({email})
  }catch(err){
    return res.status(500).json({message: "invalid server side error"})
  }

  const isPasswordCorrect = await   bcrypt.compare(password, existingUser.password)
  if(!isPasswordCorrect){
    return res.status(400).json({message: "password is incorrect"})
  }
  return res.status(200).json({message: "login successfully"})
}