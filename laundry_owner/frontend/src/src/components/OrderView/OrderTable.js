import React, {useEffect, useState} from "react";
import {Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import SearchIcon from '@material-ui/icons/Search';

const tableStyle = makeStyles({
  table: {
    width: '100%',
  },
  headerCell: {
    textAlign: 'center'
  },
  cell: {
    width: '150px',
    height: '520x',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    display: 'block',
    overflow: 'hidden'
  },

});

const OrderTable = ({
                      orders,
                      setModalOpen, setModalInfo
                    }) => {
  const style = tableStyle();

  let index = 1;

  const [currentPage, setCurrentPage] = useState(0);

  const statusToString = (status) => {
    switch (status) {
      case 'ready':
        return '미결제';
      case 'paid':
        return '결제완료';
      case 'cancelled':
        return '결제취소';
      case 'failed':
        return '결제실패';
      case 'waiting':
        return '세탁대기';
      case 'process':
        return '세탁처리';
      case 'finished':
        return '세탁완료';
      default:
        return 'error';
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={style.table}>
        <TableHead>
          <TableRow>
            <TableCell>no</TableCell>
            <TableCell align={"center"}>배달주소</TableCell>
            <TableCell align={"center"}>수거주소</TableCell>
            <TableCell align={"center"}>내용</TableCell>
            <TableCell align={"center"}>가격</TableCell>
            <TableCell align={"center"}>상태</TableCell>
            <TableCell align={"center"}>정보</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.slice(currentPage*8,(currentPage+1)*8).map(item => (
            <TableRow key={index} className={style.row}>
              <TableCell>{currentPage*8 + index++}</TableCell>
              <TableCell align={"center"}><span className={style.cell}>{item.delivery_address}</span></TableCell>
              <TableCell align={"center"}><span className={style.cell}>{item.pickup_address}</span></TableCell>
              <TableCell align={"center"}>
                {item.orderitem.map(orderItem => (
                  (`${orderItem.laundry_item.category} ${orderItem.quantity}`)
                ))}
              </TableCell>
              <TableCell align={"center"}>{item.total_price}</TableCell>
              <TableCell align={"center"}>{statusToString(item.status)}</TableCell>
              <TableCell>
                <SearchIcon
                  style={{cursor: "pointer", color: "#35AD3A"}}
                  onClick={() => {
                    setModalOpen(true);
                    setModalInfo(item.id,statusToString(item.status), item.total_price, item.pickup_address,
                      item.delivery_address, item.created_at, item.orderitem);
                  }}
                /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{display: 'flex'}}>
        <TablePaginationActions
          style={{
            marginLeft: "auto",
            marginRight: 'auto'
          }}
          count={orders.length} onChangePage={(e,newPage)=>setCurrentPage(newPage)} page={currentPage} rowsPerPage={8}/>
      </div>

    </TableContainer>
  )
};

export default OrderTable;