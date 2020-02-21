import React from "react";
import {TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {CHARTMODE} from "../../pages/HourlySalesView";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";

const tableStyle = makeStyles({

  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px'
  },
  table: {
    minWidth: '600px'
  },
  pageNation: {
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

const AnalysisTable = ({
                         chartData, chartMode, currentPage,
                         setCurrentPage
                       }) => {

  const style = tableStyle();


  let index = 0;
  const rowPerPage = 6;

  return (
    <TableContainer component={Paper} className={style.container}>
      <Table className={style.table}>
        <TableHead>
          <TableRow>
            <TableCell>날짜</TableCell>
            <TableCell align={'right'}>매출액(원)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chartData.slice((currentPage) * rowPerPage, (currentPage + 1) * rowPerPage).map(item => (
              <TableRow key={index++}>
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

      <TablePaginationActions
        className={style.pageNation}
        count={chartData.length}
        onChangePage={(event, page) => setCurrentPage(page)}
        page={currentPage}
        rowsPerPage={rowPerPage}
      />
    </TableContainer>
  );
};

export default AnalysisTable;