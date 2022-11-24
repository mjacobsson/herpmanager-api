import express from 'express';
import controller from '../controllers/breeding-events';
const router = express.Router();

router.get('/specimens/:specimen/breedings', controller.getBreedingEvents);
router.put(
  '/specimens/:specimen/breedings/:id',
  controller.updateBreedingEvent
);
router.post('/specimens/:specimen/breedings', controller.addBreedingEvent);
router.delete('/specimens/:specimen/breedings', controller.deleteBreedingEvent);
export = router;
