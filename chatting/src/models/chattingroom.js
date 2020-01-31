const mongoose = require('mongoose');

const {Schema} = mongoose;

const chattingRoom =new Schema({
    guestId :{
        type : String,
        required : true
    },
    ownerId : {
        type : String,
        required : true,
    },
    notiNum : {
        type : Number,
        required : true,
        default : 0,
    },
    shopName : {
        type : String,
        required : true
    },
    isValid :{
        type : Boolean,
        default : true
    }
    ,
    lastChatDate : {
        type : Date,
        default : Date.now
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('ChattingRoom',chattingRoom);