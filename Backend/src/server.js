import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route.js"; 
import usersRoutes from "./routes/users.routes.js"
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";

const app = express();

dotenv.config()

const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use(cookieParser());


app.use("/api/auth",authRoutes )
app.use("/api/users",usersRoutes)
app.use("api/chat", chatRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB()
});
