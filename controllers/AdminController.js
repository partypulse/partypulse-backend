const getUsers = async (request, response) => {
  try {
    const data = await User.find({});

    return response.status(401).json("Unauthorized");
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
};
const getProducts = async (request, response) => {
  try {
    const data = await Product.find({});

    return response.status(401).json("Unauthorized");
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
};
const getOrders = async (request, response) => {
  try {
    const data = await Order.find({});

    return response.status(401).json("Unauthorized");
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
};
const getCategories = async (request, response) => {
  try {
    const companies = await Category.find({});

    return response.status(401).json("Unauthorized");
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
};
module.exports = { getCategories, getOrders, getUsers, getProducts };
