import React from "react";
import {Paper,Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const itemStyle = makeStyles({
  paper : {
    display : "flex",
    flexDirection : "column"
  }
})

const ChatListItem = ({chatRoomData}) => {
  const styles = itemStyle();
  const {notiNum,isValid,ownerID,guestId,shopName,lastChatDate} = chatRoomData;

  return (
    <Paper className={styles.paper}>
      <Typography>{guestId}님과의 채팅방</Typography>
      <div>마지막으로 채팅한 날짜 : {lastChatDate}</div>
    </Paper>
  )
};

export default ChatListItem;