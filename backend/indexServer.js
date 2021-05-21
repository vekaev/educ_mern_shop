import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";

import productRoutes from "./controllers/product.controller.js";
import userRoutes from "./controllers/user.controller.js";
import orderRoutes from "./controllers/order.controller.js";
import uploadRoutes from "./controllers/upload.controller.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json()); //accept json at body

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.use("/api/products", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
