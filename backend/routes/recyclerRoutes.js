import express from "express";
import { getNearbyRecyclers } from "../controllers/recyclerController.js";

const router = express.Router();
router.get("/select-recycler", getNearbyRecyclers);

export default router;
