import express from "express";
import {
  redirectToAnotherPage,
  addNewPage,
  getAllPages,
} from "../controllers/shortUrl";
const router = express.Router();

router.route("/shorturl").post(addNewPage);
router.route("/shorturl/:id").get(redirectToAnotherPage);
router.route("/all_urls").get(getAllPages);

export default router;
