import express, { Application } from "express";
import AppError from "./utils/appError";

// const globalErrorHandler = require("./controllers/errorController");
import globalErrorHandler from "./controllers/errorController";
// import userRouter from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import categoryRoutes from "./routes/categoryRoutes";
import dishRoutes from "./routes/disheRoutes";
import testimonialRoutes from "./routes/testimonialRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";

// const authRoute = require("./routes/auth");
const app: Application = express();
import cors from "cors";
// 1) MIDDLEWARE

app.use(cookieParser()); // Nécessaire pour lire les cookies
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);
// app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   req.requestTime = new Date();
//   next();
// });

// 2) ROUTE HANDLERS

// 3) ROUTES

// app.use((req, res, next) => {
//   console.log("Hello from middleware");
//   next();
// });

// app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/dishes", dishRoutes);
app.use("/api/v1/testimonials", testimonialRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/cart", cartRoutes);

// Handle Errors

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// 4) SERVER

export default app;
