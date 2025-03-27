// IMPORT DB
const connection = require("../config/data");

// INDEX
function offers(req, res) {
    // QUERY
    const showProducts = `SELECT * FROM products WHERE (discount != 0 AND discount is NOT NULL)`;

    // Inject Query
    connection.query(showProducts, (err, prodResults) => {
        // Query Failed
        if (err) return res.status(500).json({ error: "Database query failed" });
        // Query Empty
        if (prodResults.length === 0)
            return res.status(404).json({ error: "Products List is Empty" });
        console.log(prodResults);


        const fornitures = prodResults.map((forniture) => {
            return {
                ...forniture,
                img_cover: req.imagePath + forniture.category + '/' + forniture.slug + '/' + forniture.img_cover
            }
        })
        // Send RES
        res.json(fornitures);
    });
}

module.exports = { offers }