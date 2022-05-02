import { NextFunction, Request, Response } from "express";

export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.NX_BACKEND_ALLOWED_HOSTS,
  );
  next();
};
