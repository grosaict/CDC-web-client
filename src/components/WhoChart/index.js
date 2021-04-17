import React from 'react';
import { Chart } from "react-google-charts";

export default function WhoChart(props) {
    const dataChart = props;

    return (
        <Chart
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={dataChart.data.data}
            options={{
                title: dataChart.data.title,
                height: 300,
                hAxis: {
                    title: dataChart.data.hAxis,
                    format: 0,
                    baseline: 24,
                    gridlines: {
                        minSpacing: 1,
                        count: 'number',
                        interval: 2,
                    },
                },
                vAxis: {
                    title: dataChart.data.vAxis,
                },
                curveType: 'function',
                legend: { position: 'right' },
                /* series: {
                    0: { curveType: 'function' },
                    1: { curveType: 'function' },
                }, */
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
}