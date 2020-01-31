const axios = require('axios');

module.exports = (app) =>{

    app.on('connection',(socket)=>{
        console.log('소켓연결 성공');
        socket.on('disconnect',()=>{
            console.log('소켓연결 해제');
        });

        socket.on('joinRoom',(roomName)=>{
            socket.join(roomName);
        });
        socket.on('leaveRoom',(roomName)=>{
            socket.leave(roomName);
        });

        socket.on('chatMessage',(roomName,text,userId)=>{
            app.to(roomName).emit('receiveMessage',text,userId);
            axios({
                url:'http://localhost:3000/chat/saveChatHistory',
                method : 'post',
                data:{
                    chatRoom : roomName,
                    userId : userId,
                    message : text
                }
            })
                .then(result=>{
                    // console.log(result.data);
                })
                .catch(err=>{
                    console.error(err);
                });
        });

    });

};