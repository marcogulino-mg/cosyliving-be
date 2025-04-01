// IMPORT DB
const connection = require("../config/data");

// STORE
function store(req, res) {
  // ORDER Infos
  let {
    name,
    surname,
    email,
    shipment_address,
    products,
    city,
    phone_num,
    cf,
    cap,
    name_billing,
    surname_billing,
    city_billing,
    billing_address,
    cap_billing,
  } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ error: "No Products Selected" });
  }

  if (
    ![
      name_billing,
      surname_billing,
      city_billing,
      billing_address,
      cap_billing,
    ].every(Boolean)
  ) {
    name_billing = name;
    surname_billing = surname;
    city_billing = city;
    billing_address = shipment_address;
    cap_billing = cap;
  }

  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }
  console.log("Dati ricevuti:", req.body);

  // QUERY
  const addOrder = `INSERT INTO orders (name, surname, email, shipment_address, city, phone_num, billing_address, cf, cap, name_billing, surname_billing, cap_billing, city_billing)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
      cap,
      name_billing,
      surname_billing,
      cap_billing,
      city_billing,
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

module.exports = { store };
