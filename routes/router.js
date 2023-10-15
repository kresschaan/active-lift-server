const express = require("express");
const router = express.Router();
const schemas = require("../models/schemas");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { ObjectId } = require("mongodb");

router.get("/products", async (req, res) => {
    try {
        const products = schemas.Products;

        const productsData = await products.find({}).exec();

        if (productsData) {
            res.send(JSON.stringify(productsData));
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const test = req.query.id;
        const products = schemas.Products;

        const productsData = await products.findById(id).exec();
        if (productsData) {
            res.send(JSON.stringify(productsData));
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "usd",
            payment_method_types: ["card"],
        });

        res.status(200).json(paymentIntent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/create-products", async (req, res) => {
    try {
        const { name, desc_title, description, price, review, image, variant } =
            req.body;

        const productData = {
            name: name,
            desc_title: desc_title,
            description: description,
            price: price,
            review: review,
            image: image,
            variant: variant,
        };

        const newProduct = new schemas.Products(productData);
        const saveProd = await newProduct.save();

        if (saveProd) {
            res.status(200).json({
                Message: "Product successfully created",
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/orders/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const orders = schemas.Orders;

        const ordersData = await orders.findById(id).exec();

        if (ordersData) {
            res.send(JSON.stringify(ordersData));
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/create-orders", async (req, res) => {
    try {
        const data = req.body;
        const newOrder = new schemas.Orders(data);
        const saveOrder = await newOrder.save();

        console.log(saveOrder);

        if (data) {
            res.status(200).json({
                Message: saveOrder,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
