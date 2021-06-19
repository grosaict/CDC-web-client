import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import WhoChart from '../WhoChart';

function setWeightChart(k) {
    let indexWHO, paramTitle
    let min = 1
    let max = 18

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
    let isSet       = false
    for (let index = 0; index < k.measures.length; index++) {
        paramData[index+1]      = weightDataWHO[indexWHO][index]
        if (k.measures[index].isSetW){
            isSet                   = true
            paramData[index+1][8]   = (k.measures[index].weight / 1000)
            min = (paramData[index+1][8] < min ?   paramData[index+1][8] : min)
            max = (paramData[index+1][8] > max ?   paramData[index+1][8] : max)
        } else {
            paramData[index+1][8]   = null
        }
        
    }

    return isSet ? {
                        title:  paramTitle,
                        data:   paramData,
                        hAxis: 'Idade (meses)',
                        vAxis: 'Peso (kg)',
                        min:    min,
                        max:    max
                    } : null
}

function setLengthChart(k) {
    let indexWHO, paramTitle
    let min = 43
    let max = 97

    if (k.gender === 'F') {
        indexWHO = 0    // ###### GIRL's DATA ######
        paramTitle = 'Gráfico de altura para meninas de 0 a 2 anos'
    } else {
        indexWHO = 1    // ###### BOYS's DATA ######
        paramTitle = 'Gráfico de altura para meninos de 0 a 2 anos'
    }

    const lenghtDataWHO =   [
                            //  ###### index 0 = GIRL's DATA ######
                                [
                                //  ['x', '3', '2', '1', '0', '-1', '-2', '-3', k.name],
                                    [0, 54.7, 52.9, 51.0, 49.1, 47.3, 45.4, 43.6],
                                    [1, 59.5, 57.6, 55.6, 53.7, 51.7, 49.8, 47.8],
                                    [2, 63.2, 61.1, 59.1, 57.1, 55.0, 53.0, 51.0],
                                    [3, 66.1, 64.0, 61.9, 59.8, 57.7, 55.6, 53.5],
                                    [4, 68.6, 66.4, 64.3, 62.1, 59.9, 57.8, 55.6],
                                    [5, 70.7, 68.5, 66.2, 64.0, 61.8, 59.6, 57.4],
                                    [6, 72.5, 70.3, 68.0, 65.7, 63.5, 61.2, 58.9],
                                    [7, 74.2, 71.9, 69.6, 67.3, 65.0, 62.7, 60.3],
                                    [8, 75.8, 73.5, 71.1, 68.7, 66.4, 64.0, 61.7],
                                    [9, 77.4, 75.0, 72.6, 70.1, 67.7, 65.3, 62.9],
                                    [10, 78.9, 76.4, 73.9, 71.5, 69.0, 66.5, 64.1],
                                    [11, 80.3, 77.8, 75.3, 72.8, 70.3, 67.7, 65.2],
                                    [12, 81.7, 79.2, 76.6, 74.0, 71.4, 68.9, 66.3],
                                    [13, 83.1, 80.5, 77.8, 75.2, 72.6, 70.0, 67.3],
                                    [14, 84.4, 81.7, 79.1, 76.4, 73.7, 71.0, 68.3],
                                    [15, 85.7, 83.0, 80.2, 77.5, 74.8, 72.0, 69.3],
                                    [16, 87.0, 84.2, 81.4, 78.6, 75.8, 73.0, 70.2],
                                    [17, 88.2, 85.4, 82.5, 79.7, 76.8, 74.0, 71.1],
                                    [18, 89.4, 86.5, 83.6, 80.7, 77.8, 74.9, 72.0],
                                    [19, 90.6, 87.6, 84.7, 81.7, 78.8, 75.8, 72.8],
                                    [20, 91.7, 88.7, 85.7, 82.7, 79.7, 76.7, 73.7],
                                    [21, 92.9, 89.8, 86.7, 83.7, 80.6, 77.5, 74.5],
                                    [22, 94.0, 90.8, 87.7, 84.6, 81.5, 78.4, 75.2],
                                    [23, 95.0, 91.9, 88.7, 85.5, 82.3, 79.2, 76.0],
                                    [24, 96.1, 92.9, 89.6, 86.4, 83.2, 80.0, 76.7],
                                ],
                            //  ###### index 1 = BOYS's DATA ######
                                [
                                //  ['x', '3', '2', '1', '0', '-1', '-2', '-3', k.name],
                                    [0, 55.6, 53.7, 51.8, 49.9, 48.0, 46.1, 44.2],
                                    [1, 60.6, 58.6, 56.7, 54.7, 52.8, 50.8, 48.9],
                                    [2, 64.4, 62.4, 60.4, 58.4, 56.4, 54.4, 52.4],
                                    [3, 67.6, 65.5, 63.5, 61.4, 59.4, 57.3, 55.3],
                                    [4, 70.1, 68.0, 66.0, 63.9, 61.8, 59.7, 57.6],
                                    [5, 72.2, 70.1, 68.0, 65.9, 63.8, 61.7, 59.6],
                                    [6, 74.0, 71.9, 69.8, 67.6, 65.5, 63.3, 61.2],
                                    [7, 75.7, 73.5, 71.3, 69.2, 67.0, 64.8, 62.7],
                                    [8, 77.2, 75.0, 72.8, 70.6, 68.4, 66.2, 64.0],
                                    [9, 78.7, 76.5, 74.2, 72.0, 69.7, 67.5, 65.2],
                                    [10, 80.1, 77.9, 75.6, 73.3, 71.0, 68.7, 66.4],
                                    [11, 81.5, 79.2, 76.9, 74.5, 72.2, 69.9, 67.6],
                                    [12, 82.9, 80.5, 78.1, 75.7, 73.4, 71.0, 68.6],
                                    [13, 84.2, 81.8, 79.3, 76.9, 74.5, 72.1, 69.6],
                                    [14, 85.5, 83.0, 80.5, 78.0, 75.6, 73.1, 70.6],
                                    [15, 86.7, 84.2, 81.7, 79.1, 76.6, 74.1, 71.6],
                                    [16, 88.0, 85.4, 82.8, 80.2, 77.6, 75.0, 72.5],
                                    [17, 89.2, 86.5, 83.9, 81.2, 78.6, 76.0, 73.3],
                                    [18, 90.4, 87.7, 85.0, 82.3, 79.6, 76.9, 74.2],
                                    [19, 91.5, 88.8, 86.0, 83.2, 80.5, 77.7, 75.0],
                                    [20, 92.6, 89.8, 87.0, 84.2, 81.4, 78.6, 75.8],
                                    [21, 93.8, 90.9, 88.0, 85.1, 82.3, 79.4, 76.5],
                                    [22, 94.9, 91.9, 89.0, 86.0, 83.1, 80.2, 77.2],
                                    [23, 95.9, 92.9, 89.9, 86.9, 83.9, 81.0, 78.0],
                                    [24, 97.0, 93.9, 90.9, 87.8, 84.8, 81.7, 78.7],                                    
                                ]
                            ]

    let paramData   = []
    paramData[0]    = ['x', '3', '2', '1', '0', '-1', '-2', '-3', k.name]
    let isSet       = false
    for (let index = 0; index < k.measures.length; index++) {
        paramData[index+1]      = lenghtDataWHO[indexWHO][index]
        if (k.measures[index].isSetL){
            isSet                   = true
            paramData[index+1][8]   = parseFloat(k.measures[index].length, 10).toFixed(1) / 1
            min = (paramData[index+1][8] < min ?   paramData[index+1][8] : min)
            max = (paramData[index+1][8] > max ?   paramData[index+1][8] : max)
        } else {
            paramData[index+1][8]   = null
        }
    }

    return isSet ? {
                        title:  paramTitle,
                        data:   paramData,
                        hAxis: 'Idade (meses)',
                        vAxis: 'Altura (cm)',
                        min:    min,
                        max:    max
                    } : null
}

function setHeadChart(k) {
    let indexWHO, paramTitle
    let min = 29
    let max = 52

    if (k.gender === 'F') {
        indexWHO = 0    // ###### GIRL's DATA ######
        paramTitle = 'Gráfico de perímetro cefálico para meninas de 0 a 2 anos'
    } else {
        indexWHO = 1    // ###### BOYS's DATA ######
        paramTitle = 'Gráfico de perímetro cefálico para meninos de 0 a 2 anos'
    }

    const headDataWHO = [
                        //  ###### index 0 = GIRL's DATA ######
                            [
                            //  ['x', '3', '2', '1', '0', '-1', '-2', '-3', k.name],
                                [0, 37.4, 36.2, 35.1, 33.9, 32.7, 31.5, 30.3],
                                [1, 40.1, 38.9, 37.7, 36.5, 35.4, 34.2, 33.0],
                                [2, 41.9, 40.7, 39.5, 38.3, 37.0, 35.8, 34.6],
                                [3, 43.3, 42.0, 40.8, 39.5, 38.3, 37.1, 35.8],
                                [4, 44.4, 43.1, 41.8, 40.6, 39.3, 38.1, 36.8],
                                [5, 45.3, 44.0, 42.7, 41.5, 40.2, 38.9, 37.6],
                                [6, 46.1, 44.8, 43.5, 42.2, 40.9, 39.6, 38.3],
                                [7, 46.8, 45.5, 44.1, 42.8, 41.5, 40.2, 38.9],
                                [8, 47.4, 46.0, 44.7, 43.4, 42.0, 40.7, 39.4],
                                [9, 47.8, 46.5, 45.2, 43.8, 42.5, 41.2, 39.8],
                                [10, 48.3, 46.9, 45.6, 44.2, 42.9, 41.5, 40.2],
                                [11, 48.6, 47.3, 45.9, 44.6, 43.2, 41.9, 40.5],
                                [12, 49.0, 47.6, 46.3, 44.9, 43.5, 42.2, 40.8],
                                [13, 49.3, 47.9, 46.5, 45.2, 43.8, 42.4, 41.1],
                                [14, 49.5, 48.2, 46.8, 45.4, 44.1, 42.7, 41.3],
                                [15, 49.8, 48.4, 47.0, 45.7, 44.3, 42.9, 41.5],
                                [16, 50.0, 48.6, 47.2, 45.9, 44.5, 43.1, 41.7],
                                [17, 50.2, 48.8, 47.4, 46.1, 44.7, 43.3, 41.9],
                                [18, 50.4, 49.0, 47.6, 46.2, 44.9, 43.5, 42.1],
                                [19, 50.6, 49.2, 47.8, 46.4, 45.0, 43.6, 42.3],
                                [20, 50.7, 49.4, 48.0, 46.6, 45.2, 43.8, 42.4],
                                [21, 50.9, 49.5, 48.1, 46.7, 45.3, 44.0, 42.6],
                                [22, 51.1, 49.7, 48.3, 46.9, 45.5, 44.1, 42.7],
                                [23, 51.2, 49.8, 48.4, 47.0, 45.6, 44.3, 42.9],
                                [24, 51.4, 50.0, 48.6, 47.2, 45.8, 44.4, 43.0],                                    
                            ],
                        //  ###### index 1 = BOYS's DATA ######
                            [
                            //  ['x', '3', '2', '1', '0', '-1', '-2', '-3', k.name],[0, 38.3, 37.0, 35.7, 34.5, 33.2, 31.9, 30.7],
                                [1, 40.8, 39.6, 38.4, 37.3, 36.1, 34.9, 33.8],
                                [2, 42.6, 41.5, 40.3, 39.1, 38.0, 36.8, 35.6],
                                [3, 44.1, 42.9, 41.7, 40.5, 39.3, 38.1, 37.0],
                                [4, 45.2, 44.0, 42.8, 41.6, 40.4, 39.2, 38.0],
                                [5, 46.2, 45.0, 43.8, 42.6, 41.4, 40.1, 38.9],
                                [6, 47.0, 45.8, 44.6, 43.3, 42.1, 40.9, 39.7],
                                [7, 47.7, 46.4, 45.2, 44.0, 42.7, 41.5, 40.3],
                                [8, 48.3, 47.0, 45.8, 44.5, 43.3, 42.0, 40.8],
                                [9, 48.8, 47.5, 46.3, 45.0, 43.7, 42.5, 41.2],
                                [10, 49.2, 47.9, 46.7, 45.4, 44.1, 42.9, 41.6],
                                [11, 49.6, 48.3, 47.0, 45.8, 44.5, 43.2, 41.9],
                                [12, 49.9, 48.6, 47.4, 46.1, 44.8, 43.5, 42.2],
                                [13, 50.2, 48.9, 47.6, 46.3, 45.0, 43.8, 42.5],
                                [14, 50.5, 49.2, 47.9, 46.6, 45.3, 44.0, 42.7],
                                [15, 50.7, 49.4, 48.1, 46.8, 45.5, 44.2, 42.9],
                                [16, 51.0, 49.6, 48.3, 47.0, 45.7, 44.4, 43.1],
                                [17, 51.2, 49.8, 48.5, 47.2, 45.9, 44.6, 43.2],
                                [18, 51.4, 50.0, 48.7, 47.4, 46.0, 44.7, 43.4],
                                [19, 51.5, 50.2, 48.9, 47.5, 46.2, 44.9, 43.5],
                                [20, 51.7, 50.4, 49.0, 47.7, 46.4, 45.0, 43.7],
                                [21, 51.9, 50.5, 49.2, 47.8, 46.5, 45.2, 43.8],
                                [22, 52.0, 50.7, 49.3, 48.0, 46.6, 45.3, 43.9],
                                [23, 52.2, 50.8, 49.5, 48.1, 46.8, 45.4, 44.1],
                                [24, 52.3, 51.0, 49.6, 48.3, 46.9, 45.5, 44.2],
                            ]
                        ]

    let paramData   = []
    paramData[0]    = ['x', '3', '2', '1', '0', '-1', '-2', '-3', k.name]
    let isSet       = false
    for (let index = 0; index < k.measures.length; index++) {
        paramData[index+1]      = headDataWHO[indexWHO][index]
        if (k.measures[index].isSetH){
            isSet                   = true
            paramData[index+1][8]   = parseFloat(k.measures[index].head, 10).toFixed(1) / 1
            min = (paramData[index+1][8] < min ?   paramData[index+1][8] : min)
            max = (paramData[index+1][8] > max ?   paramData[index+1][8] : max)
        } else {
            paramData[index+1][8]   = null
        }       
    }

    return isSet ? {
                        title:  paramTitle,
                        data:   paramData,
                        hAxis: 'Idade (meses)',
                        vAxis: 'Perimetro Cefálico (cm)',
                        min:    min,
                        max:    max
                    } : null
}


export default function MeasuresCharts(props) {
    const kid               = props.data;
    const weightChartData   = setWeightChart(kid)
    const lengthChartData   = setLengthChart(kid)
    const headChartData     = setHeadChart(kid)

    return (
        <>
            { kid && kid._id ? <>
                <>
                    <Card className="card-detail">
                        <div className="main-wrapper">
                            <div className="title-container"> 
                                { weightChartData   ? <WhoChart data={weightChartData}/>
                                                    : <Typography className="side-menu-green" variant="caption" >
                                                        Medidas de peso não informadas<br/>Acesse MEDIÇÕES para adicioná-las
                                                        </Typography> }
                            </div>
                        </div>
                    </Card>

                    <Card className="card-detail">
                        <div className="main-wrapper">
                            <div className="title-container"> 
                                { lengthChartData   ? <WhoChart data={lengthChartData}/>
                                                    : <Typography className="side-menu-green" variant="caption" >
                                                        Medidas de altura não informadas<br/>Acesse MEDIÇÕES para adicioná-las
                                                        </Typography> }
                            </div>
                        </div>
                    </Card>

                    <Card className="card-detail">
                        <div className="main-wrapper">
                            <div className="title-container"> 
                                { headChartData     ? <WhoChart data={headChartData}/>
                                                    : <Typography className="side-menu-green" variant="caption" >
                                                        Medidas do perímetro cefálico não informadas<br/>Acesse MEDIÇÕES para adicioná-las
                                                        </Typography> }
                            </div>
                        </div>
                    </Card>
                </>
            </> 
            : null}
        </>
    );
}