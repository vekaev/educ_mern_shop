import express from 'express';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";

import productRoutes from "./routes/productRoutes.js";
import {errorHandler, notFound} from "./middleware/error.middleware.js";

dotenv.config()

connectDB()

const app = express();

app.get('/', (req, res) => {
  res.send('API GO')
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
