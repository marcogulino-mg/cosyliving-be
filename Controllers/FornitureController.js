const connection = require("./../Data/data")

function index(req, res) {
    // Query SQL
    const sql = "SELECT * FROM products"


    connection.query(sql, (err, results) => {
        console.log(res);

        // if (err) res.status(500).json({ error: "Failed to show products" })
        // return res.json(results)
        // console.log(results);

    })
}

index()

module.exports = (index)