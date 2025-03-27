const connection = require("../config/data");

function search(req, res) {
  // Slug from REQ BODY
  const { name } = req.params;

  if (!name) return res.status(400).json({ error: "Missing Param" });

  /* Transform string for LIKE (1.Remove init and end space.
  2.split using space. 3. Add % to init and end string.
  4.Create a string from array with OR as separator) */
  const searchParam = name
    .trim()
    .split(" ")
    .map((param) => `name LIKE '%${param}%'`)
    .join(" OR ");

  // QUERY
  const showProducts = `SELECT * FROM products WHERE (${searchParam} OR category = ?)`;

  // Inject Query
  connection.query(showProducts, [name], (err, prodResult) => {
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
    res.json(fornitures);
  });
}

module.exports = { search };
