import { Router } from "express";
import {createCustomer,getCustomers,deleteCustomer,updateCustomer,getACustomer} from '../controllers/customerController.js'

const router = Router();

router.get('/',getCustomers);
router.get('/:id',getACustomer);
router.post('/',createCustomer);
router.delete('/:id',deleteCustomer);
router.put('/:id',updateCustomer);
export default router;