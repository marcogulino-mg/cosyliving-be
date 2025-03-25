// IMPORT DB
const connection = require("../config/data");

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
    total_price,
    id_coupon,
  } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ error: "No Products Selected" });
  }

  console.log(req.body);
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

      res.status(201).json(resultOrder[0]);
      //Add Products to Order
      //const orderProducts = products.map(product => [Id, product.id, product.quantity]);
    }
  );
}

module.exports = { store };
