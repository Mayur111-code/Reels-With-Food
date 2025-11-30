// const foodPartnerModel = require("../models/foodpartner.model")
// const userModel = require("../models/user.model")
// const jwt = require("jsonwebtoken");


// async function authFoodPartnerMiddleware(req, res, next) {

//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({
//             message: "Please login first"
//         })
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)

//         const foodPartner = await foodPartnerModel.findById(decoded.id);

//         req.foodPartner = foodPartner

//         next()

//     } catch (err) {

//         return res.status(401).json({
//             message: "Invalid token"
//         })

//     }

// }

// async function authUserMiddleware(req, res, next) {

//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({
//             message: "Please login first"
//         })
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)

//         const user = await userModel.findById(decoded.id);

//         req.user = user

//         next()

//     } catch (err) {

//         return res.status(401).json({
//             message: "Invalid token"
//         })

//     }

// }

// module.exports = {
//     authFoodPartnerMiddleware,
//     authUserMiddleware
// }


const foodPartnerModel = require("../models/foodpartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {

    const token = req.cookies.partnerToken;
    if (!token) return res.status(401).json({ message: "Food partner login required" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const partner = await foodPartnerModel.findById(decoded.id);

        if (!partner) return res.status(401).json({ message: "Invalid token" });

        req.foodPartner = partner;
        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

async function authUserMiddleware(req, res, next) {

    const token = req.cookies.userToken;
    if (!token) return res.status(401).json({ message: "User login required" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) return res.status(401).json({ message: "Invalid token" });

        req.user = user;
        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}
