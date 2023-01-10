
const authRequired = (req,res,next) => {
    if(!req.session || !req.session.user_id) {
        res.status(400)
        throw new Error("Auth required")
    }
}

module.exports = {authRequired};