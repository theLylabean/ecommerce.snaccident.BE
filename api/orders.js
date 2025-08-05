import express from "express";
import { verifyToken } from "../auth/middleware/middleware.js";
import { getOrdersByUser, getOrdersById, createOrder, updateOrder, deleteOrder, addToCartQuery } from "../db/queries/ordersQueries.js";

const router = express.Router();
const isValidDate = (date) => !isNaN(Date.parse(date));

//GET/api/orders 
router.get("/", verifyToken, async (req, res, next) => {
    try {
        const userId = req.user.id; //from decoded JWT
        const orders = await getOrdersByUser(userId);
        res.json(orders);
    } catch (error) {
        next (error);
    }
});

//POST/api/orders
router.post("/", verifyToken, async(req, res, next) => {
    try {
        const { date, note } = req.body;
        const userId = req.user.id;

        if (!date || !isValidDate(date)) {
            return res.status(400).json({ error: "A valid date is required." });
          }
        const newOrder = await createOrder({ date, note, userId });
        res.status(201).json(newOrder);       
    } catch (error) {
        next(error);
    }
}); 

//POST /api/orders/:orderId/items
router.post('/:orderId/items', verifyToken, async ( req, res, next ) => {
    const { productId, quantity } = req.body;
    const { orderId } = req.params;

    try {
        const result = await db.query(
            `INSERT INTO order_items (order_id, product-id, quantity)
            VALUES ($1, $2, $3)
            RETURNING *;`,
            [orderId, productId, quantity]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
})

//PUT/api/orders/:id
router.put("/:id", verifyToken, async(req, res, next) => {
    try {
        const { id } = req.params;
        const { date, note } = req.body; 
        const userId = req.user.id; 

        if (!date || !isValidDate(date)) {
            return res.status(400).json({ error: "A valid date is required." });
        }
        const order = await getOrdersById(id);
        if (!order) {
            return res.status(404).json({ error: "Order not found." });
        }
        if (order.user_id !== userId) {
            return res.status(403).json({ error: "Forbidden: This is not your order. "});
        }
        const updatedOrder = await updateOrder({ date, note, orderId: Number(id) });
        res.json(updatedOrder);
    } catch (error) {
       next(error); 
    }
})

//DELETE/api/orders/:id
router.delete("/:id", verifyToken, async (req, res, next) => {
    try{
        const { id } = req.params;
        const userId = req.user.id;

        const order = await getOrdersById(id);
        if (!order) {
            return res.status(404).json({ error: "Order not found." });           
        }
        if (order.user_id !== userId) {
            return res.status(403).json({ error: "Forbidden: You do not have permission to access this resource." });
        }
        const deletedOrder = await deleteOrder(id, userId);
        res.json({ message: "Order deleted", order: deletedOrder });
    } catch (error) {
        next(error);
    }
})

// Add to Cart
router.post('/addtocart', verifyToken, async (req, res) => {
    try {
        console.log('🛒 ADD TO CART HIT');
        console.log('👉 req.user:', req.user);
        console.log('👉 req.body:', req.body);

        const { productId } = req.body;
        const userId = req.user?.id;
        // Validate input
        if (!productId || !userId) {
            console.warn('🚫 Missing userId or productId')
            return res.status(400).json({ error: "Missing productId or userId" });
        }
        const addedItem = addToCartQuery(userId, productId);
        res.status(201).json(addedItem);
    } catch (error) {
        console.error('❌ Error adding to cart: ', error);
        res.status(500).json({ error: 'Failed to add to cart.' });
    }
});

export default router; 