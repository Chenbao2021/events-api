const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    beginDate: {
        type: String,
        require: true
    },
    endDate: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Events', eventSchema)