const {Router} = require('express')
const { getEvents, saveEvent, updateEvent, deleteEvent, getEventsByName, getEventsByType, checkLoginInformations } = require('../controllers/EventControllers')

const router = Router();

router.post('/', getEvents);
router.get('/', getEvents);
router.get('/login',(req, res, next) => {console.log("beore login"); next()}, checkLoginInformations);
router.post('/login',(req, res, next) => {console.log("beore login"); next()}, checkLoginInformations);

router.post('/save', saveEvent);
router.put('/update', updateEvent);
router.delete('/delete', deleteEvent);
router.get('/queryName', getEventsByName);  
router.get('/queryType', getEventsByType)
module.exports = router;