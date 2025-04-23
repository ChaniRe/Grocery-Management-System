// This module provides API routes for the grocery store owner.
// Functionalities include:
// - Creating a new order for a selected supplier
// - Viewing all orders (with populated supplier details)
// - Marking an order as "completed"

import express from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";

const router = express.Router();

/**
 * POST /orders
 * Create a new order by the store owner.
 * The request body should include:
 * - supplierId (string, ObjectId format)
 * - products (array of objects with name and quantity)
 */
router.post("/orders", async (req, res) => {
  try {
    const { supplierId, products } = req.body;

    // Create new order with reference to supplier
    const newOrder = new Order({
      supplierId: new mongoose.Types.ObjectId(supplierId),
      products,
    });

    await newOrder.save();
    res.status(201).send(newOrder);
  } catch (err) {
    res.status(400).send("Error creating order: " + err.message);
  }
});

/**
 * GET /orders
 * Retrieve all orders in the system.
 * Populates supplier details (company name and representative).
 */
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({}).populate({
      path: "supplierId",             // Reference field
      model: "Supplier",              // Model name to populate from
      select: "companyName representative" // Fields to return
    });

    // Debug output in terminal (optional)
    console.log("📦 Orders with supplier info:", JSON.stringify(orders, null, 2));

    res.send(orders);
  } catch (err) {
    console.error("Populate error:", err);
    res.status(500).send("Error fetching orders");
  }
});

/**
 * POST /orders/:id/complete
 * Mark an order as completed.
 * Updates the order's status and timestamp.
 */
router.post("/orders/:id/complete", async (req, res) => {
  try {
    const completed = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "הושלמה", updatedAt: new Date() },
      { new: true } // Return updated document
    );
    res.send(completed);
  } catch (err) {
    res.status(400).send("Error completing order");
  }
});

export default router;

