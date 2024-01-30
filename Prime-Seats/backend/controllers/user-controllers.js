import User from "../models/User.js";

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
    const { first_name, last_name, email, contact_number, is_active, is_deleted, created_at, updated_at } = req.body;
    if (
        !first_name &&
        first_name.trim() === "" &&
        !last_name &&
        last_name.trim() === "" &&
        !email &&
        email.trim() === "" &&
        !contact_number &&
        contact_number.trim() === ""
    ) {
        return res.status(422).json({ message: "Invalid Inputs" })
    }



    let users;
    try {
        users = new User({ first_name, last_name, email, contact_number, is_active, is_deleted, created_at, updated_at });
        users = users.save();
    } catch (err) {
        return console.log(err);
    }
    if (!users) {
        return res.status(500).json({ message: "unexpected Error Occcured" });
    }
    return res.status(201).json({ users });
};