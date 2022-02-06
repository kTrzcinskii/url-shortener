import { Request, Response } from "express";
import dns from "dns";
import Url from "../models/Url";
import { StatusCodes } from "http-status-codes";

export const getAllPages = (req: Request, res: Response) => {
  res.send("get all pages");
};
export const addNewPage = (req: Request, res: Response) => {
  const userLink = req.body.url;
  dns.lookup(userLink, (error) => {
    if (error) {
      throw new Error("test");
    }
  });

  res.send("add new page");
};

export const redirectToAnotherPage = (req: Request, res: Response) => {
  res.redirect("https://www.google.com");
};
