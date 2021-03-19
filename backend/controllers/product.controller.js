import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler"

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  res.json(product)
})

export {getProducts, getProductById}
