import express from 'express';
import controller from '../controllers/feeding-events';
const router = express.Router();

router.get('/specimens/:specimen/feedings', controller.getFeedings);
router.get('/specimens/:specimen/feedings/:feeding', controller.getFeeding);
router.put('/specimens/:specimen/feedings', controller.updateFeedingEvent);
router.post('/specimens/:specimen/feedings', controller.addFeedingEvent);
//router.delete('/feedings/:id', controller.deleteFeedingEvent);
export = router;
