import { Request, Response } from "express";

export type GenericGet<ResponseType> = (
  request: Request,
  response: Response<ResponseType>,
) => Response<ResponseType>;
