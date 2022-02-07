import { Request, Response } from "express";
import Url from "../models/Url";
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/CustomAPIError";
import validUrl from "valid-url";

export const getAllPages = async (_: Request, res: Response) => {
  const allLinks = await Url.find({});
  const nbHits = allLinks.length;

  const listOfLinks = allLinks.map((link) => ({
    original_url: link.linkDomain,
    short_url: link.linkNumber,
  }));

  res.status(StatusCodes.OK).json({ nbHits, listOfLinks });
};

export const addNewPage = async (req: Request, res: Response) => {
  const userLink = req.body.url;

  if (!validUrl.isUri(userLink)) {
    //throw new CustomAPIError("invalid url", StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.OK).json({ error: "invalid url" });
  }

  const linkFromDB = await Url.findOne({
    linkDomain: userLink,
  });
  if (linkFromDB) {
    return res.status(StatusCodes.OK).json({
      original_url: linkFromDB.linkDomain,
      short_url: linkFromDB.linkNumber,
    });
  }

  const numberOfLinks = await Url.countDocuments();
  const newLink = await Url.create({
    linkDomain: userLink,
    linkNumber: numberOfLinks + 1,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ original_url: newLink.linkDomain, short_url: newLink.linkNumber });
};

export const redirectToAnotherPage = async (req: Request, res: Response) => {
  const linkNumber = req.params.id;
  const redirectPage = await Url.findOne({ linkNumber });
  if (!redirectPage) {
    throw new CustomAPIError(
      "No record of such URL in DB",
      StatusCodes.BAD_REQUEST
    );
  }

  res.status(StatusCodes.OK).redirect(redirectPage?.linkDomain);
};
