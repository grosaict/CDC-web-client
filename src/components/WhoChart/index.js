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
                    /* baseline: 24, */
                    gridlines: {
                        //color: '#fff',
                        minSpacing: 1,
                        count: 'number',
                        interval: 2,
                    },
                    minorGridlines : {
                        color: '#fff',
                    },
                },
                vAxis: {
                    title: dataChart.data.vAxis,
                },
                curveType: 'function',
                legend: {
                    position: 'right',
                    alignment: 'center',
                },
                series: {
                    0: { color: 'black' },
                    6: { color: 'black' },
                    1: { color: 'red' },
                    5: { color: 'red' },
                    2: { color: '#E8E11A' },
                    4: { color: '#E8E11A' },
                    3: { color: 'lightgreen' },
                    7: {
                        color: 'blue',
                        lineDashStyle: [8],
                        lineWidth: 4,
                        visibleInLegend: false,
                    },
                },
            }}
        />
    );
}