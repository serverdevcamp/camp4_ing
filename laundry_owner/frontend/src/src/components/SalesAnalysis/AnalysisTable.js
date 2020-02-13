import React from "react";
import {TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const tableStyle = makeStyles({

  container: {
    marginTop: '30px'
  },

  table: {
    minWidth: '600px'
  },
});

const data = [
  {
    date: "2020.01.14",
    orderNum: 200,
    amount: 120000
  },
  {
    date: "2020.01.15",
    orderNum: 320,
    amount: 140000
  },
  {
    date: "2020.01.16",
    orderNum: 1220,
    amount: 194030
  }
];

const AnalysisTable = () => {

  const style = tableStyle();

  return (
    <TableContainer component={Paper} className={style.container}>
      <Table className={style.table}>
        <TableHead>
          <TableCell>날짜</TableCell>
          <TableCell align={'right'}>주문량</TableCell>
          <TableCell align={'right'}>매출액(원)</TableCell>
        </TableHead>
        <TableBody>
          {data.map(item => (
              <TableRow key={item.date}>
                <TableCell component={'th'} scope={'row'}> {item.date} </TableCell>
                <TableCell align={"right"}> {item.orderNum} </TableCell>
                <TableCell align={"right"}> {item.amount}</TableCell>
              </TableRow>
            )
          )}

        </TableBody>

      </Table>

    </TableContainer>
  );
};

export default AnalysisTable;