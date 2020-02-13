import React from "react";
import {Box, InputBase, Modal, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ClearIcon from '@material-ui/icons/Clear';
import ChatIcon from '@material-ui/icons/Chat';
import ChatMessages from "./ChatMessages";

const modalStyle = makeStyles({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display : 'flex',
    padding : '10px'
  },
  exitIcon: {
    marginLeft: 'auto',
    cursor : 'pointer'
  },
  chatContent: {
    flex : '10',
    borderTop : '1px solid #cccccc',
    borderBottom : '1px solid #cccccc'
  },
  chatInputDiv: {
    flex : '1',
    background : 'white',
    display : 'flex',
    padding : '5px',
    justifyContent : 'center',
    alignItems : 'center'
  },
  chatInput: {
    flex : '1',
    height : '100%',
    border : 'none',
    fontSize : '16px',
    outline : 'none'
  }

});

const ChatRoomModal = ({isModalOpen,chatMessages,setModalOpen,chatContent,
                         onEnterEvent, onChangeText,messagesRef, currentRoom,
                         currentGuest}) => {

  const style = modalStyle();

  return (
    <Modal
      open={isModalOpen}>
      <Paper
        className={style.paper}
        style={{width: '400px', height: '500px'}}>
        <Box className={style.header}>
          <Typography variant={'button'}>{currentGuest}님과의 채팅방</Typography>
          <ClearIcon
            className={style.exitIcon}
            onClick={()=>setModalOpen(false,currentRoom,null)}
          />

        </Box>
        <Box className={style.chatContent}>
          <ChatMessages
            chatMessages={chatMessages}
            messagesRef={messagesRef}
          />
        </Box>
        <Box className={style.chatInputDiv}>
          <InputBase
            className={style.chatInput}
            placeholder={"Type your Message"}
            onKeyUp={onEnterEvent}
            value={chatContent}
            onChange={onChangeText}
          />
          <ChatIcon
            style={{cursor : 'pointer', color : "#35AD3A"}}/>
        </Box>
      </Paper>
    </Modal>
  )
};

export default ChatRoomModal;