const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('chat',{roomName : "5e3282088451421d7808a21f",userId: "guest23"});
});

module.exports = router;