const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userrouter = require("./routes/Userroutes");
const categoryrouter = require("./routes/categoryroutes");
const productrouter = require("./routes/productroutes");
const Bagroutes = require("./routes/bagroutes");
const Wishlistroutes = require("./routes/wishlistroutes");
const OrderRoutes = require("./routes/orderroutes");
const recentlyViewedRoutes = require("./routes/recentlyViewedRoute");
const historyRoutes = require("./routes/historyroutes");
const recommendationRoutes = require("./routes/recommendationsroutes");
const cors = require('cors');

console.log("MONGO_URI:", process.env.MONGO_URI);
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Myntra Backend Running Successfully 🚀");
});
app.use(cors({
  origin: "http://localhost:3000" // or your frontend URL
})); 
app.use("/user", userrouter);
app.use("/category", categoryrouter);
app.use("/product", productrouter);
app.use("/bag", bagroutes);
app.use("/wishlist", wishlistroutes);
app.use("/order", orderRoutes);
app.use("/recently-viewed", recentlyViewedRoutes);
app.use("/history", historyRoutes);
app.use("/recommendations", recommendationRoutes);
const PORT = process.env.PORT || 5000;
const startServer = () => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Mongodb connected");
      startServer();
    })
    .catch((err) => {
      console.log("MongoDB connection failed:", err);
      startServer();
    });
} else {
  console.log("Warning: MONGO_URI not set. Starting server without MongoDB.");
  startServer();
}
