import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import style from "./ChatListTable.scss";
import className from 'classnames';
import ChatIcon from '@material-ui/icons/Chat';
import DeleteIcon from '@material-ui/icons/Delete';

const cx = className.bind(style);

const ChatListTable = ({setModalOpen,chatRoomList}) => {

  const chatRoomData = [{
    notiNum: 0,
    _id: 12345,
    guestId: "guest",
    ownerId: "owner",
    isValid: true,
    shopName: "동천역",
    lastChatDate: "2020.02.12 12:12:31"
  },
    {
      notiNum: 0,
      _id: 2,
      guestId: "guest",
      ownerId: "owner",
      isValid: true,
      shopName: "동천역",
      lastChatDate: "2020.02.12 12:12:31"
    }];


  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align={"center"}>채팅방 번호</TableCell>
            <TableCell align={"center"}>채팅방 명</TableCell>
            <TableCell align={"center"}>마지막으로 채팅한날짜</TableCell>
            <TableCell align={"center"}>action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chatRoomList.map(item => (
            <TableRow key={item._id}>
              <TableCell align={"center"}>{item._id}</TableCell>
              <TableCell align={"center"}>{item.guestId}님과의 채팅방</TableCell>
              <TableCell align={"center"}>{item.lastChatDate}</TableCell>
              <TableCell align={"center"}>
                <ChatIcon
                  style={{color : "#35AD3A", cursor : "pointer"}}
                  onClick={()=>setModalOpen(true,item._id,item.guestId)}
                />
                <DeleteIcon
                  style={{cursor : "pointer"}}/>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default ChatListTable;
