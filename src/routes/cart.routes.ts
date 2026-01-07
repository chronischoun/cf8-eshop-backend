import { Router } from "express";
import { 
  getCartByUser, 
  createCart, 
  addItemToCart, 
  updateCartItem, 
  removeCartItem, 
  clearCart 
} from "../controllers/cart.controllers";

const router = Router();

router.get("/:userId", getCartByUser);
router.post("/", createCart);
router.post("/:userId/items", addItemToCart);
router.put("/:userId/items/:itemId", updateCartItem);
router.delete("/:userId/items/:itemId", removeCartItem);
router.delete("/:userId", clearCart);

export default router;
