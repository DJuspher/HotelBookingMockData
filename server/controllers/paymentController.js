import Xendit from "xendit-node";
import dotenv from "dotenv";
dotenv.config();

export const createInvoice = async (req, res) => {
  try {
    const { name, email, amount } = req.body;

    console.log("Payment Request Received:", req.body);

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const xenditClient = new Xendit({
      secretKey: process.env.XENDIT_SECRET_KEY,
    });

    const invoiceClient = new xenditClient.Invoice({});

    const invoice = await invoiceClient.createInvoice({
      externalID: "invoice-" + Date.now(),
      payerEmail: email,
      description: `Reservation payment for ${name}`,
      amount: Number(amount),
      successRedirectURL: "http://localhost:5174/success",
      failureRedirectURL: "http://localhost:5174/failed",
    });

    return res.json({
      success: true,
      invoice_url: invoice.invoice_url,
    });

  } catch (error) {
    console.error("Xendit ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create invoice",
    });
  }
};
