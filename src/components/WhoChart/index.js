import React from 'react';
import { Chart } from "react-google-charts";

export default function WhoChart(props) {
    const dataChart = props.data;

    return (
        <Chart
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={dataChart.data}
            options={{
                title: dataChart.title,
                height: 300,
                hAxis: {
                    title: dataChart.hAxis,
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
                    title: dataChart.vAxis,
                    viewWindow:{
                        max: dataChart.max,
                        min: dataChart.min
                    }
                    
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
                        lineDashStyle: [1,1], // [8] [4, 1] [1, 1] [2, 2]
                        lineWidth: 4,
                        visibleInLegend: false
                    },
                },
            }}
        />
    );
}