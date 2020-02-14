const express = require('express');
const router = express.Router();
const chatRoom = require('../models/chattingroom');
const chatContent = require('../models/chatmessage');

/**
 * @swagger
 *  components:
 *    schemas:
 *      request_createRoom:
 *        type: object
 *        properties:
 *          ownerId:
 *            type: string
 *          guestId:
 *            type: string
 *          shopName:
 *            type: string
 *      request_saveChatHistory:
 *        type: object
 *        properties:
 *          chatRoom:
 *            type: string
 *          userId:
 *            type: string
 *          message:
 *            type: string
 *      response:
 *        type: object
 *        properties:
 *          response:
 *            type: string
 *          message:
 *            type: string
 *          data:
 *            type: object
 */

/**
 * @swagger
 *  paths:
 *    /chat/createChatRoom:
 *      post:
 *        tags:
 *        - "Chat"
 *        summary: "채팅방 제작 API"
 *        required: true
 *        description: ""
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/request_createRoom'
 *              example:
 *                ownerId: 'onwer1'
 *                guestId: 'guest23'
 *                shopName: '크린토피아 판교점'
 *        responses:
 *          '200: 성공':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/response'
 *                example:
 *                  response: "success"
 *                  message: "채팅방이 정상적으로 생성됐습니다."
 *          '200: 실패':
 *            description: 채팅방생성에 실패했을 때
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/response'
 *                example:
 *                  response: "error"
 *                  message: "채팅방 생성을 실패했습니다."
 */

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

/**
 * @swagger
 *  paths:
 *    /chat/getChatHistory/{chattingRoomId}:
 *      get:
 *        tags:
 *        - "Chat"
 *        summary: "채팅방 대화내역 불러오기"
 *        required: true
 *        description: ""
 *        parameters:
 *          -in: path
 *          name : chattingRoomId
 *          schema:
 *            type: string
 *          required: true
 *        responses:
 *          '200: 성공':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/response'
 *                example:
 *                  response: "success"
 *                  message: "채팅방 대화내용을 정상적으로 불러왔습니다"
 *                  data: [
 *                  {
 *                    _id : "5e40d76a0e795f6807edc6a4",
 *                    chatRoomId : "5e3282088451421d7808a21f",
 *                    userId : "owner",
 *                    content : "대화내용 샬랄라222",
 *                    createdAt : "2020-02-09T04:09:14.521Z"
 *                  },
 *                  {
 *                    _id : "5e40d76a0e795f6807edc6a5",
 *                    chatRoomId : "5e3282088451421d7808a21f",
 *                    userId : "owner2",
 *                    content : "대화내용 샬랄라라라",
 *                    createdAt : "2020-02-10T04:09:14.521Z"
 *                  }
 *                  ]
 *          '200: 실패':
 *            description: 채팅방 대화내역을 불러오는데 오류가 발생했습니다.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/response'
 *                example:
 *                  response: "error"
 *                  message: "채팅방 대화내용을 불러오는데 오류가 발생했습니다."
 */

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


/**
 * @swagger
 *  paths:
 *    /chat/saveChatHistory:
 *      post:
 *        tags:
 *        - "Chat"
 *        summary: "채팅방 내역 저장하기"
 *        required: true
 *        description: ""
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/request_saveChatHistory'
 *              example:
 *                chatRoom: '5e40d76a0e795f6807edc6a5'
 *                userId: 'owner1'
 *                message: '오늘 점심은 돼지김치찌개였다. 맛있었다ㅎ 내일도나왔으면 ㅎㅎㅎㅎㅎ'
 *        responses:
 *          '200: 성공':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/response'
 *                example:
 *                  response: "success"
 *                  message: "채팅메시지를 성공적으로 저장했습니다"
 *          '200: 실패':
 *            description: 채팅메시지를 저장할 수 없을 때
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/response'
 *                example:
 *                  response: "error"
 *                  message: "채팅메시지를 저장할 수 없습니다."
 */
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

/**
 * @swagger
 *  paths:
 *    /chat/getChatRoomListByGuestId/{guestId}:
 *      get:
 *        tags:
 *        - "Chat"
 *        summary: "채팅방 리스트 불러오기"
 *        required: true
 *        description: ""
 *        parameters:
 *          -in: path
 *          name : guestId
 *          schema:
 *            type: string
 *          required: true
 *        responses:
 *          '200: 성공':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/response'
 *                example:
 *                  response: "success"
 *                  message: "채팅방 리스트를 성공적으로 불러왔습니다."
 *                  data: [
 *                  {
 *                    _id : "5e40d76a0e795f6807edc6a4",
 *                    shopName : "크린토피아 판교점",
 *                    ownerId : "owner1",
 *                    guestId : "guest23",
 *                    isValid : true,
 *                    notiNum : 0,
 *                    lastChatDate :  "2020-02-09T04:09:14.521Z",
 *                    createdAt : "2020-02-09T04:09:14.521Z"
 *                  },
 *                  {
 *                    _id : "5e40d76a0e795f6807edc6a4",
 *                    shopName : "크린토피아 판교점",
 *                    ownerId : "owner1",
 *                    guestId : "guest23",
 *                    isValid : true,
 *                    notiNum : 0,
 *                    lastChatDate :  "2020-02-09T04:09:14.521Z",
 *                    createdAt : "2020-02-09T04:09:14.521Z"
 *                  }
 *                  ]
 *          '200: 실패':
 *            description: 채팅방 대화내역을 불러오는데 오류가 발생했습니다.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/response'
 *                example:
 *                  response: "error"
 *                  message: "채팅방 대화내용을 불러오는데 오류가 발생했습니다."
 */
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

/**
 * @swagger
 *  paths:
 *    /chat/getChatRoomListByOwnerId/{ownerId}:
 *      get:
 *        tags:
 *        - "Chat"
 *        summary: "채팅방 리스트 불러오기"
 *        required: true
 *        description: ""
 *        parameters:
 *          -in: path
 *          name : ownerId
 *          schema:
 *            type: string
 *          required: true
 *        responses:
 *          '200: 성공':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/response'
 *                example:
 *                  response: "success"
 *                  message: "채팅방 리스트를 성공적으로 불러왔습니다."
 *                  data: [
 *                  {
 *                    _id : "5e40d76a0e795f6807edc6a4",
 *                    shopName : "크린토피아 판교점",
 *                    ownerId : "owner1",
 *                    guestId : "guest23",
 *                    isValid : true,
 *                    notiNum : 0,
 *                    lastChatDate :  "2020-02-09T04:09:14.521Z",
 *                    createdAt : "2020-02-09T04:09:14.521Z"
 *                  },
 *                  {
 *                    _id : "5e40d76a0e795f6807edc6a4",
 *                    shopName : "크린토피아 판교점",
 *                    ownerId : "owner1",
 *                    guestId : "guest23",
 *                    isValid : true,
 *                    notiNum : 0,
 *                    lastChatDate :  "2020-02-09T04:09:14.521Z",
 *                    createdAt : "2020-02-09T04:09:14.521Z"
 *                  }
 *                  ]
 *          '200: 실패':
 *            description: 채팅방 대화내역을 불러오는데 오류가 발생했습니다.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/response'
 *                example:
 *                  response: "error"
 *                  message: "채팅방 대화내용을 불러오는데 오류가 발생했습니다."
 */

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

/**
 * @swagger
 *  paths:
 *    /chat/modifyRoomValid:
 *      put:
 *        tags:
 *        - "Chat"
 *        summary: "채팅방 활성상태 변경하기"
 *        required: true
 *        description: ""
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/request_saveChatHistory'
 *              example:
 *                chatRoomId: '5e40d76a0e795f6807edc6a5'
 *                valid: false
 *        responses:
 *          '200: 성공':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/response'
 *                example:
 *                  response: "success"
 *                  message: "채팅방의 상태를 성공적으로 변경했습니다."
 *          '200: 실패':
 *            description: 채팅메시지를 저장할 수 없을 때
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/response'
 *                example:
 *                  response: "error"
 *                  message: "채팅방의 상태를 변경할 수 없습니다."
 */

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