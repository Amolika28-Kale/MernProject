const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

// Serve static files from /uploads
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up multer for file uploads
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) => cb(null, `${file.originalname}`)
});
const upload = multer({ storage: storage });

// MongoDB setup
const mongoose = require('mongoose');
const foodItems = require('./modules/food_items');
const FoodCategory = require('./modules/food_Category');
const User=require("./modules/User");




// Route for uploading food items
router.post("/uploads", upload.single("image"), async function (req, res) {
    try {
        const imgurl = "http://localhost:5000/foodapp/uploads/" + req.file.originalname;

        // Calculate a unique food_id
        const count = await foodItems.countDocuments();
        const fid = count + 1;

        // Construct the food item object
        const obj = {
            food_id: fid,
            food_Category: req.body.txtCategory,
            food_name: req.body.txtname,
            food_desc: req.body.txtdesc,
            food_price: parseFloat(req.body.txtprice),  // Ensure price is stored as a number
            food_quantity: req.body.txtqnty,
            food_url: imgurl,
        };

        // Save the food item to the database
        const foodItem = new foodItems(obj);
        await foodItem.save();

        res.status(201).json({
            message: "Food item uploaded successfully",
            data: {
                food_id: fid,
                food_name: req.body.txtname,
                category: req.body.txtCategory,
                image_url: imgurl,
                original_filename: req.file.originalname
            }
        });
    } catch (err) {
        console.error("Error in saving food item:", err);
        res.status(500).json({ message: "Error in saving food item", error: err.message });
    }
});

// Route for retrieving all food items
router.get("/getAll", async function (req, res) {
    try {
        const result = await foodItems.find({});
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching food items:", error);
        res.status(500).json({ message: "Error fetching food items", error: error.message });
    }
});

// Route for deleting a food item by food_id
router.delete("/removeItem/:uid", async function (req, res) {
    const id = req.params.uid;
    try {
        const result = await foodItems.deleteOne({ food_id: id });
        if (result.deletedCount === 0) {
            res.status(404).json({ status: "not deleted", message: "Food item not found" });
        } else {
            res.status(200).json({ status: "deleted", message: "Food item deleted successfully" });
        }
    } catch (error) {
        console.error("Error deleting food item:", error);
        res.status(500).json({ status: "error", message: "Error deleting food item", error: error.message });
    }
});



module.exports = router;
