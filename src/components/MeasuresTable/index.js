import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const MeasuresTable = (props) => {
    let k = props.data

    return (
        <>
            <Typography className="side-menu-green" variant="caption">
                Clique na data para adicionar ou alterar as medidas</Typography>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" size='small'>
                                <Typography className="side-menu-green" variant="inherit" >
                                    Data Sugerida</Typography>
                            </TableCell>
                            <TableCell align="center" size='small'>
                                <Typography className="side-menu-green" variant="inherit" >
                                    Peso<br/>(g)</Typography>
                            </TableCell>
                            <TableCell align="center" size='small'>
                                <Typography className="side-menu-green" variant="inherit" >
                                    Altura<br/>(cm)</Typography>
                            </TableCell>
                            <TableCell align="center" size='small' >
                                <Typography className="side-menu-green" variant="inherit" >
                                    Cabeça<br/>(cm)</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {k.measures.map((row, index) => (
                            <TableRow key={index} id={'row'+index}>
                                <TableCell className="side-menu-green" align="center" size='small' component="th" scope="row" >
                                    <Typography className="side-menu-green" variant="inherit" >
                                        <Link to={{ pathname: "/kid/measure/"+row._id }} >
                                            {format(new Date(row.scheduleDate),'dd/MM/yy')}</Link>
                                    </Typography>   
                                </TableCell>
                                <TableCell align="center" size='small'>
                                    <Typography className="side-menu-green" variant="inherit" >
                                        {row.isSetW ? row.weight : null}</Typography>
                                </TableCell>
                                <TableCell align="center" size='small'>
                                    <Typography className="side-menu-green" variant="inherit" >
                                        {row.isSetL ? row.length : null}</Typography>
                                </TableCell>
                                <TableCell align="center" size='small'>
                                    <Typography className="side-menu-green" variant="inherit" >
                                        {row.isSetH ? row.head : null}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default MeasuresTable;