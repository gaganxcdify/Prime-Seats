import User from "../models/User.js";
import bcrypt from 'bcryptjs';



export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find()
    } catch (err) {
        return next(err);
    }
    if (!users) {
        return res.status(500).json({ message: "unexpected Error Occcured" });
    }

    return res.status(200).json({ users })
}






export const Signup = async (req, res, next) => {
    const { first_name, last_name, email, password, contact_number, is_active, is_deleted } = req.body;
    if (
        !first_name &&
        first_name.trim() === "" &&
        !last_name &&
        last_name.trim() === "" &&
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === "" &&
        !contact_number &&
        contact_number.trim() === ""
    ) {
        return res.status(422).json({ message: "Invalid Inputs" })
    }

    const hashedPassword = bcrypt.hashSync(password);
    let users;
    try {
        users = new User({ first_name, last_name, email, password: hashedPassword, contact_number, is_active, is_deleted });
        users = await users.save();
    } catch (err) {
        return console.log(err);
    }
    if (!users) {
        return res.status(500).json({ message: "unexpected Error Occcured" });
    }
    return res.status(201).json({ users: users });
};






export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { first_name, last_name, email, password, contact_number, is_active, is_deleted } = req.body;
    if (
        !first_name &&
        first_name.trim() === "" &&
        !last_name &&
        last_name.trim() === "" &&
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === "" &&
        !contact_number &&
        contact_number.trim() === ""
    ) {
        return res.status(422).json({ message: "Invalid Inputs" })
    }
    let user;
    try {
        user = await User.findByIdAndUpdate(id, { first_name, last_name, email, password, contact_number, is_active, is_deleted })
    } catch (err) {
        return console.log(err)
    }
    if (!user) {
        return res.status(500).json({ message: "Something went wrong" })
    }
    res.status(200).json({ message: "Updated successfully" })
}




export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndUpdate(id, { is_deleted: true });
    } catch (err) {
        return console.log(err)
    }
    if (!user) {
        return res.status(500).json({ message: "Something went wrong" });
    }
    return res.status(200).json({ message: "User Deleted successfully" })
}



export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === ""
    ) {
        return res.ststus(422).json({ message: "Invalid Inputs" })
    }

    let existingUSer;
    try {
        existingUSer = await User.findOne({ email });
    } catch (err) {
        return console.log(err)
    }
    if (!existingUSer) {
        {
            return res.status(404).json({ message: "Unable to find user fromthis ID" })
        }
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUSer.password)

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: " Incorrect Password" })

    }
    return res.status(200).json({ message: 'login successful' })
}