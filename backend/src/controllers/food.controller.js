// controllers/food.controller.js

const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const { v4: uuid } = require("uuid");

// Create food (Upload Video to Cloudinary)
async function createFood(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Video file missing" });
        }

        const fileUploadResult = await storageService.uploadFile(
            req.file.buffer,
            uuid(),
            req.file.mimetype
        );

        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        });

        res.status(201).json({
            message: "Food created successfully",
            food: foodItem
        });

    } catch (err) {
        console.log("CREATE FOOD ERROR:", err);
        res.status(500).json({ message: err.message });
    }
}

// Get food items
async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({});
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    });
}

// Like food
async function likeFood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user;

        if (!foodId) {
            return res.status(400).json({ error: "foodId missing" });
        }

        const alreadyLiked = await likeModel.findOne({
            user: user._id,
            food: foodId
        });

        // IF ALREADY LIKED → UNLIKE
        if (alreadyLiked) {
            await likeModel.deleteOne({ user: user._id, food: foodId });
            await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });

            return res.status(200).json({ like: false });
        }

        // LIKE
        await likeModel.create({ user: user._id, food: foodId });
        await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

        return res.status(201).json({ like: true });

    } catch (err) {
        console.error("LIKE ERROR:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


// Save food
async function saveFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isSaved = await saveModel.findOne({ user: user._id, food: foodId });

    if (isSaved) {
        await saveModel.deleteOne({ user: user._id, food: foodId });
        await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: -1 } });

        return res.status(200).json({ save: false });
    }

    await saveModel.create({ user: user._id, food: foodId });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: 1 } });

    res.status(201).json({ save: true });
}

// Get saved food
async function getSaveFood(req, res) {
    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods.length) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });
}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood
};
