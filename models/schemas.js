const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String },
    desc_title: { type: String },
    description: { type: String },
    price: { type: Number },
    review: { type: String },
    image: [
        {
            type: String,
        },
    ],
    variant: [
        {
            type: String,
        },
    ],
});

const orderSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    streetAdd1: { type: String },
    streetAdd2: { type: String },
    phone: { type: Number },
    subtotal: { type: Number },
    shipping: { type: String },
    tax: { type: Number },
    total: { type: Number },
    shippingOption: { type: String },
});

const Products = mongoose.model("product", productSchema, "products");
const Orders = mongoose.model("order", orderSchema, "orders");
const mySchemas = { Products: Products, Orders: Orders };

module.exports = mySchemas;
