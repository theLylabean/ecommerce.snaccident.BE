import db from "../client.js"

export async function getOrdersByUser(userId) {
    try {
        const result = await db.query(`
            SELECT * FROM orders WHERE user_id = $1 ORDER BY id;`, 
            [userId]
        );
        return result.rows;
    } catch (error) {
        console.error({ error: '❌ Error getting order by userId.' });
        throw error;
    }
}

export async function getOrdersById(orderId) {
    try {
        const result = await db.query(
            `SELECT * FROM orders WHERE id = $1;`,
            [orderId]
        );
        return result.rows[0];
    } catch (error) {
        console.error({ error: '❌ Error getting order by Id.' });
        throw error;
    }
}

export async function createOrder({ date, note, userId }) {
    try {
        const result = await db.query(
            `INSERT INTO orders (date, note, user_id)
            VALUES ($1, $2, $3)
            RETURNING *;`,
            [date, note, userId]
        );
        return result.rows[0];
    } catch (error) {
        console.error({ error: '❌ Error creating new order.' });
        throw error;
    }
}

export async function updateOrder({ date, note, orderId }) {
    try {
        const result = await db.query(
            `UPDATE orders SET date = $1, note = $2 WHERE id = $3
            RETURNING *;`,
            [date, note, orderId]
        );
        return result.rows[0];
    } catch (error) {
        console.error({ error: '❌ Error updating order.' });
        throw error;
    }
}

export async function deleteOrder(orderId, userId) {
    try {
        const result = await db.query(
            `DELETE FROM orders WHERE id = $1 AND user_id = $2
            RETURNING *;`,
            [orderId, userId]
        );
        return result.rows[0];
    } catch (error) {
        console.error({ error: '❌ Error deleting order by Id.' });
        throw error;
    }
}

export async function addToCartQuery(userId, productId, quantity) {
    try {
        const result = await db.query(`
                INSERT INTO carts (user_id, product_id, quantity)
                VALUES ($1, $2, $3)
                RETURNING *`, 
                [userId, productId, quantity]
        );
        return result.rows[0];
    } catch (error) {
        console.error({ error: '❌ Error in addToCartQuery.' });
        throw error;
    }
}