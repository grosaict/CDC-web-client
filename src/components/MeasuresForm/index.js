import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useToasts } from 'react-toast-notifications';

import MeasureCard from '../MeasureCard';

import { updateMeasure } from '../../services/api';

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
    }
});

const MeasuresForm = (props) => {
    const { data } = props;
    const [ disabledButton, setDisabledButton ] = useState(false);

    const { addToast } = useToasts();
    const history = useHistory();
    const classes = useStyles();

    const [ kidId, setKidId ] = useState(undefined);
    const [ measureId, setMeasureId ] = useState(undefined);
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

        if(weight === '' || weight === undefined){
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
        setDisabledButton(true)
        e.preventDefault();

        const isFieldsOk = validateFields();

        if(isFieldsOk){
            const params = {
                weight: isNaN(weight)   ? parseInt(0, 10)           : weight,
                length: isNaN(length)   ? parseFloat(0).toFixed(1)  : length,
                head:   isNaN(head)     ? parseFloat(0).toFixed(1)  : head
            }

            let request;
            request = await updateMeasure(measureId, params);
            if(request.status === 200) {
                addToast(request.data.message, { appearance: 'success', autoDismissTimeout: 3000, autoDismiss: true });
                setTimeout(() => { history.push("/kid/detail/"+kidId+"/measures") }, 1000)
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
            setKidId(data.measure.kid)
            setMeasureId(data.measure._id)
            setWeight(parseInt(data.measure.weight, 10))
            setLength(parseFloat(data.measure.length).toFixed(1))
            setHead(parseFloat(data.measure.head).toFixed(1))
        }
    }, [data]);

    return (
        <>
            {measureId ?
            <>
                <MeasureCard data={data}/>
                <br/>
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
                                    error={weightError}
                                    value={weight}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="form-control">
                                <TextField
                                    variant="filled"
                                    size="small"
                                    type="number"
                                    id="input-length"
                                    label="Altura (cent??metros)"
                                    onChange={handleChangeLength}
                                    onBlur={handleFormatLength}
                                    error={lengthError}
                                    value={length}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="form-control">
                                <TextField
                                    variant="filled"
                                    size="small"
                                    type="number"
                                    id="input-head"
                                    label="Per??metro Cef??lico (cent??metros)"
                                    onChange={handleChangeHead}
                                    onBlur={handleFormatHead}
                                    error={headError}
                                    value={head}/>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} direction="row" justify="flex-end" alignItems="flex-end">
                        <Grid item>
                            { !disabledButton ?
                                <Button href={"#/kid/detail/"+kidId+"/measures"} variant="contained" color="primary" className={classes.buttonCancel}>
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
            </> : null}
        </>
    );
};

export default MeasuresForm;