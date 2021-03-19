import express from 'express';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";

import productRoutes from "./services/product.service.js";
import userRoutes from "./services/user.service.js";
import {errorHandler, notFound} from "./middleware/error.middleware.js";

dotenv.config()

connectDB()

const app = express();

app.use(express.json()) //accept json at body

app.get('/', (req, res) => {
  res.send('API WORKING')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
