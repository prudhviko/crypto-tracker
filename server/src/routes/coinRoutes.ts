import { Router } from "express";
import { getCoins, saveHistory } from "../controllers/coinController";

const router = Router();

router.get("/coins", getCoins);
router.post("/history", saveHistory);

export default router;
