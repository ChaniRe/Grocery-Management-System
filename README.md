# Grocery Management System – Full Stack Project

A full-stack Node.js application for managing supplier orders in a small grocery store.

Made by: Chani Refson
Email: chanirefson@gmail.com

## 📦 Features

### Store Owner (Admin)
- View list of all registered suppliers
- Select a supplier and create new orders
- View all submitted orders
- Mark orders as "Completed"

### Suppliers
- Register with company details and offered products
- Login securely (via phone & password)
- View incoming orders from the store
- Approve orders, changing their status to "In Process"

## 🛠️ Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Frontend:** HTML, JS, CSS (RTL / Hebrew layout)
- **Architecture:** REST API, Modular code structure

## 📂 Folder Structure

project-root/ │ ├── models/ │ ├── Supplier.js │ └── Order.js │ ├── routes/ │ ├── suppliers.js │ └── store.js │ ├── public/ │ ├── index.html # Supplier interface │ ├── store.html # Store owner interface │ └── style.css │ ├── server.js # Entry point └── README.md
