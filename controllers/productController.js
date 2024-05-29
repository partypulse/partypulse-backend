const Product = require("../models/Product");
const Category = require("../models/Category");

// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("mainCategory")
      .populate("subCategory");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.product_id).populate(
      "mainCategory subCategory",
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, image, mainCategory, subCategory, stock, info } =
      req.body;

    // Kontrollera att mainCategory och subCategory är giltiga ObjectId
    if (!mainCategory || !subCategory) {
      return res
        .status(400)
        .json({ message: "Main category and sub category are required" });
    }

    const newProduct = new Product({
      name,
      price,
      image,
      mainCategory,
      subCategory,
      stock,
      info,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, image, mainCategory, subCategory, stock, info } =
      req.body;

    // Kontrollera att mainCategory och subCategory är giltiga ObjectId
    if (!mainCategory || !subCategory) {
      console.log("Main category and sub category are required");
      return res
        .status(400)
        .json({ message: "Main category and sub category are required" });
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.body._id },
      {
        name,
        price,
        image,
        mainCategory,
        subCategory,
        stock,
        info,
      },
      { new: true },
    );

    if (!updatedProduct) {
      console.log("Product not found");

      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// DELETE a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.product_id,
    );
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product successfully deleted! 🗑️ " });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
