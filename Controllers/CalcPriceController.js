const connection = require("../config/data");

function calcPrice(req, res) {
    let products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "Invalid request body" });
    }

    const productIds = products.map(product => product.id);

    const sql = `SELECT id, price, discount FROM products WHERE id IN (?)`;

    connection.query(sql, [productIds], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Errore nel database" });
        }

        // Associare i prezzi e sconti ai prodotti richiesti
        const productMap = {};
        results.forEach(product => {
            productMap[product.id] = product;
        });

        const finalProducts = products.map(product => {
            const dbProduct = productMap[product.id];
            if (!dbProduct) {
                return { id: product.id, error: "Prodotto non trovato" };
            }
            const priceAfterDiscount = dbProduct.price - ((dbProduct.price) * (dbProduct.discount / 100));
            return {
                id: product.id,
                quantity: product.quantity,
                unitPrice: dbProduct.price,
                discount: dbProduct.discount,
                totalPrice: (priceAfterDiscount * product.quantity).toFixed(2)
            };
        });

        res.json(finalProducts);
    });
}

module.exports = { calcPrice };
