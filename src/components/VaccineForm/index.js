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
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginTop: '10px'
    },
    buttonCancel: {
        backgroundColor: 'red',
        '&:hover': {
            backgroundColor: '#000000'
        },
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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


        console.log("today")
        console.log(today)
        console.log("today.getTime()")
        console.log(today.getTime())
        console.log("applicationDate")
        console.log(applicationDate)
        console.log("applicationDate.getTime()")
        console.log(applicationDate.getTime())
        console.log("kidBirth")
        console.log(kidBirth)
        console.log("kidBirth.getTime()")
        console.log(kidBirth.getTime())

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
            addToast('Preencha todos os campos obrigatórios!', { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true });
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
                                    Aplicação recomendada</InputLabel>
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
                                        <MenuItem value={1}> À partir do 1º mês</MenuItem>
                                        <MenuItem value={2}> À partir do 2º mês</MenuItem>
                                        <MenuItem value={3}> À partir do 3º mês</MenuItem>
                                        <MenuItem value={4}> À partir do 4º mês</MenuItem>
                                        <MenuItem value={5}> À partir do 5º mês</MenuItem>
                                        <MenuItem value={6}> À partir do 6º mês</MenuItem>
                                        <MenuItem value={7}> À partir do 7º mês</MenuItem>
                                        <MenuItem value={8}> À partir do 8º mês</MenuItem>
                                        <MenuItem value={9}> À partir do 9º mês</MenuItem>
                                        <MenuItem value={10}> À partir do 10º mês</MenuItem>
                                        <MenuItem value={11}> À partir do 11º mês</MenuItem>
                                        <MenuItem value={12}> À partir do 12º mês</MenuItem>
                                        <MenuItem value={13}> À partir do 13º mês</MenuItem>
                                        <MenuItem value={14}> À partir do 14º mês</MenuItem>
                                        <MenuItem value={15}> À partir do 15º mês</MenuItem>
                                        <MenuItem value={16}> À partir do 16º mês</MenuItem>
                                        <MenuItem value={17}> À partir do 17º mês</MenuItem>
                                        <MenuItem value={18}> À partir do 18º mês</MenuItem>
                                        <MenuItem value={19}> À partir do 19º mês</MenuItem>
                                        <MenuItem value={20}> À partir do 20º mês</MenuItem>
                                        <MenuItem value={21}> À partir do 21º mês</MenuItem>
                                        <MenuItem value={22}> À partir do 22º mês</MenuItem>
                                        <MenuItem value={23}> À partir do 23º mês</MenuItem>
                                        <MenuItem value={24}> À partir do 24º mês</MenuItem>
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
                                        labelFalse={"Não"}
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
                                        label={"Data da Aplicação"}
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
                                    label="Informações adicionais"
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