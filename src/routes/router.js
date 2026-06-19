import express from "express"
import potionController from "../controllers/potion.controller.js";

const router = express.Router();

router.get("/potions", potionController.findAll);
router.get("/potions/:id", potionController.findById);

router.post("/potions", potionController.create);

router.delete("/potions/:id", potionController.deleteById);

router.put("/potions/:id", potionController.update);

export default router;