import express from 'express';
import controller from '../controllers/breeding-events';
const router = express.Router();

router.get('/breedings', controller.getBreedingEvents);
router.get('/breedings/:id', controller.getBreedingEvent);
router.put('/breedings/:id', controller.updateBreedingEvent);
router.post('/breedings', controller.addBreedingEvent);
router.delete('/breedings/:id', controller.deleteBreedingEvent);
export = router;