import React from "react";
import {Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const style = makeStyles({
  messageContent: {
    overflow: 'auto',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    outline: 'none'
  },
  messageRow: {
    display: 'flex',
  },

  yourMessage: {
    borderRadius: '20px',
    maxWidth: '200px',
    display: 'inline-block',
    margin: '5px',
    marginRight: 'auto',
    padding: '8px'
  },
  myMessage: {
    borderRadius: '20px',
    display: 'inline-block',
    maxWidth: '200px',
    margin: '5px',
    padding: '8px',
    marginLeft: 'auto',
    background: "#327BF6",
    color: "#ffffff"
  }
});

const ChatMessages = ({chatMessages,messagesRef}) => {

  const chatStyle = style();
  const currentId = 'owner1';

  return (
    <div
      className={chatStyle.messageContent}
      ref={messagesRef}
    >
      {
        chatMessages.map(chatItem => (
            chatItem.userId === currentId ? (
              <Paper key={chatItem._id} className={chatStyle.myMessage}>
                <Typography variant={"body2"}>{chatItem.content}</Typography>
              </Paper>

            ) : (
              <Paper key={chatItem._id} className={chatStyle.yourMessage}>
                <Typography variant={"body2"}>{chatItem.content}</Typography>
              </Paper>
            )
          )
        )
      }

    </div>
  )
};

export default ChatMessages;