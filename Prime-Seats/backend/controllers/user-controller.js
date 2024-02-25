import User from "../models/User.js";
// import Booking from "../models/Bookings.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


export const getUserByEmail = async (req, res, next) => {
    const { email } = req.query;

    let user;
    try {
        user = await User.findOne({ email });
    } catch (err) {
        return console.log(err)
    }
    if (!user) {
        {
            return res.status(404).json({ message: "customer not found!, Signup please" })
        }
    }
    return res.status(200).json({ user })
}
































































// export const getAllUsers = async (req, res, next) => {
//     let users;
//     try {
//         users = await User.find()
//     } catch (err) {
//         return next(err);
//     }
//     if (!users) {
//         return res.status(500).json({ message: "unexpected Error Occcured" });
//     }

//     return res.status(200).json({ users })
// }


export const customerLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === ""
    ) {
        return res.status(422).json({ message: "Invalid Inputs" })
    }

    let existingcustomer;
    try {
        existingcustomer = await User.findOne({ email });
    } catch (err) {
        return console.log(err)
    }
    if (!existingcustomer) {
        {
            return res.status(404).json({ message: "customer not found!, Signup please" })
        }
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingcustomer.password)

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: " Incorrect Password" })

    }
    // const token = jwt.sign({ id: existingcustomer.id }, process.env.SECRET_KEY, {
    //     expiresIn: "7d",
    // });
    // res.cookie(String(existingcustomer.id), token, {
    //     path: '',
    //     expires: new Date(Date.now() + 1000 * 30),
    //     httpOnly: true,
    //     sameSite: "lax"
    // });s
    const token = jwt.sign({ id: existingcustomer.id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
    });


    return res.status(200).json({ message: 'customer login successful', auth: token, id: existingcustomer._id })
}


// export const updatecustomer = async (req, res, next) => {
//     const id = req.params.id;
//     const { first_name, last_name, email, password, contact_number, is_active, is_deleted } = req.body;
//     if (
//         !first_name &&
//         first_name.trim() === "" &&
//         !last_name &&
//         last_name.trim() === "" &&
//         !email &&
//         email.trim() === "" &&
//         !password &&
//         password.trim() === "" &&
//         !contact_number &&
//         contact_number.trim() === ""
//     ) {
//         return res.status(422).json({ message: "Invalid Inputs" })
//     }
//     let user;
//     try {
//         user = await User.findByIdAndUpdate(id, { first_name, last_name, email, password, contact_number, is_active, is_deleted })
//     } catch (err) {
//         return console.log(err)
//     }
//     if (!user) {
//         return res.status(500).json({ message: "Something went wrong" })
//     }
//     res.status(200).json({ message: "Updated successfully" })
// }



export const deletecustomer = async (req, res, next) => {
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
    return res.status(200).json({ message: "user Deleted successfully" })
}







// export const verifyToken = (req, res, next) => {
//     const cookies = req.headers.cookie;
//     // console.log(cookies);
//     const extractedToken = cookies.split("=")[1];
//     console.log(extractedToken);
//     if (!extractedToken) {
//         return res.status(404).json({ message: "No token found" })
//     }
//     jwt.verify(extractedToken, process.env.SECRET_KEY, (err, customer) => {
//         if (err) {
//             return res.status(400).json({ message: "Invalid Token" });
//         } else {
//             req.id = customer.id;
//         }
//     });
//     next();
// }



export const getcustomerById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if (!user) {
        return res.status(500).json({ message: "Unexpected Error Occured" });
    }
    return res.status(200).json({ user });
};





// export const getBookingOfcustomer = async (req, res, next) => {
//     const id = req.params.id;
//     let booking;
//     try {
//         booking = await Booking.find({ customer: id })
//     } catch (err) {
//         return console.log(err);
//     }
//     if (!booking) {
//         return res.status(500).json({ message: "Unable to get bookings" });
//     }
//     return res.status(200).json({ booking })
// }
