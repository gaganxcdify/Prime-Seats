// import crypto from 'crypto';
// import axios from 'axios';
// const salt_key = (process.env.SALT_KEY)
// const merchant_id = (process.env.MERCHANT_ID)
// const newPayment = async (req, res) => {
//     try {
//         const merchantTransactionId = req.body.transactionId;
//         const data = {
//             merchantId: merchant_id,
//             merchantTransactionId: merchantTransactionId,
//             merchantUserId: req.body.MUID,
//             name: req.body.name,
//             mobileNumber: req.body.number,
//             amount: req.body.amount * 100,
//             redirectUrl: `http://localhost:5000/payment/status/${merchantTransactionId}`,
//             redirectMode: 'POST',
//             paymentInstrument: {
//                 type: 'PAY_PAGE'
//             }
//         };
//         console.log(data)
//         const payload = JSON.stringify(data);
//         const payloadMain = Buffer.from(payload).toString('base64');
//         const keyIndex = 1;
//         const string = payloadMain + '/pg/v1/pay' + salt_key;
//         const sha256 = crypto.createHash('sha256').update(string).digest('hex');
//         const checksum = sha256 + '###' + keyIndex;

//         const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
//         const options = {
//             method: 'POST',
//             url: prod_URL,
//             headers: {
//                 accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 'X-VERIFY': checksum
//             },
//             data: {
//                 "request": payloadMain
//             }
//         };

//         const response = await axios.request(options);
//         console.log(response.data);
//         return res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             message: error.message,
//             success: false
//         });
//     }
// };






// const checkStatus = async (req, res) => {
//     try {
//         const merchantTransactionId = res.req.body.transactionId;
//         const merchantId = res.req.body.merchantId;

//         const keyIndex = 1;
//         const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
//         const sha256 = crypto.createHash('sha256').update(string).digest('hex');
//         const checksum = sha256 + "###" + keyIndex;

//         const options = {
//             method: 'GET',
//             url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
//             headers: {
//                 accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 'X-VERIFY': checksum,
//                 'X-MERCHANT-ID': `${merchantId}`
//             }
//         };

//         const response = await axios.request(options);
//         if (response.data.success === true) {
//             const url = `http://localhost:3000/success`;
//             return res.redirect(url);
//         } else {
//             const url = `http://localhost:3000/failure`;
//             return res.redirect(url);
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             message: error.message,
//             success: false
//         });
//     }
// };

// export { newPayment, checkStatus };
