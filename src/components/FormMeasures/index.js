import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import { format } from 'date-fns';

import { makeStyles } from '@material-ui/core/styles';

import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';

import { updateMeasure } from '../../services/api';

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

    const { data } = props;

    const { addToast } = useToasts();
    const history = useHistory();
    const classes = useStyles();

    const [ kid, setKid ] = useState(undefined);
    const [ measureId, setMeasureId ] = useState(undefined);
    const [ dueMonth, setDueMonth ] = useState(undefined);
    const [ scheduleDate, setScheduleDate ] = useState(undefined);
    const [ weight, setWeight ] = useState(0);
    const [ weightError, setErrorWeight ] = useState(false);
    const [ length, setLength ] = useState(0);
    const [ lengthError, setErrorLength ] = useState(false);
    const [ head, setHead ] = useState(0);
    const [ headError, setErrorHead ] = useState(false);


    const handleChangeWeight = (e) => {
        setWeight(e.target.value)
    };

    const handleFormatWeight = (e) => {
        setWeight(parseInt(e.target.value, 10))
    }

    const handleChangeLength = (e) => {
        setLength(e.target.value);
    };

    const handleFormatLength = (e) => {
        setLength(parseFloat(e.target.value).toFixed(1))
    }

    const handleChangeHead = (e) => {
        setHead(e.target.value);
    };

    const handleFormatHead = (e) => {
        setHead(parseFloat(e.target.value).toFixed(1))
    }

    const validateFields = () => {

        let isValid = true;

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
            const params = {
                kid:    kid,
                weight: weight,
                length: length,
                head:   head
            }

            console.log("handleSubmit >>> "+JSON.stringify(params))

            let request;
            request = await updateMeasure(measureId, params);

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
            setKid(data.kid);
            setMeasureId(data.measure._id)
            setDueMonth(data.measure.dueMonth);
            setScheduleDate(data.measure.scheduleDate);
            setWeight(data.measure.weight);
            setLength(data.measure.length);
            setHead(data.measure.head);
        }
    }, [data]);

    return (
        <>
            {measureId ?
            <>
                <Grid container spacing={2} >
                    <p>{kid.name} {dueMonth} {format(new Date(scheduleDate),'dd/MM/yyyy')}</p>
                </Grid>
                <form className="form form-create-kid" autoComplete="off" method="post" onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <FormControl className="form-control">
                                <TextField
                                    variant="filled"
                                    size="small"
                                    type="number"
                                    id="input-weight"
                                    label="Peso (gramas)"
                                    onChange={handleChangeWeight}
                                    onBlur={handleFormatWeight}
                                    error={weightError} value={weight}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="form-control">
                                <TextField
                                    variant="filled"
                                    size="small"
                                    type="number"
                                    id="input-length"
                                    label="Altura (centímetros)"
                                    onChange={handleChangeLength}
                                    onBlur={handleFormatLength}
                                    error={lengthError} value={length}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="form-control">
                                <TextField
                                    variant="filled"
                                    size="small"
                                    type="number"
                                    id="input-head"
                                    label="Perímetro Cefálico (centímetros)"
                                    onChange={handleChangeHead}
                                    onBlur={handleFormatHead}
                                    error={headError} value={head}/>
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