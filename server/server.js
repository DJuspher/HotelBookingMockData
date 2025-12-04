import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentRoutes from "./routes/paymentRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
}));


app.use(express.json());

// payment route
app.use("/api/payment", paymentRoutes);

// reservation route
app.use("/api/reservation", reservationRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Server is connected!" });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
