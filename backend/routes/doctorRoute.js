import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctors,
} from "../controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./reviewRoute.js";

const router = express.Router();

// Nested Route
router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctors);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);

export default router;
