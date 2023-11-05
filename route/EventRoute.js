const {Router} = require('express')
const { getEvents, saveEvent, updateEvent, deleteEvent, getEventsByName, getEventsByType } = require('../controllers/EventControllers')

const router = Router();

router.get('/', getEvents);
router.post('/save', saveEvent);
router.put('/update', updateEvent);
router.delete('/delete', deleteEvent);
router.get('/queryName', getEventsByName);
router.get('/queryType', getEventsByType)
module.exports = router;