import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import MeasuresTable    from '../MeasuresTable';
import MeasuresCharts   from '../MeasuresCharts';

export default function Measures(props) {
    const kid               = props.data;

    const [width, setWidth] = useState(0);
    const useStyles = makeStyles({
        generalButton: {
            backgroundColor: '#fff',
            color: '#269500',
            '&:hover': {
                backgroundColor: '#269500',
                color: '#fff'
            },
            width:      width,
            //boxShadow: '0 3px 5px 2px rgba(38, 149, 0, .3)',
            marginTop: '10px'
        },
        cancelButton: {
            backgroundColor: '#fff',
            '&:hover': {
                backgroundColor: 'red',
                color: '#fff'
            },
            width:      width,
            //boxShadow: '0 3px 5px 2px rgba(255, 0, 0, 1)',
            /* boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', */
        }
    });
    const classes = useStyles();

    const [chartsShow, setChartsShow]   = useState(true);
    const [tableShow, setTableShow]     = useState(false);
    
    const switchMeasuresDashboard = (showComponent) => {
        switch (showComponent){
            case 'Charts':
                setChartsShow(true);
                setTableShow(false);
                break;
            case 'Table':
                setChartsShow(false);
                setTableShow(true);
                break;
            default:
                setChartsShow(false);
                setTableShow(false);
            }
    }

    const openCharts = (e) => {
        if(e.target === e.currentTarget){
            switchMeasuresDashboard('Charts');
        }
    }

    const openTable = (e) => {
        if(e.target === e.currentTarget){
            switchMeasuresDashboard('Table');
        }
    }
    
    const setButtonWidth = (w) => { setWidth(w) }

    useEffect(() => {
        setButtonWidth('50%');
    }, [width]);

    window.addEventListener('resize', () => {
        setButtonWidth('50%');
    });

    return (
        <>
            { kid && kid._id ? <>
                <>
                    <br/>
                    <TableContainer component={Paper} >
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.generalButton} onClick={openCharts} align="center" size='small'>
                                        GRÁFICOS</TableCell>
                                    <TableCell className={classes.generalButton} onClick={openTable}  align="center" size='small'>
                                        MEDIÇÕES</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                    <br/>
                    { chartsShow        ? <MeasuresCharts   data={kid} /> : null }
                    { tableShow         ? <MeasuresTable    data={kid} /> : null }
                </>
            </> 
            : null}
        </>
    );
}