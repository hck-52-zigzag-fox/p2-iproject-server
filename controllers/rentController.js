// const midtransClient = require("midtrans-client");

// class RentController {
//   static async handleMidtrans(req, res, next) {
//     try {
//       let snap = new midtransClient.Snap({
//         isProduction: false,
//         serverKey: "SB-Mid-server-UVAFvVd--FOCIpD6uz_ZfLuF",
//       });

//       let parameter = {
//         transaction_details: {
//           order_id: `TRX ${new Date().getTime()}`,
//           gross_amount: 10000,
//         },
//         credit_card: {
//           secure: true,
//         },
//         customer_details: {
//           first_name: "budi",
//           last_name: "pratama",
//           email: "budi.pra@example.com",
//           phone: "08111222333",
//         },
//       };
//     } catch (err) {
//       next(err);
//     }
//   }
// }

// module.exports = RentController;
