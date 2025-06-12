import express from "express";
import { verifyToken } from "../middleware.js";
import { getOrdersByUser, getOrdersById, createOrder, updateOrder, deleteOrder } from "../db/queries/orders.js";

const router = express.Router();

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

        const isValidDate = (date) => {
            return !isNaN(Date.parse(date));
        }

        if (!date || typeof userId !== "number") {
            return res.status(400).json({ error: "Date is required and User ID must be a number." });
        }
        const newOrder = await createOrder({ date, note, userId });
        res.status(201).json(newOrder);       
    } catch (error) {
        next(error);
    }
}); 

//PUT/api/orders/:id
router.put("/:id", verifyToken, async(req, res, next) => {
    try {
        const { id } = req.params;
        const { date, note } = req.body; 
        const userId = req.user.id; 

        if (!date || typeof userId !== "number") {
            return res.status(400).json({ error: "Date is required and User ID must be a number." });
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
            return res.status(403).json({ error: "Forbidden: This is not your order." });
        }
        const deletedOrder = await deleteOrder(id, userId);
        res.json({ message: "Order deleted", order: deletedOrder });
    } catch (error) {
        next(error);
    }
})

export default router; 