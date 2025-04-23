// This module provides routes for supplier management.
// Functionalities include:
// - Supplier registration and login
// - Fetching a supplier’s orders
// - Approving orders
// - Listing all registered suppliers

import express from "express";
import Supplier from "../models/Supplier.js";
import Order from "../models/Order.js";

const router = express.Router();

/**
 * POST /register
 * Registers a new supplier with their company info and product list.
 * Request body should include:
 * - companyName, representative, phone, password, products[]
 */
router.post("/register", async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    res.status(201).send(newSupplier);
  } catch (err) {
    res.status(400).send("Error creating supplier: " + err.message);
  }
});

/**
 * POST /login
 * Logs in a supplier using their phone and password.
 * Note: This implementation compares passwords in plain text (not secure for production).
 */
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;
  const supplier = await Supplier.findOne({ phone });

  if (!supplier || supplier.password !== password) {
    return res.status(401).send("Invalid phone or password");
  }

  res.send(supplier);
});

/**
 * GET /orders/:supplierId
 * Retrieves all orders associated with a specific supplier.
 */
router.get("/orders/:supplierId", async (req, res) => {
  try {
    const orders = await Order.find({ supplierId: req.params.supplierId });
    res.send(orders);
  } catch (err) {
    res.status(500).send("Error retrieving orders");
  }
});

/**
 * POST /orders/:id/approve
 * Updates an order's status to "In Process" ("בתהליך").
 * Typically called when a supplier approves the order.
 */
router.post("/orders/:id/approve", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "בתהליך", updatedAt: new Date() },
      { new: true }
    );
    res.send(updated);
  } catch (err) {
    res.status(400).send("Error approving order");
  }
});

/**
 * GET /all
 * Returns a list of all registered suppliers.
 * Used by the store owner to display available supplier options.
 */
router.get("/all", async (req, res) => {
  const suppliers = await Supplier.find();
  res.send(suppliers);
});

export default router;
