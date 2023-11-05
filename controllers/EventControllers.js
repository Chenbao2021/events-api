const eventModel = require('../model/EventModel')

module.exports.getEvents = async (req, res) => {
    const Events = await eventModel.find()
    res.send(Events);
}

module.exports.saveEvent = async (req, res) => {
    if(!req.body.name || !req.body.link || !req.body.description || !req.body.beginDate || !req.body.endDate) {
        res.status(500).end('Not all parameters are provided');
    }
    eventModel
    .create(req.body)
    .then((data) => {
        res.status(200).send("Document added to database")
    })
}

module.exports.updateEvent = async (req, res) => {
    if(!req.body._id) res.status(500).end('Not received updated information')
    eventModel
    .findByIdAndUpdate(req.body._id, req.body)
    .then((data) => {
        res.status(201).send("Document modified successfully")
    })
}

module.exports.deleteEvent = async (req, res) => {
    const {id} = req.body;
    if(!id) res.status(400).end("Please give a document id")
    eventModel
    .findByIdAndDelete(id)
    .then((data) => {
        res.status(202).send("Document deleted successfully")
    })
    .catch((err) => {
        res.status(404).end('Document not found')
    })
}

module.exports.getEventsByName = async (req, res) => {
    const {name} = req.query;
    if(!name) res.status(400).end('No query name');
    const recherchePattern = new RegExp(name, "i");
    eventModel
    .find({name: recherchePattern})
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        res.status(500).end("Document not found")
    })
}

module.exports.getEventsByType = async (req, res) => {
    const {type} = req.query;
    if(!type) res.status(400).end('No query type');
    eventModel
    .find({name: type})
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        res.status(500).end("Document not found")
    })
}


