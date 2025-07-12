import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import coinRoutes from "./routes/coinRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1", coinRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
