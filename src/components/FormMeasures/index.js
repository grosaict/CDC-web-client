import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { format } from 'date-fns';

import { makeStyles } from '@material-ui/core/styles';

import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';

import { createKid, updateKid, updateMeasure } from '../../services/api';

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

const FormMeasures = (props) => {

    const { dataEdit, idKid } = props;
    const { data } = props;

    const { addToast } = useToasts();
    const history = useHistory();
    const classes = useStyles();

    const [ kidGender, setGender ] = useState('');
    const [ kidGenderError, setErrorGender ] = useState(false);
    const [ kidName, setName ] = useState(undefined);
    const [ kidNameError, setErrorName ] = useState(false);
    const [ kidBirth, setBirth ] = useState(new Date());
    const [ kidBirthError, setErrorBirth ] = useState(false);

    const [ kid, setKid ] = useState(undefined);
    const [ dueMonth, setDueMonth ] = useState(undefined);
    const [ scheduleDate, setScheduleDate ] = useState(undefined);
    const [ weight, setWeight ] = useState(undefined);
    const [ weightError, setErrorWeight ] = useState(false);
    const [ length, setLength ] = useState(undefined);
    const [ lengthError, setErrorLength ] = useState(false);
    const [ head, setHead ] = useState(undefined);
    const [ headError, setErrorHead ] = useState(false);

    const handleChangeWeight = (value) => {
        setWeight(value);
    };

    const handleChangeLength = (value) => {
        setLength(value);
    };

    const handleChangeHead = (value) => {
        setHead(value);
    };

    const validateFields = () => {

        let isValid = true;

        if(!kidName || kidName === '' || kidName === undefined){
            isValid = false;
            setErrorName(true);
        } else { setErrorName(false); }

        if(kidGender === '' || kidGender === undefined){
            isValid = false;
            setErrorGender(true);
        } else { setErrorGender(false); }

        if(!kidBirth || kidBirth === '' || kidBirth === undefined){
            isValid = false;
            setErrorBirth(true);
        } else { setErrorBirth(false); }


        if(!weight || weight === '' || weight === undefined){
            isValid = false;
            setErrorWeight(true);
        } else { setErrorWeight(false); }

        if(!length || length === '' || length === undefined){
            isValid = false;
            setErrorLength(true);
        } else { setErrorLength(false); }

        if(!head || head === '' || head === undefined){
            isValid = false;
            setErrorHead(true);
        } else { setErrorHead(false); }

        return isValid;
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        const isFieldsOk = validateFields();

        if(isFieldsOk){
            let newKid = {
                        name: kidName,
                        birth: kidBirth,
                        gender: kidGender
                    }

            let newMeasures = {
                weight: weight,
                length: length,
                head:   head
            }

            let request;
            if(dataEdit?._id && idKid){
                request = await updateKid(idKid, newKid);
            } else {
                request = await createKid(newKid);
            }
            if(request.status === 200) {
                addToast(request.data.message, { appearance: 'success', autoDismissTimeout: 3000, autoDismiss: true });
                setTimeout(() => { history.push("/kid/detail/"+kid._id) }, 1000)
            } else {
                addToast(request.data.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true });
            }
            
        } else {
            addToast('Preencha todos os campos obrigatórios!', { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true });
        }
    };

    useEffect(() =>{
        if (data){
            setDueMonth(data.measure.dueMonth);
            setScheduleDate(data.measure.scheduleDate);
            setWeight(data.measure.weight);
            setLength(data.measure.length);
            setHead(data.measure.head);
            setKid(data.kid);
            console.log(data)
        }
    }, [data]);

    return (
        <>
            {kid ?
            <>
                <Grid container spacing={2} >
                    <p>{kid.name} {dueMonth} {format(new Date(scheduleDate),'dd/MM/yyyy')}</p>
                </Grid>
                <form className="form form-create-kid" autoComplete="off" method="post" onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <FormControl className="form-control">
                                <TextField variant="outlined" type="number" id="input-weight" label="Peso (kg)" onChange={handleChangeWeight} error={weightError} value={weight}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="form-control">
                                <TextField variant="outlined" type="number" id="input-length" label="Altura (cm)" onChange={handleChangeLength} error={lengthError} value={length}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="form-control">
                                <TextField variant="outlined" type="number" id="input-head" label="Perímetro Cefálico (cm)" onChange={handleChangeHead} error={headError} value={head}/>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} direction="row" justify="flex-end" alignItems="flex-end">
                        <Grid item>
                            <Button href={"/kid/detail/"+kid._id} variant="contained" color="primary" className={classes.buttonCancel}>
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

export default FormMeasures;