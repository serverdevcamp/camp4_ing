const mongoose = require('mongoose');

const {Schema} = mongoose;
const {Types: {ObjectId}} = Schema;

const chatMessage = new Schema({
    chatRoomId: {
        type : ObjectId,
        required : true,
        ref : 'ChattingRoom'
    },
    userId: {
        type: String,
        required: true,
    },
    content:{
        type: String,
        required : true
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('ChatMessage',chatMessage);