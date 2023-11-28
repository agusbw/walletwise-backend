import express, { Express } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import publicRouter from "./router/public-api";
import errorMiddleware from "./middleware/error-middleware";
import userRouter from "./router/protected-api";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(helmet());
app.use(cors());
app.disable("x-powered-by");
app.use(express.json());

app.use(publicRouter);
app.use(userRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
