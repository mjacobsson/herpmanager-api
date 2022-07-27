import express from 'express';
import controller from '../controllers/breeding-events';
const router = express.Router();

router.get('/breedings', controller.getBreedingEvents);

export = router;