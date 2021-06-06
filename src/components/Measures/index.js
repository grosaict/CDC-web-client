import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import MeasuresTable from '../MeasuresTable';
import MeasuresCharts from '../MeasuresCharts';

const useStyles = makeStyles({
    generalButton: {
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#269500',
            color: '#fff'
        },
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginTop: '10px'
    },
    cancelButton: {
        backgroundColor: 'red',
        '&:hover': {
            backgroundColor: '#000000'
        },
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
});

export default function Measures(props) {
    const kid = props.data;
    const classes = useStyles();

    const [tableShow, setTableShow]     = useState(false);
    const [chartsShow, setChartsShow]   = useState(true);

    const switchMeasuresDashboard = (showComponent) => {
        setTableShow(false);
        setChartsShow(false);
        switch (showComponent){
            case 'Table':
                setTableShow(true);
                break;
            case 'Charts':
                setChartsShow(true);
                break;
            default:
                setTableShow(false);
                setChartsShow(false);
            }
    }

    const openTable = (e) => {
        if(e.target === e.currentTarget){
            switchMeasuresDashboard('Table');
        }
    }

    const openCharts = (e) => {
        if(e.target === e.currentTarget){
            switchMeasuresDashboard('Charts');
        }
    }

    return (
        <>
            { kid && kid._id ? <>
                <>
                    <br/>
                   <TableContainer component={Paper}>
                        <Table /* className={classes.table} */ size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.generalButton} hover="true" onClick={openCharts} align="center" size='small'>
                                        GRÁFICOS</TableCell>
                                    <TableCell className={classes.generalButton} onClick={openTable}  align="center" size='small'>
                                        TABELA</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                    <br/>
                    { tableShow     ? <MeasuresTable    data={kid} /> : null }
                    { chartsShow    ? <MeasuresCharts   data={kid} /> : null }
                </>
            </> 
            : null}
        </>
    );
}