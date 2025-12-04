import express from "express";

const router = express.Router();

// MOCK PAYMENT — ALWAYS SUCCESS
router.post("/create", (req, res) => {
  const { name, email, amount } = req.body;

  console.log("Mock payment received:", { name, email, amount });

  // Send back a fake invoice URL (local redirect)
  return res.json({
    invoice_url: "http://localhost:5173/payment-success"
  });
});

export default router;
