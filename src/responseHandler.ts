import { NextFunction, Request, Response } from "express";

const responseHandler = (_req: Request, res: Response, _next: NextFunction) => {
  const response = res.locals.data || { status: "OK" };
  return res.status(res.locals.status || 200).json(response);
};

export { responseHandler };
