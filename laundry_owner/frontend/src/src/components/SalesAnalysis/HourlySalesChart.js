import React from "react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import className from "classnames";
import style from "./HourlySalesChart.scss";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ToggleButton} from "@material-ui/lab";
import {CHARTMODE} from "../../pages/HourlySalesView";

const customStyle = makeStyles({

  chartDate: {
    marginLeft: '20px',
    marginTop: '20px'
  },
  toggleBtn: {
    width: '40px',
    height: '40px',
    padding: 0,
    marginTop: '10px'
  }

});

const cx = className.bind(style);

const HourlySalesChart = ({
                            chartData, chartMode,
                            getChartData, setChartMode
                          }) => {

  const chartStyle = customStyle();

  return (
    <div className={cx('chartDiv')}>
      <div className={cx('chartHeader')}>
        <Typography
          className={chartStyle.chartDate}
          variant={"h6"}
          gutterBottom>
          2020.01.15 수
        </Typography>

        <ToggleButton
          className={chartStyle.toggleBtn}
          style={{marginLeft: 'auto', marginRight: '5px'}}
          onClick={() => getChartData(CHARTMODE.DAILY)}
        >
          일간
        </ToggleButton>
        <ToggleButton
          className={chartStyle.toggleBtn}
          style={{marginRight: '5px'}}
          onClick={() => getChartData(CHARTMODE.WEEKLY)}
        >
          주간
        </ToggleButton>
        <ToggleButton
          className={chartStyle.toggleBtn}
          style={{marginRight: '10px'}}
          onClick={() => getChartData(CHARTMODE.MONTHLY)}
        >
          월간
        </ToggleButton>
      </div>

      <BarChart
        width={800}
        height={250}
        data={chartData}
      >
        <CartesianGrid strokeDasharray="2 10"/>
        {
          chartMode === CHARTMODE.DAILY || chartMode === CHARTMODE.WEEKLY ?
            (
              <XAxis dataKey="order" name={"시간대"} stroke="#A0A0A0" tickLine={false}/>
            ) : null
        }
        {
            chartMode === CHARTMODE.MONTHLY ? (
              <XAxis dataKey="month" name={"시간대"} stroke="#A0A0A0" tickLine={false}/>
          ) : null
        }
        <YAxis stroke="#A0A0A0" tickLine={false}/>
        <Tooltip cursor={{fill: "none"}}/>
        {
          chartMode === CHARTMODE.DAILY ? (
            <Bar dataKey="daily_total" barSize={8} fill="#F1AFA6"/>
          ) : null
        }
        {
          chartMode === CHARTMODE.WEEKLY ? (
            <Bar dataKey="weekly_total" barSize={8} fill="#F1AFA6"/>
          ) : null
        }
        {
          chartMode === CHARTMODE.MONTHLY ? (
            <Bar dataKey="monthly_total" barSize={8} fill="#F1AFA6"/>
          ) : null
        }
      </BarChart>


    </div>
  )
};

export default HourlySalesChart;