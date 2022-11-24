import express from 'express';
import controller from '../controllers/feeding-events';
const router = express.Router();

router.get('/specimens/:specimen/feedings', controller.getFeedingEvents);
router.put('/specimens/:specimen/feedings/:id', controller.updateFeedingEvent);
router.post('/specimens/:specimen/feedings', controller.addFeedingEvent);
router.delete('/specimens/:specimen/feedings', controller.deleteFeedingEvent);
export = router;
