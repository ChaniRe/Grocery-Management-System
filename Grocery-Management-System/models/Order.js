// This module defines the schema and model for store orders.
// Each order is linked to a supplier and contains a list of products with quantities.
// The order also has a status and automatic timestamps.

import mongoose from "mongoose";

/**
 * Order Schema
 * 
 * Fields:
 * - supplierId: ObjectId reference to the Supplier who is responsible for the order.
 * - products: Array of ordered product items. Each item has:
 *    - name: The product name (copied from the supplier's offerings)
 *    - quantity: How many units were ordered
 * - status: The current status of the order, written in Hebrew:
 *    - "ממתינה לאישור" = Pending approval
 *    - "בתהליך" = In process
 *    - "הושלמה" = Completed
 * - createdAt: Automatically set when the order is created
 * - updatedAt: Automatically set or manually updated when the order status changes
 */
const orderSchema = new mongoose.Schema({
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier" // This must match the model name defined in Supplier.js
  },
  products: [
    {
      name: String,        // Name of the product ordered
      quantity: Number     // Quantity of the product ordered
    }
  ],
  status: {
    type: String,
    enum: ["ממתינה לאישור", "בתהליך", "הושלמה"],
    default: "ממתינה לאישור"
  },
  createdAt: {
    type: Date,
    default: Date.now // Timestamp set automatically
  },
  updatedAt: {
    type: Date,
    default: Date.now // Can be updated on status changes
  }
});

/**
 * Export the Order model using this schema.
 * MongoDB will create the 'orders' collection based on this model.
 */
const Order = mongoose.model("Order", orderSchema);
export default Order;
