import { Router } from "express";
import { protect, adminOnly } from "../middlewares/auth.middlewares";
import { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from "../controllers/user.controllers";

const router = Router();


// admin only
router.post("/", protect, adminOnly, createUser);
router.get("/", protect, adminOnly, getUsers);

// logged in user (self) OR admin
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);

// safest: admin only
router.delete("/:id", protect, adminOnly, deleteUser);



export default router;
