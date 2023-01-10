
const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const authRequired = asyncHandler(async (req,res,next) => {
    if(!req.session || !req.session.user_id) {
        res.status(400)
        throw new Error("Auth required")
    }
    const user = await User.findOne({_id: req.session.user_id})
    req.user = user;
    next();
})

module.exports = {authRequired};