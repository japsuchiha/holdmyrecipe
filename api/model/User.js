const mongoose = require('mongoose');
const Recipe = require("./Recipe");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min:6,
        max:255
    },
    email: {
        type: String,
        required: true,
        min: 8,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }
})

UserSchema.virtual('recipes', {
    ref: 'Recipe',
    localField: '_id',
    foreignField: 'owner'
})

module.exports = mongoose.model('User', UserSchema);