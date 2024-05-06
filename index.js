const cors = require("cors");
const morgan = require("morgan");
const router = require('./router')
const {connectToDatabase} = require("./db");
const todoRoutes = require('./router');
const express = require("express");
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({limit: '300mb'}));
app.use(express.urlencoded({extended: true, limit:'300mb'}));
app.use(router)
app.use('/todos', todoRoutes);

connectToDatabase();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
