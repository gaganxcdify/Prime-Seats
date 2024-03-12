import express from "express";
import stripePackage from "stripe";
const paymentRouter = express.Router();
const stripe = stripePackage(process.env.STRIPE_KEY);


paymentRouter.post("/payment", (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "inr",
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).json(stripeErr);
        } else {
            res.status(200).json(stripeRes);
        }
        // console.log(req.body.tokenId, req.body.amount)
    })
})


export default paymentRouter;