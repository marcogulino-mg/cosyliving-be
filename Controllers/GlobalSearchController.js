const connection = require("../config/data");


function search(req, res) {
    // Slug from REQ BODY
    const { slug } = req.params;

    if (!slug) return res.status(400).json({ error: "Missing Param" });

    // QUERY
    const showProducts = `SELECT * FROM products WHERE slug = ?`;

    // Inject Query
    connection.query(showProducts, [slug], (err, prodResult) => {
        // Query Failed
        if (err) return res.status(500).json({ error: "Database query failed" });
        // Query Empty
        if (prodResult.length === 0)
            return res.status(404).json({ error: "Missing Product" });

        // SEND RES
        res.json(prodResult);
    });
}

module.exports = { search }