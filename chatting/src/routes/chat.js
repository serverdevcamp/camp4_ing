const express = require('express');
const router = express.Router();
const chatRoom = require('../models/chattingroom');
const chatContent = require('../models/chatmessage');

router.post('/createChatRoom', (req, res, next) => {
  const {ownerId, guestId, shopName} = req.body;
  const newChatRoom = new chatRoom({
    ownerId: ownerId,
    guestId: guestId,
    shopName: shopName
  });

  newChatRoom
    .save()
    .then(() => {
      res.json({
          response: 'success',
          message: '채팅방을 성공적으로 생성했습니다.'
        }
      );
    })
    .catch((err) => {
      res.json({
        response: 'error',
        message: '채팅방 생성을 실패했습니다.'
      });
    })
});

router.get('/getChatHistory/:chatRoomId', (req, res, next) => {
  const {chatRoomId} = req.params;
  console.log(chatRoomId);
  chatContent.find({chatRoomId: chatRoomId})
    .then(data => {
        res.json({
          response: 'success',
          message: '채팅방 대화내역이 성공적으로 요청됐습니다.'
          , data
        });
      }
    )
    .catch(err => {
      res.json({
        response: 'error',
        message: '채팅방 대화내역을 불러올 수 없습니다.'
      });
    })
});

router.post('/saveChatHistory', (req, res, next) => {
  const {chatRoom, userId, message} = req.body;

  const newChatContent = new chatContent({
    chatRoomId: chatRoom, userId: userId, content: message
  });

  newChatContent.save()
    .then(() => {
      res.json({
        response: 'success',
        message: '채팅메시지를 성공적으로 저장했습니다.'
      });
    })
    .catch((err) => {
      res.json({
        response: 'error',
        message: '채팅메시지를 저장할 수 없습니다.'
      });
    });
});

router.get('/getChatRoomListByGuestId/:guestId', (req, res, next) => {
  const {guestId} = req.params;
  chatRoom.find({guestId: guestId})
    .select({lastChatDate: 0})
    .then(data => {
      res.json({
        response: 'success',
        message: '채팅방 리스트를 성공적으로 불러왔습니다.',
        data
      });
    })
    .catch(err => {
      res.json({
        response: 'success',
        message: '채팅방 리스트를 성공적으로 불러왔습니다.'
      });
    });
});

router.get('/getChatRoomListByOwnerId/:ownerId', (req, res, next) => {
  const {ownerId} = req.params;
  chatRoom.find({ownerId: ownerId})
    .then(data => {
      res.json({
        response: 'success',
        message: '채팅방 리스트를 성공적으로 불러왔습니다.',
        data
      });
    })
    .catch(err => {
      res.json({
        response: 'success',
        message: '채팅방 리스트를 성공적으로 불러왔습니다.',
      });
    });
});

router.put('/modifyRoomValid', (req, res, next) => {
  const {chatRoomId, vaild} = req.body;
  if (chatRoomId == null || vaild == null) res.status(400).json({message: 'failed'});
  chatRoom.updateOne({_id: chatRoomId}, {$set: {isValid: vaild}})
    .then(data => {
      res.json({message: 'success'});
    })
    .catch(err => {
      res.json({message: 'failed'});
    });
});


module.exports = router;