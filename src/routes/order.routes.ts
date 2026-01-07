import { Router } from "express";
import { 
  createOrder, 
  getAllOrders, 
  getOrdersByUser, 
  getOrderById, 
  updateOrderStatus, 
  deleteOrder 
} from "../controllers/orders.controllers";

const router = Router();

router.post("/", createOrder);              // Create order
router.get("/", getAllOrders);             // Get all orders (admin)
router.get("/user/:userId", getOrdersByUser); // Get orders by user
router.get("/:id", getOrderById);          // Get single order by id
router.patch("/:id/status", updateOrderStatus); // Update order status
router.delete("/:id", deleteOrder);        // Delete order

export default router;
