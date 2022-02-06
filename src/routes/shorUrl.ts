import express from "express";
import { redirectToAnotherPage, addNewPage } from "../controllers/shortUrl";
const router = express.Router();

router.route("/").get(redirectToAnotherPage).post(addNewPage);
