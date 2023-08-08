const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const notificationtblSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: false,
    },
    notificationtype: {
        type: String,
         required: true,
        default: "Individual"
    },
    notificationid: {
        type: String,
         required: true,
    },
    notification_on: {
        type: String,
         required: true,
        default: "Activity"
    },
    user_type: {
        type: String,
        required: false,
    },
    module: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: false,
    },
    read_status: {
        type: String,
        required: true,
        default: "UnRead"
    },
    admin_read_status: {
        type: String,
        required: true,
        default: "UnRead"
    },
    type: {
        type: Number,
        required: true,
        default: 1
    },
    image: {
        type: String,
        required: false
    },
});

notificationtblSchema.set('timestamps', true);
notificationtblSchema.plugin(uniqueValidator);
module.exports = mongoose.model('notificationtbl',notificationtblSchema,'notificationtbl');