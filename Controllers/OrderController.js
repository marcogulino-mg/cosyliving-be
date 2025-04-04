// IMPORT DB
const connection = require("../config/data");
const { param } = require("../Routers/GlobalSearchRouter");
const mysql = require("mysql2");

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
  // console.log("Dati ricevuti:", req.body);

  // Calcolare il total_price sommando il prezzo di ogni prodotto con eventuale sconto
  let total_price = 0;
  products.forEach((product) => {
    // Assicurarsi che il discount sia definito
    const discount = product.discount || 0; // Se discount è undefined, imposta a 0
    console.log(
      `Prodotto: ${product.id}, prezzo: ${product.price}, `

    );

    // Calcolare il prezzo scontato per ogni prodotto
    if (isNaN(product.price) || isNaN(discount)) {
      console.error(
        `Valori non validi per il prodotto ${product.id}: prezzo ${product.price}, sconto ${product.discount_price}`

      );
      return;
    }
    console.log(product);


    if (product.discount_price) {
      total_price += product.discount_price * product.quantity;
      console.log("Ciao");

    } else {
      total_price += product.price * product.quantity;
    }

  });

  console.log("Total price calcolato:", total_price);

  // Aggiungere 9,99 se il total_price è inferiore a 1000
  if (total_price < 1000) {
    total_price += 9.99;
  }

  // QUERY
  const addOrder = `INSERT INTO orders (name, surname, email, shipment_address, city, phone_num, billing_address, cf, cap, name_billing, surname_billing, cap_billing, city_billing, total_price)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
      total_price,
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
      const linkProd_Ord = `INSERT INTO order_product (id_order, id_product, quantity) VALUES ?`;

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

          const reduceQt = `UPDATE products JOIN order_product ON products.id = order_product.id_product 
          SET products.quantity = products.quantity - order_product.quantity 
          WHERE order_product.id_order = ?;`;

          connection.query(
            reduceQt,
            [resultOrder.insertId],
            (err, resReduceQt) => {
              console.log(
                "Query formattata:",
                mysql.format(reduceQt, [orderedProducts.insertId])
              );
              // Query Failed
              if (err)
                return res.status(500).json({
                  error: "Database query failed",
                  details: err.message,
                });
            }
          );

          //SEND RES
          res.status(201).json({ product_order: resultLinking });
        }
      );
    }
  );
}

function show(req, res) {
  // Query
  const recapOrder = `SELECT orders.*, 
       JSON_ARRAYAGG(
           JSON_OBJECT(
               'product_id', products.id,
               'product_name', products.name,
               'product_price', products.price,
               'quantity', order_product.quantity
           )
       ) AS products,
        SUM(((products.price) - products.price * (products.discount/100)) * order_product.quantity) AS total_price
  FROM orders
  INNER JOIN order_product ON orders.id = order_product.id_order
  INNER JOIN products ON products.id = order_product.id_product
  WHERE orders.id = (SELECT MAX(id) FROM orders)
  GROUP BY orders.id;`;

  // Inject QUERY
  connection.query(recapOrder, (err, reqRecap) => {
    // Query Failed
    if (err)
      return res
        .status(500)
        .json({ error: "Database query failed", details: err.message });

    if (!reqRecap.length) {
      return res.status(404).json({ error: "Nessun ordine trovato" });
    }

    //SEND RES
    res.status(200).json(reqRecap[0]);
  });
}

module.exports = { store, show };
