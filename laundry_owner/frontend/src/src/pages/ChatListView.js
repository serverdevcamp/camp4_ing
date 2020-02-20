import React, {useEffect, useRef, useState} from "react";
import className from "classnames";
import axios from 'axios';
import style from '../components/Common/Background.scss';
import uuid from 'react-uuid';
import DefaultHeader from "../components/Header/DefaultHeader";
import DefaultMainBody from "../components/Common/DefaultMainBody";
import ChatListTable from "../components/ChatListView/ChatListTable";
import ChatRoomModal from "../components/ChatListView/ChatRoomModal";
import EndPoint from "../config/EndPoint";
import socketio from "socket.io-client";
import {useSelector} from "react-redux";

const cx = className.bind(style);

const socket = socketio.connect(EndPoint.chatServer);

const ChatListView = () => {

  const profile = useSelector(state => state.profile);

  const [chatServerUrl, setChatServerUrl] = useState(EndPoint.chatServer);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [chatContent, setChatContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('');
  const [currentGuest, setCurrentGuest] = useState('');
  const messagesRef = useRef(() => React.createRef());

  useEffect(() => {
    getChatRoomList(profile.userId);
  }, []);

  useEffect(() => {
    socket.off('receiveMessage');
    socket.on('receiveMessage', (text, userId) => {
        addChatMessages(text, userId)
      }
    );
  }, [chatMessages]);

  const joinRoom = (roomId) => {
    socket.emit('joinRoom', roomId);
  };

  const leaveRoom = (roomId) => {
    socket.emit('leaveRoom', roomId);
  };

  const addChatMessages = (message, userId) => {
    setChatMessages([
      ...chatMessages,
      {
        _id: uuid(),
        content: message,
        userId: userId
      }
    ]);
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  };

  const getChattingList = (roomId) => {
    axios(chatServerUrl + 'chat/getChatHistory/' + roomId)
      .then(response => {
        const _chatMessages = response.data.data;
        setChatMessages(_chatMessages);
        socket.on('receiveMessage', (text, userId) => {
            setChatMessages([
              ...chatMessages,
              {
                _id: uuid(),
                content: text,
                userId: userId
              }
            ]);
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
          }
        );
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getChatRoomList = (userId) => {
    axios(`${chatServerUrl}chat/getChatRoomListByOwnerId/${userId}`)
      .then(response => {
        const _roomList = response.data.data;
        setChatRoomList(_roomList);
      })
      .catch(err => {
        console.error(err)
      })
  };

  const setModalOpen = (status, roomId, guestId) => {
    setIsModalOpen(status);
    setCurrentRoom(roomId);
    setCurrentGuest(guestId);

    if (status === true) {
      joinRoom(roomId);
      getChattingList(roomId);
    } else {
      leaveRoom(roomId);
    }
  };

  const onChangeText = (content) => {
    setChatContent(content.target.value);
  };

  const handleEnter = (e) => {
    var code = e.keyCode || e.which;
    if (code !== 13) { //Enter keycode
      return;
    }

    const text = chatContent;
    if (text === '') return;
    setChatContent('');

    socket.emit('chatMessage', currentRoom, text, profile.userId);
  };


  return (
    <div className={cx('defaultBackground')}>
      <DefaultHeader title={'채팅방 목록'}/>
      <DefaultMainBody menuIndex={4}>
        <ChatListTable
          chatRoomList={chatRoomList}
          setModalOpen={setModalOpen}
        />
        <ChatRoomModal
          chatMessages={chatMessages}
          chatContent={chatContent}
          isModalOpen={isModalOpen}
          messagesRef={messagesRef}
          onChangeText={onChangeText}
          onEnterEvent={handleEnter}
          setModalOpen={setModalOpen}
          currentRoom={currentRoom}
          currentGuest={currentGuest}
        />
      </DefaultMainBody>
    </div>
  )

};

export default ChatListView;