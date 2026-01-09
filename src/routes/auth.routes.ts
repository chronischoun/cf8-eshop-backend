import express from "express";
import { register, login } from "../controllers/auth.controllers";
import { validate } from "../middlewares/validator.middlewares";
import { registerSchema, loginSchema } from "../validators/auth.validator";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;

