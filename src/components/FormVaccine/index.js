import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DatePickerInput from '../../components/DatePickerInput';

import { makeStyles } from '@material-ui/core/styles';
import { useToasts } from 'react-toast-notifications';

import MeasureCard from '../MeasureCard';

import { updateVaccine } from '../../services/api';

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
    }
});

const FormVaccine = (props) => {

    const { data } = props;
    console.log("FormVaccine > data >>>")
    console.log(data)

    const { addToast } = useToasts();
    const history = useHistory();
    const classes = useStyles();

    const [ kidId, setKidId ] = useState(undefined);
    const [ vaccineId, setVaccineId ] = useState(undefined);
    const [ dueMonth, setDueMonth ] = useState(-1);
    const [ dueMonthError, setErrorDueMonth ] = useState(false);
    const [ vacName, setVacName ] = useState('');
    const [ vacNameError, setErrorVacName ] = useState(false);
    const [ applicationDate, setApplicationDate ] = useState(new Date());
    const [ applicationDateError, setErrorApplicationDate ] = useState(false);
    const [ description, setDescription ] = useState('');
    const [ descriptionError, setErrorDescription ] = useState(false);
    const [ isSet, setIsSet ] = useState(false);
    const [ isSetError, setErrorIsSet ] = useState(false);

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
        setApplicationDate(value)
    };

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    };

    const handleChangeIsSet = (e) => {
        setIsSet(e.target.value)
    };

    const validateFields = () => {
        let isValid = true;

        if(dueMonth === ''  || dueMonth === undefined || dueMonth < 0 || dueMonth > 24 ){
            isValid = false;
            setErrorDueMonth(true);
        } else { setErrorDueMonth(false); }

        if(!vacName     || vacName === ''   || vacName === undefined){
            isValid = false;
            setErrorVacName(true);
        } else { setErrorVacName(false); }

        if(!applicationDate || applicationDate === '' || applicationDate === undefined ){
            isValid = false;
            setErrorApplicationDate(true);
        } else { setErrorApplicationDate(false); }

        if(!description     || description === ''   || description === undefined){
            isValid = false;
            setErrorDescription(true);
        } else { setErrorDescription(false); }

        return isValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFieldsOk = validateFields();

        if(isFieldsOk){
            const params = {
                name:               vacName,
                dueMonth:           dueMonth,
                applicationDate:    applicationDate,
                description:        description,
                isSet:              isSet,
            }

            // APAGAR
            addToast("sucesso TESTE", { appearance: 'success', autoDismissTimeout: 3000, autoDismiss: true });
            //setTimeout(() => { history.push("/kid/detail/"+kidId+"/vaccines") }, 1000)
            // APAGAR

            /* let request;
            request = await updateVaccine(vaccineId, params);
            if(request.status === 200) {
                addToast(request.data.message, { appearance: 'success', autoDismissTimeout: 3000, autoDismiss: true });
                setTimeout(() => { history.push("/kid/detail/"+kidId+"/vaccines") }, 1000)
            } else {
                addToast(request.data.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true });
            } */
        } else {
            addToast('Preencha todos os campos obrigatórios!', { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true });
        }
    };

    useEffect(() =>{
        if (data){
            setKidId(data.vaccine.kid)
            setVaccineId(data.vaccine._id)
            setDueMonth(data.vaccine.dueMonth)
            setVacName(data.vaccine.name)
            setApplicationDate(data.vaccine.applicationDate)
            setDescription(data.vaccine.description)
        }
    }, [data]);

    return (
        <>
            {vaccineId ?
            <>
                {/* <MeasureCard data={data}/> */}
                <br/>
                <form className="form form-create-kid" autoComplete="off" method="post" onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <FormControl className="form-control">
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
                            <FormControl className="form-control">
                                <TextField
                                    variant="filled"
                                    size="small"
                                    type="string"
                                    id="input-vacName"
                                    label="Nome da vacina"
                                    onChange={handleChangeVacName}
                                    value={vacName}
                                    error={vacNameError}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="form-control">
                                <DatePickerInput
                                    disableFuture={true}
                                    handleChange={handleChangeApplicationDate}
                                    initialPickDate={applicationDate}
                                    id={"applicationDate"}
                                    value={applicationDate}
                                    label={"Data da Aplicação"}
                                    formatDate={'dd/MM/yyyy'}
                                    error={applicationDateError}/>
                            </FormControl>
                        </Grid>
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
                                    error={descriptionError}/>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} direction="row" justify="flex-end" alignItems="flex-end">
                        <Grid item>
                            <Button href={"/kid/detail/"+kidId+"/vaccines"} variant="contained" color="primary" className={classes.buttonCancel}>
                                {'Cancelar'}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button type="submit" variant="contained" color="primary" className={classes.buttonAdd}>
                                {'Salvar'}
                            </Button>
                        </Grid>
                    </Grid>         
                </form>
            </> : null}
        </>
    );
};

export default FormVaccine;