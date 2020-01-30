window.onload = () => {
    const socket = io('http://localhost:3000');
    const messageInput = document.getElementById('messageInput');
    const roomName = document.getElementById('roomName').value;
    const userId = document.getElementById('userId').value;
    const mainDiv = document.getElementById('main');

    socket.emit('joinRoom', roomName);

    fetch('/chat/getChatHistory/'+roomName)
        .then(res=>res.json())
        .then(data=>{
            data.data.forEach(it=>{
                addMessage(it.content,it.userId);
            })
        });

    messageInput.addEventListener('keyup', (e) => {
        if (e.keyCode !== 13) return;
        if (messageInput.value === '') return;
        const text = messageInput.value;

        socket.emit('chatMessage', roomName,text, userId);
        messageInput.value = '';
    });

    socket.on('receiveMessage', (text, messageId) => {
        const newDiv = document.createElement('div');
        if (messageId === userId)
            newDiv.setAttribute('class', 'myMessage');
        else
            newDiv.setAttribute('class', 'yourMessage');
        newDiv.innerText = text;
        mainDiv.append(newDiv);
        mainDiv.scrollTop = mainDiv.scrollHeight;
    });

    function addMessage(text,messageId) {
        const newDiv = document.createElement('div');
        if (messageId === userId)
            newDiv.setAttribute('class', 'myMessage');
        else
            newDiv.setAttribute('class', 'yourMessage');
        newDiv.innerText = text;
        mainDiv.append(newDiv);
    }
};