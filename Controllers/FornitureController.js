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

// SHOW
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

    const fornitures = prodResult.map((forniture) => {
      return {
        ...forniture,
        img_cover: req.imagePath + forniture.category + '/' + forniture.slug + '/' + forniture.img_cover
      }
    })
    // SEND RES
    res.json(fornitures[0]);
  });
}


module.exports = { index, show };
