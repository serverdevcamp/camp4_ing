var express = require('express');
var router = express.Router();
const ChatRoom = require('../models/chattingroom');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test',(req,res,next)=>{
  const chatRoom = new ChatRoom({
    ownerId: 'ownerId',
    guestId: 'jhihi',
    shopName: 'hihihihi'
  });

  chatRoom.save()
      .then(()=>{
        res.send('오키도키');
      })
      .catch(err=>console.error(err))

});

module.exports = router;
