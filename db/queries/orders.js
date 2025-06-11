import db from "../client.js"

export async function getOrdersByUser(userId) {
    const result = await db.query("SELECT * FROM orders WHERE user_id = $1 ORDER BY id;", [userId]);
    return result.rows;
}

export async function getOrdersById(orderId) {
    const result = await db.query(
        `SELECT * FROM orders WHERE id = $1;`,
        [orderId]
    );
    return result.rows[0];
}

export async function createOrder({ date, note, userId }) {
    const result = await db.query(
        `INSERT INTO orders (date, note, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;`,
        [date, note, userId]
    );
    return result.rows[0];
}

export async function updateOrder({ date, note, orderId }) {
    const result = await db.query(
        `UPDATE orders SET date = $1, note = $2 WHERE id = $3
        RETURNING *;`,
        [date, note, orderId]
    );
    return result.rows[0];
}

export async function deleteOrder(orderId, userId) {
    const result = await db.query(
        `DELETE FROM orders WHERE id = $1 AND user_id = $2
        RETURNING *;`,
        [orderId, userId]
    );
    return result.rows[0];
}