// This module defines the schema and model for suppliers.
// Each supplier provides a list of products they offer to the store.

import mongoose from "mongoose";

/**
 * Product Sub-Schema
 * 
 * Represents a single product that a supplier offers.
 * Fields:
 * - name: The name of the product (e.g., "Milk", "Bread")
 * - price: Price per unit of the product
 * - minOrderQty: Minimum quantity required for an order
 */
const productSchema = new mongoose.Schema({
  name: String,       
  price: Number,
  minOrderQty: Number 
});

/**
 * Supplier Schema
 * 
 * Represents a supplier in the system.
 * Fields:
 * - companyName: Name of the supplier company (e.g., "Tnuva", "Osem")
 * - phone: Contact phone number
 * - representative: Name of the contact person or representative
 * - password: Password for supplier login (stored as plain text in current version)
 * - products: List of products offered by this supplier (based on productSchema)
 */
const supplierSchema = new mongoose.Schema({
  companyName: String,
  phone: String,
  representative: String,
  password: String,  
  products: [productSchema]
});

/**
 * Export the Supplier model.
 * 
 * The third argument "suppliers" ensures the model maps to the correct MongoDB collection.
 * This is required for compatibility with existing collection names and correct population via ref.
 */
const Supplier = mongoose.model("Supplier", supplierSchema, "suppliers");
export default Supplier;
