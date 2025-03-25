// IMPORT DB
const connection = require("../config/data");

// INDEX
function index(req, res) {
  // QUERY
  const showProducts = `SELECT * FROM products`;

  // Inject Query
  connection.query(showProducts, (err, prodResults) => {
    // Query Failed
    if (err) return res.status(500).json({ error: "Database query failed" });
    // Query Empty
    if (prodResults.length === 0)
      return res.status(404).json({ error: "Products List is Empty" });

    // Send RES
    res.json(prodResults);
  });
}

function show(req, res) {
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
    res.json(prodResult[0]);
  });
}
function search(req, res) {
  // Slug from REQ BODY
  const { alias } = req.params;

  if (!alias) return res.status(400).json({ error: "Missing Param" });

  // QUERY
  const showProducts = `SELECT * FROM products WHERE category = ?`;

  // Inject Query
  connection.query(showProducts, [alias], (err, prodResult) => {
    // Query Failed
    if (err) return res.status(500).json({ error: "Database query failed" });
    // Query Empty
    if (prodResult.length === 0)
      return res.status(404).json({ error: "Missing Product" });
    // SEND RES
    res.json(prodResult);
  });
}

module.exports = { index, show, search };
