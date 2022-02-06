import express from "express";
import {
  redirectToAnotherPage,
  addNewPage,
  getAllPages,
} from "../controllers/shortUrl";
const router = express.Router();

router.route("/").get(getAllPages).post(addNewPage);
router.route("/:id").get(redirectToAnotherPage);

export default router;
