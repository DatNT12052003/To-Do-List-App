import express from "express";
import cors from "cors";
import morgan from "morgan";

import { requestLogger } from "./middlewares/requestLogger";
import { errorHandler } from "./middlewares/errorHandler";
import stream from "./utils/stream";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import postRoutes from "./routes/post.route";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined", { stream }));

app.get("/", (req: express.Request, res: express.Response) => {
    throw new Error("Something broke!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use(errorHandler);

export default app;
