import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "invalid credentials" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already present" });
  }
  let admin;
  const saltRound = 10;
  const salt = bcrypt.genSaltSync(saltRound);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (err) {
    console.log(err);
  }
  if (!admin) {
    return res.status(500).json({ message: "server side error" });
  }
  return res.status(201).json({ admin });
};

export const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "invalid credentials" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );
  if(!isPasswordCorrect){
    return res.status(400).json({message: "incorrect password"})
  }
  const token  = jwt.sign({id: existingAdmin._id}, process.env.SECRET_KEY,{
    expiresIn: "1d",

  })
  return res.status(200).json({message: "Authentication Successful", token, id:existingAdmin._id})
};
        