const express = require('express');
const router = express.Router();
const chatRoom = require('../models/chattingroom');
const chatContent = require('../models/chatmessage');

router.post('/createChatRoom', (req, res, next) => {
    const {ownerId, guestId, shopName} = req.body;
    const newChatRoom = new chatRoom({
        ownerId: ownerId,
        guestId: guestId,
        shopName : shopName
    });

    newChatRoom
        .save()
        .then(() => {
            res.json({msg: 'success'});
        })
        .catch((err) => {
            res.json({msg: 'failed'});
        })
});

router.get('/getChatHistory/:chatRoomId', (req, res, next) => {
    const {chatRoomId} = req.params;
    console.log(chatRoomId);
    chatContent.find({chatRoomId: chatRoomId})
        .then(data => {
                res.json({msg: 'success', data});
            }
        )
        .catch(err => {
            res.json({msg: 'err'});
        })
});

router.post('/saveChatHistory', (req, res, next) => {
    const {chatRoom, userId, message} = req.body;

    const newChatContent = new chatContent({
        chatRoomId: chatRoom, userId: userId, content: message
    });

    newChatContent.save()
        .then(() => {
            res.json({msg: 'success'});
        })
        .catch((err) => {
            res.json({msg: 'failed'});
        });
});

router.get('/getChatRoomListByGuestId/:guestId', (req, res, next) => {
    const {guestId} = req.params;
    chatRoom.find({guestId: guestId})
        .select({lastChatDate : 0})
        .then(data => {
            res.json({msg: 'success', data});
        })
        .catch(err => {
            res.json({msg: 'failed'});
        });
});

router.put('/modifyRoomValid', (req, res, next) => {
    const {chatRoomId, vaild} = req.body;
    if(chatRoomId==null||vaild==null) res.status(400).json({message: 'failed'});
    chatRoom.updateOne({_id: chatRoomId}, {$set: {isValid: vaild}})
        .then(data => {
            res.json({message: 'success'});
        })
        .catch(err => {
            res.json({message: 'failed'});

        });
});


module.exports = router;