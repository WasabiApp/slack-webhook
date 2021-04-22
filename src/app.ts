require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import registerRoutes from "./routes";
import compress from "compression";
import cors from "cors";

const app = express()
  .use(compress())
  .use(cors())
  .set("trust proxy", 1)
  .use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(express.urlencoded({ extended: true }))
  .use(express.json());

registerRoutes(app);
export default app;
