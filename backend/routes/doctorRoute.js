import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctors,
} from "../controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctors);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);

export default router;
