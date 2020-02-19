import React, {useEffect, useState} from "react";
import className from 'classnames'
import style from '../components/Common/Background.scss';
import DefaultHeader from "../components/Header/DefaultHeader";
import DefaultMainBody from "../components/Common/DefaultMainBody";
import HourlySalesChart from "../components/SalesAnalysis/HourlySalesChart";
import AnalysisTable from "../components/SalesAnalysis/AnalysisTable";
import axios from 'axios';
import EndPoint from "../config/EndPoint";
import {useSelector} from "react-redux";


const cx = className.bind(style);

export const CHARTMODE = {
  DAILY: 0x01,
  WEEKLY: 0x02,
  MONTHLY: 0x03
};

const HourlySalesView = () => {

  const profile = useSelector(state => state.profile);

  const [chartData,setChartData] = useState([]);
  const [chartMode,setChartMode] = useState(CHARTMODE.DAILY);

  const getChartData = (mode = CHARTMODE.DAILY) => {
    let url = '';
    switch (mode) {
      case CHARTMODE.MONTHLY:
        url = `${EndPoint.logicServer}/mylaundry/statistic/time_monthly/money/${profile.shopId}`;
        break;
      case CHARTMODE.WEEKLY:
        url = `${EndPoint.logicServer}/mylaundry/statistic/time_weekly/money/${profile.shopId}`;
        break;
      case CHARTMODE.DAILY:
      default:
        url = `${EndPoint.logicServer}/mylaundry/statistic/time_daily/money/${profile.shopId}`;
        break;
    }
    axios.get(url)
      .then(response=>{
        if(response.data.response!=='success'){
          alert('매출 정보를 받아오는데 오류가 발생했습니다.');
          return;
        }
        setChartMode(mode);
        setChartData(response.data.data.reverse());
      });
  };

  useEffect(() => {
    getChartData()
  },[]);

  return (
    <div className={cx('defaultBackground')}>
      <DefaultHeader title={"통계"}/>
      <DefaultMainBody menuIndex={5}>
        <HourlySalesChart
          chartMode={chartMode}
          chartData={chartData}
          getChartData={getChartData}
          setChartMode={setChartMode}
        />
        <AnalysisTable
          chartData={chartData}
          chartMode={chartMode}
        />
      </DefaultMainBody>
    </div>
  )
};


export default HourlySalesView;
