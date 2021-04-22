import express, { Application } from "express";
import registerRoutes from "./route";

const app: Application = express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

registerRoutes(app);
export { app };
