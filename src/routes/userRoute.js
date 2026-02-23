import { Router } from "express";
import { getUsers,addUser,deleteUser,updateUser,getAUser } from "../controllers/userController.js";

const router = Router();

router.get('/',getUsers);
router.get('/:id',getAUser);
router.post('/',addUser);
router.delete('/:id',deleteUser);
router.put('/:id',updateUser);
export default router;