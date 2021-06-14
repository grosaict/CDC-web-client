import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
            color: '#269500',
        },
    }
});

export default function Vaccines(props) {
    let vaccines = props.data.vaccines
    //console.log("vaccines 2 >>>"+JSON.stringify(vaccines))


    return (
        <>
            <br/>
            <Typography className="side-menu-green" variant="button">
                    Histórico de Aplicação de Vacinas</Typography>
            <br/><br/>
            <Typography className="side-menu-green" variant="caption" color='error'>
                <WarningRoundedIcon color='error' fontSize='small' /> Aplicação atrasada</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow key="headMaster">
                        <TableCell style={{color:'#269500'}} align="center">
                            Data Recomendada</TableCell>
                        <TableCell style={{color:'#269500'}} align="left">
                            Vacina</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vaccines.map((row, index) => (
                        <Row key={index} row={row} />
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
            scheduleDate:   PropTypes.string.isRequired,
            name:           PropTypes.string.isRequired,
            description:    PropTypes.string.isRequired,
    }).isRequired,
};

function Row (props) {
    let vac = props.row;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment >
            <TableRow key={vac.name+"headVaccine"} className={classes.root} onClick={() => setOpen(!open)}>
                <TableCell className="side-menu-green" component="th" scope="row" align="center" >
                    {format(new Date(vac.scheduleDate),'dd/MM/yyyy')}</TableCell>
                <TableCell className="side-menu-green" align="left">
                    {checkVacDelay(vac)}</TableCell>
            </TableRow>
            <TableRow key={vac.name+"vaccine"}>
                <TableCell className="side-menu-green" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>

                            <Typography style={{color:'red'}} variant="caption" gutterBottom component="div">
                                {recommendedMsg(vac.dueMonth)}</Typography>

                            <Typography style={{color:'#269500'}} variant="button" gutterBottom component="div">
                                Registro da Aplicação</Typography>
                            <Typography className="side-menu-green" variant="caption">
                                Clique na data para atualizar o registro</Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow key={vac.name+"headApplication"}>
                                        <TableCell /* style={{color:'blue'}} */ align="center">Data</TableCell>
                                        <TableCell /* style={{color:'blue'}} */ align="center">Calendário SUS</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={vac.name+"application"}>
                                        <TableCell /* style={{color:'blue'}} */ component="th" scope="row" align="center">
                                            <Link to={{ pathname: "/kid/vaccine/"+vac._id }} >
                                                { vac.isSet ? format(new Date(vac.scheduleDate),'dd/MM/yyyy') : "Pendente" }</Link>
                                        </TableCell>
                                        <TableCell /* style={{color:'blue'}} */ align="center">
                                            { vac.isSUS ? "Sim  " : "Não  "}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>      

                            { vac.description ?
                                <>
                                    <br/>
                                    <Typography style={{color:'#269500'}} variant="button" gutterBottom component="div">
                                        Informações Adicionais</Typography>
                                    
                                    <Typography /* style={{color:'blue'}} */ variant="body2" gutterBottom component="div" align="justify">
                                        {vac.description}</Typography>
                                </>
                            : null
                            }
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function recommendedMsg (dMonth) {
    switch (dMonth) {
        case 0:     return "Aplicação recomendada nos primeiros 7 dias do nascimento"
        default:    return "Aplicação recomendada a partir do "+dMonth+"º mês de aniversário"
    }
}

function checkVacDelay (v) {
    if (v.isSet) {
        return v.name
    } else {
        if (new Date(v.scheduleDate).valueOf() < new Date().valueOf()) {
            return (<>{v.name} <WarningRoundedIcon color='error' fontSize='small' /></>)
        } else {
            return v.name
        }
    }
}
