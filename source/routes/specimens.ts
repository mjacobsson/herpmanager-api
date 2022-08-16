import express from 'express';
import controller from '../controllers/specimens';

const router = express.Router();

router.get('/specimens', controller.getSpecimens);
router.get('/specimens/:id', controller.getSpecimen);
router.put('/specimens/:id', controller.updateSpecimen);
router.delete('/specimens/:id', controller.deleteSpecimen);
router.post('/specimens', controller.addSpecimen);

export = router;
