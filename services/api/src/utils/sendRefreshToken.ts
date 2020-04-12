import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("_euid", token, {
    domain: process.env.DOMAIN,
    secure: true,
    httpOnly: true
  });
};
