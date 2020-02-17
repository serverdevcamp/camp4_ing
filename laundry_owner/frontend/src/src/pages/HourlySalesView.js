import React from "react";
import className from 'classnames'
import style from '../components/Common/Background.scss';
import styles from '../components/SalesAnalysis/HourlySalesChart.scss';
import DefaultHeader from "../components/Header/DefaultHeader";
import DefaultMainBody from "../components/Common/DefaultMainBody";
import HourlySalesChart from "../components/SalesAnalysis/HourlySalesChart";
import AnalysisTable from "../components/SalesAnalysis/AnalysisTable";


const cx = className.bind(style);

class HourlySalesView extends React.Component {

  render() {
    return (
      <div className={cx('defaultBackground')}>
        <DefaultHeader title={"통계"}/>
        <DefaultMainBody menuIndex={5}>
          <HourlySalesChart/>
          <AnalysisTable/>
        </DefaultMainBody>
      </div>

    )
  }
}


export default HourlySalesView;
