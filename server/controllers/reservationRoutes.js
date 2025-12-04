import express from "express";
import { handleReservation } from "../controllers/reservationController.js";

const router = express.Router();

router.post("/", handleReservation);

export default router;
