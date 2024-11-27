const mongoose = require('mongoose');

// Define the schema for food items
const FoodSchema = new mongoose.Schema({
    food_id: { type: Number, unique: true, required: true },  // Ensuring uniqueness
    food_Category: { type: String, required: true },
    food_name: { type: String, required: true },
    food_desc: { type: String },
    food_price: { type: Number, required: true },
    food_url: { type: String },
    food_quantity: { type: Number }
});

// Create a model from the schema
const FoodItem = mongoose.model("FoodItem", FoodSchema, "foodItems");

// Export the model
module.exports = FoodItem;
