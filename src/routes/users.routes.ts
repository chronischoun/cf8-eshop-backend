import { Router } from "express";
import { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from "../controllers/user.controllers";

const router = Router();

router.post("/", createUser);       // Create user
router.get("/", getUsers);          // Get all users
router.get("/:id", getUserById);    // Get user by id
router.put("/:id", updateUser);     // Update user by id
router.delete("/:id", deleteUser);  // Delete user by id

export default router;
