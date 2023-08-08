const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: 'Active'
    },
    userId:{
        type:String,
        ref:'users',
        required:false
    }
});

categorySchema.set('timestamps', true);
categorySchema.plugin(uniqueValidator);
module.exports = mongoose.model('category',categorySchema,'category');