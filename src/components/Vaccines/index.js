import React, { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
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

import AddIcon from '@material-ui/icons/Add';
import AlarmOnRoundedIcon from '@material-ui/icons/AlarmOnRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import SnoozeRoundedIcon from '@material-ui/icons/SnoozeRounded';

import AlertDialogSlide from '../AlertDialogSlide';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
            color: '#269500',
        },
    }
});

const useStyles = makeStyles({
    edit: {
        backgroundColor: '#269500',
        '&:hover': {
            backgroundColor: '#000000'
        },
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginTop: '10px'
    },
    delete: {
        backgroundColor: 'red',
        '&:hover': {
            backgroundColor: '#000000'
        },
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
});

export default function Vaccines(props) {
    const vaccines = props.data.vaccines
    const kidId = props.data._id

    return (
        <>
            <br/>
            <Typography className="side-menu-green" variant="button">
                    Histórico de Aplicação de Vacinas</Typography>
            <br/><br/>
            <Typography variant="caption" style={{color:'green'}}>
                <AlarmOnRoundedIcon fontSize='small' /> ok </Typography>
            <Typography variant="caption" style={{color:'orange'}}>
                <AccessAlarmRoundedIcon fontSize='small' /> Pendente </Typography>
            <Typography variant="caption" color='error'>
                <SnoozeRoundedIcon fontSize='small' /> Atrasada </Typography>
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
                        <Row key={index} row={row}/>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <div id="div-button-register">
                <Link to={{ pathname: "/vaccine/new/"+kidId }} >
                    <button type="button" id="button-register">
                        <AddIcon className="icon" color="primary"/>
                    </button>
                </Link>
            </div>
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
    let vac                 = props.row;
    const [open, setOpen]   = useState(false);
    const classes           = useRowStyles();
    const buttonClass       = useStyles();

    return (
        <React.Fragment >
            <TableRow key={vac.name+"headVaccine"} className={classes.root} onClick={() => setOpen(!open)}>
                <TableCell className="side-menu-green" component="th" scope="row" align="center" >
                    {checkVacAplication(vac)}</TableCell>
                <TableCell className="side-menu-green" align="left">
                    {vac.name}</TableCell>
            </TableRow>
            <TableRow key={vac.name+"vaccine"}>
                <TableCell className="side-menu-green" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Card style={{backgroundColor:'#e0f2f1'}}>
                            <Box margin={1}>
                                <Typography style={{color:'blue'}} variant="caption" gutterBottom component="div">
                                    {recommendedMsg(vac.dueMonth)}</Typography>

                                <Typography style={{color:'#269500'}} variant="button" gutterBottom component="div">
                                    Registro da Aplicação</Typography>

                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow key={vac.name+"headApplication"}>
                                            <TableCell align="center">Data</TableCell>
                                            <TableCell align="center">Calendário SUS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key={vac.name+"application"}>
                                            <TableCell component="th" scope="row" align="center">
                                                { vac.isSet ? format(new Date(vac.applicationDate),'dd/MM/yyyy') : "Pendente" }
                                            </TableCell>
                                            <TableCell align="center">
                                                { vac.isSUS ? "Sim  " : "Não  "}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>      

                                { vac.description ?
                                    <>
                                        <br/>
                                        <Typography style={{color:'#269500'}} variant="button" gutterBottom component="div">
                                            Informações Adicionais</Typography>
                                        
                                        <Typography variant="body2" gutterBottom component="div" align="justify">
                                            {vac.description}</Typography>
                                    </>
                                : null
                                }
                                <br/>
                                <Grid container spacing={2} direction="row" justify="flex-end" alignItems="flex-end">
                                    { !vac.isSUS ?
                                        <AlertDialogSlide
                                            label="Excluir"
                                            title="Confirma a exclusão da vacina abaixo?"
                                            message={vac.name}
                                            action={"deleteVaccine"}
                                            params={{vId: vac._id, kId: vac.kid}}
                                        />
                                    : null }
                                    <Grid item>
                                        <Button href={"/vaccine/"+vac._id} variant="contained" color="primary" className={buttonClass.edit}>
                                            {'Editar'}
                                        </Button>
                                    </Grid>
                                </Grid>     
                            </Box>
                        </Card>
                        <br/>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function recommendedMsg (dMonth) {
    switch (dMonth) {
        case 0:     return "Aplicação recomendada nos primeiros 7 dias do nascimento"
        case 1:     return "Aplicação recomendada a partir de "+dMonth+" mês de idade"
        default:    return "Aplicação recomendada a partir de "+dMonth+" meses de idade"
    }
}

function checkVacAplication (v) {
    if (v.isSet) {
        return (<> <AlarmOnRoundedIcon style={{color:'green'}} fontSize='small' /> {format(new Date(v.scheduleDate),'dd/MM/yyyy')} </>)
    } else {
        if (new Date(v.scheduleDate).valueOf() < new Date().valueOf()) {
            return (<> <SnoozeRoundedIcon color='error' fontSize='small' /> {format(new Date(v.scheduleDate),'dd/MM/yyyy')} </>)
        } else {
            return (<> <AccessAlarmRoundedIcon style={{color:'orange'}} fontSize='small' /> {format(new Date(v.scheduleDate),'dd/MM/yyyy')} </>)
        }
    }
}
