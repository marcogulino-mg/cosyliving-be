// IMPORT DB
const connection = require("../config/data");


function Tot(FinalPrice, products) {

  for (i = 0; i < products.length; i++) {
    FinalPrice = FinalPrice + Number(products[i].price) * products[i].quantity
  }

  return FinalPrice;
}


// TOTAL PRICE
function totalPrice(req, res) {
  // Prod id and quantity
  const { products } = req.body;

  // Check prod
  if (!products || products.length === 0) {
    return res.status(400).json({ error: "No Products Selected" });
  }

  // Get every id from products
  const idProd = products.map((product) => product.id);

  // QUERY
  const priceProd = `SELECT price, quantity FROM products WHERE id IN (?)`;

  // Inject QUERY
  connection.query(priceProd, [idProd], (err, resProd) => {
    // Query Failed
    if (err)
      return res
        .status(500)
        .json({ error: "Database query failed", details: err.message });

    // const totalPrice = resProd.reduce(
    //   (sum, item) => sum + Number(item.price),
    //   0);
    var totalPrice = 0;
    totalPrice = Tot(totalPrice, resProd)


    // SEND RES
    res.status(201).json({ Total_price: totalPrice });
    // res.json(resProd)
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
