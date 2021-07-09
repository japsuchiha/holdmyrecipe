const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingridients: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports =  mongoose.model('Recipe', RecipeSchema);