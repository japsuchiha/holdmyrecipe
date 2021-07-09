const express = require('express');
const Recipe = require('../model/Recipe');
const verify = require('./verifyToken');
const router = new express.Router();

router.post('/post', verify, async (req,res) => {
    const recipe = new Recipe({
        ...req.body,
        owner: req.user._id
    })

    try{
        await recipe.save();
        console.log(recipe);
        res.status(201).send(recipe);
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/posts', verify, async (req, res) => {
    try {
        const recipes = await Recipe.find({owner:req.user._id})
        if(!recipes) {
            return res.status(400).send();
        }

        res.send(recipes);
    } catch (e) {
        res.status(500).send();
    }
})

router.get('/posts/:name', verify, async (req, res) => {
    try {
        const recipe = await Recipe.findOne({name: req.params.name})
        if(!recipe) {
            return res.status(400).send();
        }
        res.send(recipe);
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;