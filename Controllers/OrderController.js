// IMPORT DB
const connection = require("../config/data");

// TOTAL PRICE
function totalPrice(req, res) {
  // Prod price
  const { products } = req.body;

  // Check prod
  if (!products || products.length === 0) {
    return res.status(400).json({ error: "No Products Selected" });
  }

  // QUERY
  const priceProd = `SELECT price FROM products WHERE id = ?`;

  // Inject QUERY
  connection.query(priceProd, [products.id], (err, resProd) => {
    // Query Failed
    if (err)
      return res
        .status(500)
        .json({ error: "Database query failed", details: err.message });

    // SEND RES
    res.status(201).json(resProd);
  });
}

// STORE
function store(req, res) {
  // ORDER Infos
  const {
    name,
    surname,
    email,
    shipment_address,
    products,
    city,
    phone_num,
    billing_address,
    cf,
  } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ error: "No Products Selected" });
  }

  // QUERY
  const addOrder = `INSERT INTO orders (name, surname, email, shipment_address, city, phone_num, billing_address, cf)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // Inject QUERY
  connection.query(
    addOrder,
    [
      name,
      surname,
      email,
      shipment_address,
      city,
      phone_num,
      billing_address,
      cf,
    ],
    (err, resultOrder) => {
      // Query Failed
      if (err)
        return res
          .status(500)
          .json({ error: "Database query failed", details: err.message });

      // Take Values of each Product ordered
      const orderedProducts = products.map((product) => [
        resultOrder.insertId,
        product.id,
        product.quantity,
      ]);

      // QUERY
      const linkProd_Ord =
        "INSERT INTO order_product (id_order, id_product, quantity) VALUES ?";

      // Inject QUERY
      connection.query(
        linkProd_Ord,
        [orderedProducts],
        (err, resultLinking) => {
          // Query Failed
          if (err)
            return res
              .status(500)
              .json({ error: "Database query failed", details: err.message });

          //SEND RES
          res.status(201).json({ product_order: resultLinking });
        }
      );
    }
  );
}

module.exports = { store, totalPrice };
