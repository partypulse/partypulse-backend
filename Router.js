const express = require("express");
const router = express.Router();
const { authenticate } = require("./service/AuthenticationService");
const AdminRouter = require("./router/AdminRouter");
const AuthenticationRouter = require("./router/AuthenticationRouter");
const ProductRouter = require("./router/ProductRouter");
const UserRouter = require("./router/UserRouter");
const OrderRouter = require("./router/OrderRouter");

let Router = (app) => {
  app.use("/admin", AdminRouter.router);

  app.use("/auth", AuthenticationRouter.router);
  //app.use("/category", CategoryRouter.router);
  // app.use("/image", ImageRouter.router);
  app.use("/order", OrderRouter.router);
  //app.use("/orderitem", OrderItem.router);
  app.use("/product", ProductRouter.router);

  //app.use("/review", ReviewRouter.router);
  app.use("/user", UserRouter.router);

  app.use(router);
};

module.exports = Router;
