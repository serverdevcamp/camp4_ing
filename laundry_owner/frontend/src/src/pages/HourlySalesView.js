import React from "react";
import className from 'classnames'
import style from '../components/Common/Background.scss';
import DefaultHeader from "../components/Header/DefaultHeader";
import DefaultMainBody from "../components/Common/DefaultMainBody";
import {Bar, BarChart, CartesianGrid, Line, Tooltip, XAxis, YAxis} from "recharts";

const cx = className.bind(style);

class HourlySalesView extends React.Component{

    render() {

        const data = [{name: 'pageA',uv:400},{name: 'pageB',uv:500},{name:'pageC',uv:302},
            {name: 'pageA',uv:400},{name: 'pageB',uv:500},{name:'pageC',uv:302},
            {name: 'pageA',uv:400},{name: 'pageB',uv:500},{name:'pageC',uv:302},
            {name: 'pageA',uv:400},{name: 'pageB',uv:500},{name:'pageC',uv:302},
            {name: 'pageA',uv:400},{name: 'pageB',uv:500},{name:'pageC',uv:302},
            {name: 'pageA',uv:400},{name: 'pageB',uv:500},{name:'pageC',uv:302}];

        return(
            <div className={cx('defaultBackground')}>
                <DefaultHeader title={"리뷰 관리"}/>
                <DefaultMainBody menuIndex={4}>
                    <BarChart width={600} height={300} data={data}>
                    <XAxis dataKey="name" />
                    <YAxis/>
                    <Tooltip fill={"#ffffff"}/>
                    <Bar type={"monotone"} dataKey={"uv"} barSize={15} fill={"#BAC8FF"} />
                    </BarChart>
                </DefaultMainBody>
            </div>

        )
    }
}


export default HourlySalesView;
