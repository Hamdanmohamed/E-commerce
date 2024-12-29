import express from 'express';
import { createUser,getAllUsers,loginUser,logoutUser } from '../controllers/userControllers.js';
import { authenticate,authorizeAdmin } from '../utils/athenticate.js';
const router = express.Router();


router.route("/").post(createUser).get(authenticate,authorizeAdmin,getAllUsers)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)

export default router;