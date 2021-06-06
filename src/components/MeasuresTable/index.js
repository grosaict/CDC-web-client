import React from 'react';

//import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { format } from 'date-fns';

/* const useStyles = makeStyles({
    table: {
        minWidth: 0,
    },
}); */

const MeasuresTable = (kid) => {
    // const classes = useStyles();
    let k = kid.data

    return (
        <TableContainer component={Paper}>
            <Table /* className={classes.table} */ size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" size='small'>
                            Data Sugerida</TableCell>
                        <TableCell align="center" size='small'>
                            Peso(kg)</TableCell>
                        <TableCell align="center" size='small'>
                            Altura(cm)</TableCell>
                        <TableCell align="center" size='small'>
                            Cabeça(cm)</TableCell>
                        {/* <TableCell align="center" size='small'>
                            </TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {k.measures.table.map((row, index) => (
                        <TableRow key={index} id={'row'+index} onClick={null}>
                            <TableCell align="center" size='small' component="th" scope="row">
                                {format(new Date(row.scheduleDate),'dd/MM/yyyy')}
                            </TableCell>
                            <TableCell align="center" size='small'>
                                {row.weight}</TableCell>
                            <TableCell align="center" size='small'>
                                {row.length}</TableCell>
                            <TableCell align="center" size='small'>
                                {row.head}</TableCell>
                            {/* <TableCell align="center" size='small'>
                                <EditRoundedIcon className="side-menu-green" fontSize="small" onClick={null}/>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MeasuresTable;