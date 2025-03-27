function setImagePath(req, res, next) {
    const fileName = req.params.filename || ""; // Default to empty if not provided
    req.imagePath = `${req.protocol}://${req.get('host')}/imgs/`;
    next();
}


module.exports = setImagePath;