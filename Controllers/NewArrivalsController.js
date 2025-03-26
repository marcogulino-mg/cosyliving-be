const connection = require("../config/data");

function new_arrivals(req, res) {
    // SQL query
    const sql = "SELECT  name, price, quantity, description,img_cover FROM products WHERE created_at >'2025-02-01 00:00:00'"
    // inject query
    connection.query(sql, (err, results) => {
        // if query fails
        if (err) res.status(500).json({ error: "Database quary failed" })
        //   if query doesn't get results
        if (results.length === 0) res.status(404).json({ error: "Product not found" })
        //   send res
        res.json(results)
    })
}

module.exports = { new_arrivals }