import { NextFunction, Response, Request } from "express";
import { responseHandler } from "./responseHandler";
import { sendSlackMessage } from "./slack";
import { githubReply } from "./webhooks/github";

export default (app: any) => {
  app.get("/", (_req: Request, res: Response, _next: NextFunction) => {
    res.send("Prend ce message ce au le centre se levant!");
  });

  app.post(
    "/github",
    async (req: Request, _res: Response, next: NextFunction) => {
      try {
        await githubReply(req.body);
        return next();
      } catch (error) {
        return next(error);
      }
    },
    responseHandler
  );

  app.post(
    "/custom",
    async (req: Request, _res: Response, next: NextFunction) => {
      try {
        const { text, channel, icon_url, username } = req.body;
        await sendSlackMessage({
          text,
          channel,
          icon_url,
          username,
        });
        return next();
      } catch (error) {
        return next(error);
      }
    },
    responseHandler
  );

  app.use(
    (
      error: { status: any; message: any },
      _req: any,
      res: Response,
      next: NextFunction
    ) => {
      if (error) {
        return res.status(error.status || 500).json({ message: error.message });
      }
      return next();
    }
  );
};
