import express from 'express';
import controller from '../controllers/feeding-events';
const router = express.Router();

router.get('/feedings', controller.getFeedingEvents);
router.get('/feedings/:id', controller.getFeedingEvent);
router.put('/feedings/:id', controller.updateFeedingEvent);
router.post('/feedings', controller.addFeedingEvent);
router.delete('/feedings/:id', controller.deleteFeedingEvent);
export = router;
