import { Request, Response } from "express";
import dns from "dns/promises";
import Url from "../models/Url";
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/CustomAPIError";
import { URL } from "url";

export const getAllPages = (req: Request, res: Response) => {
  res.send("get all pages");
};
export const addNewPage = async (req: Request, res: Response) => {
  const userLink = req.body.url;
  const domainName = new URL(userLink);
  try {
    await dns.lookup(domainName.hostname);
  } catch (error) {
    throw new CustomAPIError("invalid url", StatusCodes.BAD_REQUEST);
  }

  res.send("add new page");
};

export const redirectToAnotherPage = (req: Request, res: Response) => {
  res.redirect("https://www.google.com");
};
