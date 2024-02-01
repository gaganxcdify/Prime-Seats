import Admin from "../models/Admin.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


export const AdminSignup = async (req, res, next) => {
    const { email, password, is_active, is_deleted } = req.body;
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email })
    } catch (err) {
        return console.log(err)
    }
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exist" })
    }

    const hashedPassword = bcrypt.hashSync(password);
    let admin;
    try {
        admin = new Admin({ email, password: hashedPassword, is_active, is_deleted });
        admin = await admin.save()
    } catch (err) {
        return console.log(err);
    }
    if (!admin) {
        return res.send(500).json({ message: "Unable to store admin" })
    }
    return res.status(201).json({ admin })
}






export const AdminLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === ""

    ) {
        return res.ststus(422).json({ message: "Invalid Inputs" })
    }

    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });
    } catch (err) {
        return console.log(err)
    }
    if (!existingAdmin) {
        {
            return res.status(400).json({ message: "Unable to find admin from this ID" })
        }
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password)

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: " Incorrect Password" })

    }

    const token = jwt.sign({ id: existingAdmin.id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
    });


    return res.status(200).json({ message: 'login successful', token, id: existingAdmin._id })
}





export const AdminDelete = async (req, res, next) => {
    const _id = req.params.id;
    try {
        const admin = await Admin.findByIdAndUpdate(_id, { is_deleted: true });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json({ message: "Admin deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}






export const AdminUpdate = async (req, res, next) => {
    const id = req.params.id;
    const { email, password, is_active, is_deleted } = req.body;

    if (!email || email.trim() === "" || !password || password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" });
    }

    try {
        const admin = await Admin.findByIdAndUpdate(
            id,
            { email, password, is_active, is_deleted },
            { new: true } // Return the modified document
        );

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ message: "Updated successfully", admin });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// export const AdminDelete = async (req, res, next) => {
//     const _id = req.params.id;
//     let admin;
//     try {
//         admin = await admin.findByIdAndUpdate(_id, { is_deleted: true });
//     } catch (err) {
//         return console.log(err)
//     }
//     if (!admin) {
//         return res.status(500).json({ message: "Something went wrong" });
//     }
//     return res.status(200).json({ message: "admin Deleted successfully" })
// }

export const getAdmin = async (req, res, next) => {
    let admins;
    try {
        admins = await Admin.find()
    } catch (err) {
        return console.log(err);
    }
    if (!admins) {
        return res.status(500).json({ message: "Inter server Error" })
    }
    return res.status(200).json({ admins })
}