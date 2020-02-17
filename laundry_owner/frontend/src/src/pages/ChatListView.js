import React from "react";
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

const cx = className.bind(style);

const socket = socketio.connect(EndPoint.chatServer);

class ChatListView extends React.Component {

  state = {
    chatServerUrl: EndPoint.chatServer,
    chatMessages: [],
    chatRoomList: [],
    chatContent: '',
    isModalOpen: false,
    currentRoom: '',
    currentGuest: '',
  };

  constructor(props) {
    super(props);
    this.messagesRef = React.createRef();
  }

  componentDidMount() {
    this.getChatRoomList("owner1");

    socket.on('receiveMessage', (text, userId) => {
      this.setState({
        chatMessages: [
          ...this.state.chatMessages,
          {
            _id: uuid(),
            content: text,
            userId: userId
          }
        ]
      });

      //스크롤 아래로
      this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
    })
  }

  joinRoom(roomId) {
    socket.emit('joinRoom', roomId);
  }

  leaveRoom(roomId) {
    socket.emit('leaveRoom', roomId);
  };

  getChattingList(roomId) {
    axios(this.state.chatServerUrl + 'chat/getChatHistory/' + roomId)
      .then(response => {
        const _chatMessages = response.data.data;
        this.setState({
          chatMessages: _chatMessages
        });
        this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
      })
      .catch(err => {
        console.log(err);
      });
  };

  getChatRoomList(userId) {
    axios(`${this.state.chatServerUrl}chat/getChatRoomListByOwnerId/${userId}`)
      .then(response => {
        const _roomList = response.data.data;
        console.log(_roomList);
        this.setState({
          chatRoomList: _roomList
        });
      })
      .catch(err => {
        console.error(err)
      })
  }

  setModalOpen = (status,roomId,guestId) => {
    this.setState({
      isModalOpen: status,
      currentRoom : roomId,
      currentGuest : guestId
    });
    if (status === true) {
      this.joinRoom(roomId);
      this.getChattingList(roomId);
    } else {
      this.leaveRoom(roomId);
    }
  };

  onChangeText = (content) => {
    this.setState({
      chatContent: content.target.value
    })
  };

  handleEnter = (e) => {
    var code = e.keyCode || e.which;
    if (code !== 13) { //Enter keycode
      return;
    }

    const text = this.state.chatContent;
    if (text === '') return;
    this.setState({
      chatContent: ''
    });

    socket.emit('chatMessage', this.state.currentRoom, text, 'owner1');
  };


  render() {
    const {chatMessages, isModalOpen, chatContent, chatRoomList,currentRoom,currentGuest} = this.state;

    return (
      <div className={cx('defaultBackground')}>
        <DefaultHeader title={'채팅방 목록'}/>
        <DefaultMainBody menuIndex={4}>
          <ChatListTable
            chatRoomList={chatRoomList}
            setModalOpen={this.setModalOpen}
          />
          <ChatRoomModal
            chatMessages={chatMessages}
            chatContent={chatContent}
            isModalOpen={isModalOpen}
            messagesRef={this.messagesRef}
            onChangeText={this.onChangeText}
            onEnterEvent={this.handleEnter}
            setModalOpen={this.setModalOpen}
            currentRoom={currentRoom}
            currentGuest={currentGuest}
          />
        </DefaultMainBody>
      </div>
    )
  }

}

export default ChatListView;