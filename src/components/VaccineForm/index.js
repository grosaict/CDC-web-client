import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import VaccineCard from '../VaccineCard';
import DatePickerInput from '../DatePickerInput';
import CustomSwitch from '../CustomSwitch';


import { newVaccine, updateVaccine } from '../../services/api';

const useStyles = makeStyles({
    buttonAdd: {
        backgroundColor: '#269500',
        '&:hover': {
            backgroundColor: '#000000'
        },
        //boxShadow: '0 3px 5px 2px rgba(38, 149, 0, .3)',
        //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginTop: '10px'
    },
    buttonCancel: {
        backgroundColor: 'red',
        '&:hover': {
            backgroundColor: '#000000'
        },
        //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
});

const VaccineForm = (props) => {
    const { data } = props;

    const { addToast } = useToasts();
    const history = useHistory();
    const classes = useStyles();
    const today = new Date(new Date().getFullYear(), new Date().getMonth() ,new Date().getDate(), 3)
    const [ disabledButton, setDisabledButton ] = useState(false);

    const [ kid, setKid ] = useState(undefined);
    const [ kidBirth, setKidBirth ] = useState(undefined);
    const [ vaccineId, setVaccineId ] = useState(undefined);
    const [ dueMonth, setDueMonth ] = useState(-1);
    const [ dueMonthError, setErrorDueMonth ] = useState(false);
    const [ vacName, setVacName ] = useState('');
    const [ vacNameError, setErrorVacName ] = useState(false);
    const [ applicationDate, setApplicationDate ] = useState(today);
    const [ applicationDateError, setErrorApplicationDate ] = useState(false);
    const [ description, setDescription ] = useState('');
    const [ isSet, setIsSet ] = useState(false);
    const [ isSUS, setIsSUS ] = useState(false);

    const handleChangeDueMonth = (e) => {
        setDueMonth(e.target.value)
    };

    const handleFormatDueMonth = (e) => {
        setDueMonth(parseInt(e.target.value, 10))
    }

    const handleChangeVacName = (e) => {
        setVacName(e.target.value)
    };

    const handleChangeApplicationDate = (value) => {
        setApplicationDate(new Date(new Date(value).getFullYear(), new Date(value).getMonth() ,new Date(value).getDate(), 3))
    };

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    };

    const handleChangeIsSet = () => {
        setIsSet(!isSet)
    };

    const isFieldsOk = () => {
        let isValid = true;

        if(dueMonth === ''  || dueMonth === undefined || dueMonth < 0 || dueMonth > 24){
            isValid = false;
            setErrorDueMonth(true);
        } else { setErrorDueMonth(false); }

        if(!vacName     || vacName === ''   || vacName === undefined){
            isValid = false;
            setErrorVacName(true);
        } else { setErrorVacName(false); }

        if (isSet) {
            if(!applicationDate ||
                applicationDate === '' ||
                applicationDate === undefined ||
                (applicationDate.getTime() - kidBirth.getTime()) < 0 || // applicationDate  < kidBirth
                (today.getTime() - applicationDate.getTime()) < 0 ){    // today            < applicationDate
                isValid = false;
                setErrorApplicationDate(true);
            } else {
                setErrorApplicationDate(false);
            }
        }

        return isValid;
    }

    const handleSubmit = async (e) => {
        setDisabledButton(true)
        e.preventDefault();

        if(isFieldsOk()){
            const params = {
                dueMonth:           dueMonth,
                name:               vacName,
                applicationDate:    isSet ? applicationDate : null,
                description:        description,
                isSet:              isSet,
            }

            let request = {};
            if (data.form === 'edit') {
                request = await updateVaccine(vaccineId, params);
            } else {
                params.kid = kid
                request = await newVaccine(params);
            }
            if(request.status === 200) {
                addToast(request.data.message, { appearance: 'success', autoDismissTimeout: 2000, autoDismiss: true });
                setTimeout(() => { history.push("/kid/detail/"+kid._id+"/vaccines") }, 2000)
            } else {
                addToast(request.data.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true });
                setDisabledButton(false)
            }
        } else {
            addToast('Preencha todos os campos obrigat??rios!', { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true });
            setDisabledButton(false)
        }
    };

    useEffect(() =>{
        if (data){
            setKid(data.kid)
            setKidBirth(new Date(data.kid.birth))
            if (data.form === 'edit') {
                setVaccineId(data.vaccine._id)
                setDueMonth(data.vaccine.dueMonth)
                setVacName(data.vaccine.name)
                setDescription(data.vaccine.description)
                setIsSet(data.vaccine.isSet)
                setIsSUS(data.vaccine.isSUS)
                if (data.vaccine.isSet) {
                    setApplicationDate(new Date(data.vaccine.applicationDate))
                } else {
                    setApplicationDate(new Date(new Date().getFullYear(), new Date().getMonth() ,new Date().getDate()), 3) // TODAY
                }
            }
        }
    }, [data]);

    return (
        <>
            {kid ?
            <>
                {kid ? <VaccineCard data={data}/> : null }
                <br/>
                <form className="form form-create-kid" autoComplete="off" method="post" onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <FormControl className="form-control" disabled={isSUS} >
                                <InputLabel id="input-dueMonth-label" variant="filled">
                                    Aplica????o recomendada</InputLabel>
                                <Select
                                    variant="filled"
                                    size="small"
                                    type="number"
                                    labelId="input-dueMonth-label"
                                    id="input-dueMonth"
                                    onChange={handleChangeDueMonth}
                                    onBlur={handleFormatDueMonth}
                                    value={dueMonth}
                                    error={dueMonthError}>
                                        <MenuItem value={-1}></MenuItem>
                                        <MenuItem value={0}> No nascimento</MenuItem>
                                        <MenuItem value={1}> ?? partir do 1?? m??s</MenuItem>
                                        <MenuItem value={2}> ?? partir do 2?? m??s</MenuItem>
                                        <MenuItem value={3}> ?? partir do 3?? m??s</MenuItem>
                                        <MenuItem value={4}> ?? partir do 4?? m??s</MenuItem>
                                        <MenuItem value={5}> ?? partir do 5?? m??s</MenuItem>
                                        <MenuItem value={6}> ?? partir do 6?? m??s</MenuItem>
                                        <MenuItem value={7}> ?? partir do 7?? m??s</MenuItem>
                                        <MenuItem value={8}> ?? partir do 8?? m??s</MenuItem>
                                        <MenuItem value={9}> ?? partir do 9?? m??s</MenuItem>
                                        <MenuItem value={10}> ?? partir do 10?? m??s</MenuItem>
                                        <MenuItem value={11}> ?? partir do 11?? m??s</MenuItem>
                                        <MenuItem value={12}> ?? partir do 12?? m??s</MenuItem>
                                        <MenuItem value={13}> ?? partir do 13?? m??s</MenuItem>
                                        <MenuItem value={14}> ?? partir do 14?? m??s</MenuItem>
                                        <MenuItem value={15}> ?? partir do 15?? m??s</MenuItem>
                                        <MenuItem value={16}> ?? partir do 16?? m??s</MenuItem>
                                        <MenuItem value={17}> ?? partir do 17?? m??s</MenuItem>
                                        <MenuItem value={18}> ?? partir do 18?? m??s</MenuItem>
                                        <MenuItem value={19}> ?? partir do 19?? m??s</MenuItem>
                                        <MenuItem value={20}> ?? partir do 20?? m??s</MenuItem>
                                        <MenuItem value={21}> ?? partir do 21?? m??s</MenuItem>
                                        <MenuItem value={22}> ?? partir do 22?? m??s</MenuItem>
                                        <MenuItem value={23}> ?? partir do 23?? m??s</MenuItem>
                                        <MenuItem value={24}> ?? partir do 24?? m??s</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="form-control" >
                                <TextField
                                    variant="filled"
                                    size="small"
                                    type="string"
                                    id="input-vacName"
                                    label="Nome da vacina"
                                    onChange={handleChangeVacName}
                                    value={vacName}
                                    error={vacNameError}
                                    disabled={isSUS}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="form-control" >
                                    <CustomSwitch
                                        size={"small"}
                                        id={"input-isSet"}
                                        label={"Vacina aplicada?"}
                                        labelTrue={"Sim"}
                                        labelFalse={"N??o"}
                                        handleChange={handleChangeIsSet}
                                        value={isSet}/>
                            </FormControl>
                        </Grid>
                        { isSet ? 
                            <Grid item xs={12}>
                                <FormControl className="form-control">
                                    <DatePickerInput
                                        disableFuture={true}
                                        handleChange={handleChangeApplicationDate}
                                        initialPickDate={new Date()}
                                        id={"applicationDate"}
                                        value={applicationDate}
                                        label={"Data da Aplica????o"}
                                        formatDate={'dd/MM/yyyy'}
                                        minDate={kid.birth}
                                        minDateMessage="Data menor que a data de nascimento."
                                        error={applicationDateError}/>
                                </FormControl>
                            </Grid>
                        : null }
                        <Grid item xs={12}>
                            <FormControl className="form-control">
                                <TextField
                                    variant="filled"
                                    size="small"
                                    type="string"
                                    id="input-description"
                                    label="Informa????es adicionais"
                                    multiline
                                    rowsMax={6}
                                    onChange={handleChangeDescription}
                                    value={description}
                                    disabled={isSUS}/>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} direction="row" justify="flex-end" alignItems="flex-end">
                        <Grid item>
                            { !disabledButton ?
                                <Button href={"#/kid/detail/"+kid._id+"/vaccines"} variant="contained" color="primary" className={classes.buttonCancel}>
                                    {'Cancelar'}
                                </Button>
                            : null }
                        </Grid>
                        <Grid item>
                            { disabledButton ?
                                <Button type="submit" variant="contained" color="primary" disabled>
                                    Aguarde
                                </Button>
                            :
                                <Button type="submit" variant="contained" color="primary" className={classes.buttonAdd}>
                                    {'Salvar'}
                                </Button>
                            }
                        </Grid>
                    </Grid>         
                </form>
            </> : null }
        </>
    );
};

export default VaccineForm;