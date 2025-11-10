import { Router } from "express";
import * as MasterController from "./controller/menu.controller.js";

const router = Router();

router.post("/items", MasterController.item);
router.post("/groups", MasterController.groups);
router.post("/all", MasterController.AllItems);

export default router;
