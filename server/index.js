import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js"
import {products,kpis,transactions} from "./data/data.js";
import Product from "./model/Product.js";
import KPI from "./model/KPI.js";
import Transaction from "./model/Transaction.js"


// CONFIGURATIONS

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);



// MONGODDB SETUP

const PORT = process.env.PORT || 9000;
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(async () => {
    app.listen(PORT, () => { console.log(`Server Port : ${PORT}`) });

    // await mongoose.connection.db.dropDatabase();
    // Product.insertMany(products);
    // KPI.insertMany(kpis);
    // Transaction.insertMany(transactions);
})
.catch((error) => console.log(`Not able to connect ${error}`));