import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DatePickerInput from '../DatePickerInput';

import { makeStyles } from '@material-ui/core/styles';
import { useToasts } from 'react-toast-notifications';
import { format } from 'date-fns';

import { createKid, updateKid } from '../../services/api';

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

const KidForm = (props) => {

    const { dataEdit, idKid } = props;

    const { addToast } = useToasts();
    const history = useHistory();
    const classes = useStyles();
    const minDateBirth = new Date(new Date().getFullYear() - 10, new Date().getMonth(), new Date().getDate());

    const [ kidGender, setGender ] = useState('');
    const [ kidGenderError, setErrorGender ] = useState(false);
    const [ kidName, setName ] = useState('');
    const [ kidNameError, setErrorName ] = useState(false);
    const [ kidBirth, setBirth ] = useState(new Date());
    const [ kidBirthError, setErrorBirth ] = useState(false);

    const [ disabledButton, setDisabledButton ] = useState(false);

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeGender = (e) => {
        setGender(e.target.value);
    };

    const handleChangeBirth = (value) => {
        setBirth(value);
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

        return isValid;
    }

    const handleSubmit = async (e) => {
        setDisabledButton(true)
        e.preventDefault();
        const isFieldsOk = validateFields();

        if(isFieldsOk){
            addToast('Aguarde, processando ...', { appearance: 'info', autoDismissTimeout: 6000, autoDismiss: true });
            let newKid = {
                name:   kidName,
                birth:  kidBirth,
                gender: kidGender
            }

            let request;
            if(dataEdit?._id && idKid){
                request = await updateKid(idKid, newKid);
            } else {
                request = await createKid(newKid);
            }
            if(request.status === 200) {
                addToast(request.data.message, { appearance: 'success', autoDismissTimeout: 3000, autoDismiss: true });
                setTimeout(() => { history.push("/") }, 1000)
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
        if(dataEdit){
            setGender(dataEdit.kidGender);
            setName(dataEdit.kidName);
            setBirth(dataEdit.kidBirth);
        }
    }, [dataEdit]);

    return (
        <>
            <form className="form form-create-kid" autoComplete="off" method="post" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl className="form-control">
                            <TextField
                                variant="filled"
                                size="small"
                                /* variant="outlined" */
                                id="input-kidName"
                                label="Nome"
                                onChange={handleChangeName}
                                value={kidName}
                                error={kidNameError}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className="form-control">
                            <DatePickerInput
                                disableFuture={true}
                                handleChange={handleChangeBirth}
                                initialPickDate={new Date()}
                                id={"kidBirth"}
                                value={kidBirth}
                                label={"Data de Nascimento"}
                                formatDate={'dd/MM/yyyy'}
                                minDate={minDateBirth}
                                minDateMessage={"Data menor que "+format(new Date(minDateBirth),'dd/MM/yyyy')+"."}
                                error={kidBirthError}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className="form-control">
                            <InputLabel id="input-kidGender-label">Sexo</InputLabel>
                            <Select
                                variant="filled"
                                size="small"
                                labelId="input-kidGender-label"
                                id="input-kidGender"
                                value={kidGender}
                                onChange={handleChangeGender}
                                /* style={{width: 300}} */
                                label="Gender"
                                error={kidGenderError}
                            >
                                <MenuItem value={'F'}>Feminino</MenuItem>
                                <MenuItem value={'M'}>Masculino</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} direction="row" justify="flex-end" alignItems="flex-end">
                    <Grid item>
                        { !disabledButton ?
                            <Button href="/" variant="contained" color="primary" className={classes.buttonCancel}>
                                {'Cancelar'}
                            </Button>
                        : null }
                    </Grid>
                    <Grid item>
                        { disabledButton ?
                            <Button type="submit" variant="contained" color="primary" className={classes.buttonAdd} disabled>
                                Aguarde
                            </Button>
                        :
                            <Button type="submit" variant="contained" color="primary" className={classes.buttonAdd}>
                                { dataEdit?._id && idKid ? 'Atualizar' : 'Adicionar'}
                            </Button>
                        }
                    </Grid>
                </Grid>            
            </form>
        </>
    );
};

export default KidForm;