import React from "react";
import {Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";

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

const data = [
  {
    no: 1,
    deliveryAddress: "경기 성남시 분당구 판교로 344",
    pickupAddress: "경기 성남시 분당구 판교로 344",
    content: "와이셔츠2, 청바지3",
    price: 20000,
    status: "세탁 대기중",
  },
  {
    no: 2,
    deliveryAddress: "경기 성남시 분당구 판교로 344",
    pickupAddress: "경기 성남시 분당구 판교로 344",
    content: "와이셔츠4, 청바지3",
    price: 110000,
    status: "세탁 완료",
  },
  {
    no: 3,
    deliveryAddress: "경기 성남시 분당구 판교로 344",
    pickupAddress: "경기 성남시 분당구 판교로 344",
    content: "와이셔츠2, 청바지3",
    price: 20000,
    status: "세탁 대기중",
  },
  {
    no: 4,
    deliveryAddress: "경기 성남시 분당구 판교로 344",
    pickupAddress: "경기 성남시 분당구 판교로 344",
    content: "와이셔츠4, 청바지3",
    price: 110000,
    status: "세탁 완료",
  },

  {
    no: 5,
    deliveryAddress: "경기 성남시 분당구 판교로 344",
    pickupAddress: "경기 성남시 분당구 판교로 344",
    content: "와이셔츠2, 청바지3",
    price: 20000,
    status: "세탁 대기중",
  },
  {
    no: 6,
    deliveryAddress: "경기 성남시 분당구 판교로 344",
    pickupAddress: "경기 성남시 분당구 판교로 344",
    content: "와이셔츠4, 청바지3",
    price: 110000,
    status: "세탁 완료",
  },
  {
    no: 7,
    deliveryAddress: "경기 성남시 분당구 판교로 344",
    pickupAddress: "경기 성남시 분당구 판교로 344",
    content: "와이셔츠2, 청바지3",
    price: 20000,
    status: "세탁 대기중",
  },
  {
    no: 8,
    deliveryAddress: "경기 성남시 분당구 판교로 344",
    pickupAddress: "경기 성남시 분당구 판교로 344",
    content: "와이셔츠4, 청바지3",
    price: 110000,
    status: "세탁 완료",
  },
  {
    no: 9,
    deliveryAddress: "경기 성남시 분당구 판교로 344",
    pickupAddress: "경기 성남시 분당구 판교로 344",
    content: "와이셔츠2, 청바지3",
    price: 20000,
    status: "세탁 대기중",
  },
  {
    no: 19,
    deliveryAddress: "경기 성남시 분당구 판교로 344",
    pickupAddress: "경기 성남시 분당구 판교로 344",
    content: "와이셔츠4, 청바지3",
    price: 110000,
    status: "세탁 완료",
  },
];

const OrderTable = () => {
  const style = tableStyle();
  return (
    <TableContainer component={Paper}>
      <Table className={style.table}>
        <TableHead>
          <TableRow>
            <TableCell>no</TableCell>
            <TableCell className={style.headerCell}>배달주소</TableCell>
            <TableCell className={style.headerCell}>수거주소</TableCell>
            <TableCell align={"right"} className={style.headerCell}>내용</TableCell>
            <TableCell align={"right"} className={style.headerCell}>가격</TableCell>
            <TableCell align={"right"} className={style.headerCell}>상태</TableCell>
            <TableCell align={"right"} className={style.headerCell}>수정</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.no} className={style.row}>
              <TableCell>{item.no}</TableCell>
              <TableCell><span className={style.cell}>{item.deliveryAddress}</span></TableCell>
              <TableCell><span className={style.cell}>{item.deliveryAddress}</span></TableCell>
              <TableCell>{item.content}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.status}</TableCell>
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
          count={0} onChangePage={0} page={0} rowsPerPage={0}/>
      </div>

    </TableContainer>
  )
};

export default OrderTable;