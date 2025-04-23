// This is the entry point of the application.
// Responsibilities:
// - Connects to MongoDB
// - Loads middleware (CORS, JSON parsing)
// - Registers API routes for suppliers and store
// - Starts the Express server

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import storeRoutes from "./routes/store.js";
import supplierRoutes from "./routes/suppliers.js";

const app = express();

// Middleware
app.use(cors());               // Enable CORS for all origins
app.use(bodyParser.json());   // Parse incoming JSON requests

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/grocery", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Register API routes
app.use("/api/suppliers", supplierRoutes);  // Supplier registration, login, and order handling
app.use("/api/store", storeRoutes);         // Store owner's order creation and management

// Start the server
app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
