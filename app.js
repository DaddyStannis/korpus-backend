import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

import feedbacksRouter from "./routes/feedbackRoutes.js";
import categoriesRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

app.use("/api/feedbacks", feedbacksRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/products", productRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

export default app;
