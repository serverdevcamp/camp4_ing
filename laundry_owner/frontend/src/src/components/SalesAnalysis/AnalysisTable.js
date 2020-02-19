import React from "react";
import {TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {CHARTMODE} from "../../pages/HourlySalesView";

const tableStyle = makeStyles({

  container: {
    marginTop: '30px'
  },

  table: {
    minWidth: '600px'
  },
});

const AnalysisTable = ({chartData, chartMode}) => {

  const style = tableStyle();

  return (
    <TableContainer component={Paper} className={style.container}>
      <Table className={style.table}>
        <TableHead>
          <TableCell>날짜</TableCell>
          <TableCell align={'right'}>매출액(원)</TableCell>
        </TableHead>
        <TableBody>
          {chartData.map(item => (
              <TableRow key={item.date}>
                {chartMode === CHARTMODE.DAILY || chartMode === CHARTMODE.WEEKLY ?
                  <TableCell component={'th'} scope={'row'}> {item.order} </TableCell>
                  : null
                }
                {chartMode === CHARTMODE.MONTHLY ?
                  (<TableCell component={'th'} scope={'row'}> {item.month}</TableCell>)
                  : null
                }
                {chartMode === CHARTMODE.DAILY ?
                  (<TableCell align={"right"}> {item.daily_total}</TableCell>)
                  : null
                }
                {chartMode === CHARTMODE.WEEKLY ?
                  (<TableCell align={"right"}> {item.weekly_total}</TableCell>)
                  : null
                }
                {chartMode === CHARTMODE.MONTHLY ?
                  (<TableCell align={"right"}> {item.monthly_total}</TableCell>)
                  : null
                }
              </TableRow>
            )
          )}

        </TableBody>

      </Table>

    </TableContainer>
  );
};

export default AnalysisTable;