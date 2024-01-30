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
    const { first_name, last_name, email, contact_number, is_active, is_deleted } = req.body;
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
        users = new User({ first_name, last_name, email, contact_number, is_active, is_deleted });
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
    const { first_name, last_name, email, contact_number, is_active, is_deleted } = req.body;
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

    let user;
    try {
        user = await User.findByIdAndUpdate(id, { first_name, last_name, email, contact_number, is_active, is_deleted, updated_at })
    } catch (err) {
        return console.log(err)
    }
    if (!user) {
        return res.status(500).json({ message: "Something went weong" })
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
