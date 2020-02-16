
const mongoose = require('mongoose');

const WebHook = mongoose.Schema({
    name: String,
    payload: Object,
    adddedBy: String,
    hobby: String
},{
    timeStamps:true
});

module.exports = mongoose.model('WebHook',WebHook);