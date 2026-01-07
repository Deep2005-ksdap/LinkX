import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDb } from "./config/db";
import { urlRouter } from "./routes/url.route";
import { errorHandler } from "./middleware/error.middleware";
import { analyticRouter } from "./routes/analytics.route";
import { authRouter } from "./routes/auth.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req: Request, res: Response) => {
//   res.send("hi! it is ur url encoder");
// });

app.use(urlRouter);
app.use(authRouter);
app.use(analyticRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
