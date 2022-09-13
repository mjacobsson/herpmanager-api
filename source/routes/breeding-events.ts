import express from 'express';
import controller from '../controllers/breeding-events';
const router = express.Router();

router.get('/specimens/:id/breedings', controller.getBreedingEvents);
router.put('/specimens/:id/breedings', controller.updateBreedingEvent);
router.post('/specimens/:id/breedings', controller.addBreedingEvent);
router.delete('/specimens/:id/breedings', controller.deleteBreedingEvent);
export = router;
