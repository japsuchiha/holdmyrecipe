const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema({
    ingridients: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    }
})

module.exports =  mongoose.model('Recipe', RecipeSchema);