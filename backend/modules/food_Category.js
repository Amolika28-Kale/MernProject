const mongoose = require('mongoose');

const foodCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true 
    }
});

const FoodCategory = mongoose.model("FoodCategory", foodCategorySchema);


module.exports=FoodCategory;