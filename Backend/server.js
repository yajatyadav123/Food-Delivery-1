import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import adminRouter from "./routes/adminRoutes.js";
// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/',(req,res)=>{
    res.send("API working")
})

// db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/admin",adminRouter);
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

// use of app.use("/api/food",foodRouter)
// mongodb+srv://yajatyadav234_db_user:<db_password>@cluster0.2zylh5m.mongodb.net/
// Keeps server.js clean.
// Groups all food-related routes in one file.
// Makes the project easier to maintain.
// Lets you organize routes by feature (food, user, order, cart, etc.).