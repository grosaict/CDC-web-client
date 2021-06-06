import React from 'react';
import Card from '@material-ui/core/Card';

import WhoChart from '../WhoChart';

export default function MeasuresCharts(props) {
    const kid               = props.data;
    const weightChartData   = setWeightChart(kid);
    const lengthChartData   = setWeightChart(kid);
    const headChartData     = setWeightChart(kid);

    function setWeightChart(k) {
        let indexWHO, paramTitle

        if (k.gender === 'F') {
            indexWHO = 0    // ###### GIRL's DATA ######
            paramTitle = 'Gráfico de peso para meninas de 0 a 2 anos'
        } else {
            indexWHO = 1    // ###### BOYS's DATA ######
            paramTitle = 'Gráfico de peso para meninos de 0 a 2 anos'
        }

        const weightDataWHO =   [
                                    //  ###### index 0 = GIRL's DATA ######
                                    [
                                    //  ['x', '3', '2', '1', '0', '-1', '-2', '-3', k.name],
                                        [0, 4.8, 4.2, 3.7, 3.2, 2.8, 2.4, 2.0],
                                        [1, 6.2, 5.5, 4.8, 4.2, 3.6, 3.2, 2.7],
                                        [2, 7.5, 6.6, 5.8, 5.1, 4.5, 3.9, 3.4],
                                        [3, 8.5, 7.5, 6.6, 5.8, 5.2, 4.5, 4.0],
                                        [4, 9.3, 8.2, 7.3, 6.4, 5.7, 5.0, 4.4],
                                        [5, 10.0, 8.8, 7.8, 6.9, 6.1, 5.4, 4.8],
                                        [6, 10.6, 9.3, 8.2, 7.3, 6.5, 5.7, 5.1],
                                        [7, 11.1, 9.8, 8.6, 7.6, 6.8, 6.0, 5.3],
                                        [8, 11.6, 10.2, 9.0, 7.9, 7.0, 6.3, 5.6],
                                        [9, 12.0, 10.5, 9.3, 8.2, 7.3, 6.5, 5.8],
                                        [10, 12.4, 10.9, 9.6, 8.5, 7.5, 6.7, 5.9],
                                        [11, 12.8, 11.2, 9.9, 8.7, 7.7, 6.9, 6.1],
                                        [12, 13.1, 11.5, 10.1, 8.9, 7.9, 7.0, 6.3],
                                        [13, 13.5, 11.8, 10.4, 9.2, 8.1, 7.2, 6.4],
                                        [14, 13.8, 12.1, 10.6, 9.4, 8.3, 7.4, 6.6],
                                        [15, 14.1, 12.4, 10.9, 9.6, 8.5, 7.6, 6.7],
                                        [16, 14.5, 12.6, 11.1, 9.8, 8.7, 7.7, 6.9],
                                        [17, 14.8, 12.9, 11.4, 10.0, 8.9, 7.9, 7.0],
                                        [18, 15.1, 13.2, 11.6, 10.2, 9.1, 8.1, 7.2],
                                        [19, 15.4, 13.5, 11.8, 10.4, 9.2, 8.2, 7.3],
                                        [20, 15.7, 13.7, 12.1, 10.6, 9.4, 8.4, 7.5],
                                        [21, 16.0, 14.0, 12.3, 10.9, 9.6, 8.6, 7.6],
                                        [22, 16.4, 14.3, 12.5, 11.1, 9.8, 8.7, 7.8],
                                        [23, 16.7, 14.6, 12.8, 11.3, 10.0, 8.9, 7.9],
                                        [24, 17.0, 14.8, 13.0, 11.5, 10.2, 9.0, 8.1]
                                    ],
                                    //  ###### index 1 = BOYS's DATA ######
                                    [
                                    //  ['x', '3', '2', '1', '0', '-1', '-2', '-3', k.name],
                                        [0, 5.0, 4.4, 3.9, 3.3, 2.9, 2.5, 2.1],
                                        [1, 6.6, 5.8, 5.1, 4.5, 3.9, 3.4, 2.9],
                                        [2, 8.0, 7.1, 6.3, 5.6, 4.9, 4.3, 3.8],
                                        [3, 9.0, 8.0, 7.2, 6.4, 5.7, 5.0, 4.4],
                                        [4, 9.7, 8.7, 7.8, 7.0, 6.2, 5.6, 4.9],
                                        [5, 10.4, 9.3, 8.4, 7.5, 6.7, 6.0, 5.3],
                                        [6, 10.9, 9.8, 8.8, 7.9, 7.1, 6.4, 5.7],
                                        [7, 11.4, 10.3, 9.2, 8.3, 7.4, 6.7, 5.9],
                                        [8, 11.9, 10.7, 9.6, 8.6, 7.7, 6.9, 6.2],
                                        [9, 12.3, 11.0, 9.9, 8.9, 8.0, 7.1, 6.4],
                                        [10, 12.7, 11.4, 10.2, 9.2, 8.2, 7.4, 6.6],
                                        [11, 13.0, 11.7, 10.5, 9.4, 8.4, 7.6, 6.8],
                                        [12, 13.3, 12.0, 10.8, 9.6, 8.6, 7.7, 6.9],
                                        [13, 13.7, 12.3, 11.0, 9.9, 8.8, 7.9, 7.1],
                                        [14, 14.0, 12.6, 11.3, 10.1, 9.0, 8.1, 7.2],
                                        [15, 14.3, 12.8, 11.5, 10.3, 9.2, 8.3, 7.4],
                                        [16, 14.6, 13.1, 11.7, 10.5, 9.4, 8.4, 7.5],
                                        [17, 14.9, 13.4, 12.0, 10.7, 9.6, 8.6, 7.7],
                                        [18, 15.3, 13.7, 12.2, 10.9, 9.8, 8.8, 7.8],
                                        [19, 15.6, 13.9, 12.5, 11.1, 10.0, 8.9, 8.0],
                                        [20, 15.9, 14.2, 12.7, 11.3, 10.1, 9.1, 8.1],
                                        [21, 16.2, 14.5, 12.9, 11.5, 10.3, 9.2, 8.2],
                                        [22, 16.5, 14.7, 13.2, 11.8, 10.5, 9.4, 8.4],
                                        [23, 16.8, 15.0, 13.4, 12.0, 10.7, 9.5, 8.5],
                                        [24, 17.1, 15.3, 13.6, 12.2, 10.8, 9.7, 8.6]
                                    ]
                                ]

        let paramData   = []
        paramData[0]    = ['x', '3', '2', '1', '0', '-1', '-2', '-3', k.name]
        let isSetW      = false
        for (let index = 0; index < k.measures.table.length; index++) {
            paramData[index+1]          = weightDataWHO[indexWHO][index]
            if (k.measures.table[index].isSetW) {
                paramData[index+1][8]   = k.measures.table[index].weight
                isSetW                  = true
            } else {
                paramData[index+1][8]      = null
            }
        }
        console.log(paramData)  // #### APAGAR

        return isSetW ? {
                            title:  paramTitle,
                            data:   paramData,
                            hAxis: 'Idade (meses)',
                            vAxis: 'Peso (kg)'
                        } : null
    }

    return (
        <>
            { kid && kid._id ? <>
                <>
                    <Card className="card-detail">
                        <div className="main-wrapper">
                            <div className="title-container"> 
                                { weightChartData ? <WhoChart data={weightChartData}/> : <p>Medidas de peso não informadas</p> }
                            </div>
                        </div>
                    </Card>

                    <Card className="card-detail">
                        <div className="main-wrapper">
                            <div className="title-container"> 
                                { lengthChartData ? <WhoChart data={lengthChartData}/> : <p>Medidas de estatura não informadas</p> }
                            </div>
                        </div>
                    </Card>

                    <Card className="card-detail">
                        <div className="main-wrapper">
                            <div className="title-container"> 
                                { headChartData ? <WhoChart data={headChartData}/> : <p>Medidas do perímetro cefálico não informadas</p> }
                            </div>
                        </div>
                    </Card>
                </>
            </> 
            : null}
        </>
    );
}