import { Router } from "express";
import {getCases,createCase,updateCase,getACase,deleteCase} from '../controllers/caseController.js'

const router = Router();

router.get('/',getCases);
router.get('/:id',getACase);
router.post('/',createCase);
router.delete('/:id',deleteCase);
router.put('/:id',updateCase);

export default router;