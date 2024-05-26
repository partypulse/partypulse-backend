const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Category = require("../models/Category");
const getUsers = async (request, response) => {
  try {
    const data = await User.find({});

    return response.status(200).json(data);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
};
const getProducts = async (request, response) => {
  try {
    const products = await Product.find()
      .populate("mainCategory")
      .populate("subCategory");

    return response.status(200).json(products);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
};
const getOrders = async (request, response) => {
  try {
    const data = await Order.find({});

    return response.status(200).json(data);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
};
const getCategories = async (request, response) => {
  try {
    const data = await Category.find({});

    return response.status(200).json(data);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
};
module.exports = { getCategories, getOrders, getUsers, getProducts };
