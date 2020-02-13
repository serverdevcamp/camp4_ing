import React from "react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import className from "classnames";
import style from "./HourlySalesChart.scss";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ToggleButton} from "@material-ui/lab";

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

const HourlySalesChart = () => {

  const data = [
    {
      name: '1', sales: 590, pv: 800, amt: 1400,
    },
    {
      name: '2', sales: 868, pv: 967, amt: 1506,
    },
    {
      name: '3', sales: 1397, pv: 1098, amt: 989,
    },
    {
      name: '4', sales: 1480, pv: 1200, amt: 1228,
    },
    {
      name: '5', sales: 1520, pv: 1108, amt: 1100,
    },
    {
      name: '6', sales: 1400, pv: 680, amt: 1700,
    },
    {
      name: '7', sales: 590, pv: 800, amt: 1400,
    },
    {
      name: '8', sales: 868, pv: 967, amt: 1506,
    },
    {
      name: '9', sales: 1397, pv: 1098, amt: 989,
    },
    {
      name: '10', sales: 1480, pv: 1200, amt: 1228,
    },
    {
      name: '11', sales: 1520, pv: 1108, amt: 1100,
    },
    {
      name: '12', sales: 1400, pv: 680, amt: 1700,
    },
    {
      name: '13', sales: 590, pv: 800, amt: 1400,
    },
    {
      name: '14', sales: 868, pv: 967, amt: 1506,
    },
    {
      name: '15', sales: 1397, pv: 1098, amt: 989,
    },
    {
      name: '16', sales: 1480, pv: 1200, amt: 1228,
    },
    {
      name: '17', sales: 1520, pv: 1108, amt: 1100,
    },
    {
      name: '18', sales: 1400, pv: 680, amt: 1700,
    },
    {
      name: '19', sales: 590, pv: 800, amt: 1400,
    },
    {
      name: '20', sales: 868, pv: 967, amt: 1506,
    },
    {
      name: '21', sales: 1397, pv: 1098, amt: 989,
    },
    {
      name: '22', sales: 1480, pv: 1200, amt: 1228,
    },
    {
      name: '23', sales: 1520, pv: 1108, amt: 1100,
    },
    {
      name: '24', sales: 1400, pv: 680, amt: 1700,
    }
  ];

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

        <ToggleButton className={chartStyle.toggleBtn} style={{marginLeft: 'auto', marginRight: '5px'}}>
          일간
        </ToggleButton>
        <ToggleButton className={chartStyle.toggleBtn} style={{marginRight: '5px'}}>
          주간
        </ToggleButton>
        <ToggleButton className={chartStyle.toggleBtn} style={{marginRight: '10px'}}>
          월간
        </ToggleButton>
      </div>

      <BarChart
        width={800}
        height={250}
        data={data}
      >
        <CartesianGrid strokeDasharray="2 10"/>
        <XAxis dataKey="name" name={"시간대"} stroke="#A0A0A0" tickLine={false}/>
        <YAxis stroke="#A0A0A0" tickLine={false}/>
        <Tooltip cursor={{fill: "none"}}/>
        <Bar dataKey="sales" barSize={8} fill="#F1AFA6"/>
      </BarChart>


    </div>
  )
};

export default HourlySalesChart;