import express from 'express';
import controller from '../controllers/feeding-events';
const router = express.Router();

router.get('/specimens/:specimen/feedings', controller.getFeedings);
router.put('/specimens/:specimen/feedings', controller.updateFeedingEvent);
router.post('/specimens/:specimen/feedings', controller.addFeedingEvent);
router.delete('/specimens/:specimen/feedings', controller.deleteFeedingEvent);
export = router;
