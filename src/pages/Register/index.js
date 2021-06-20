import React, { useState } from 'react';
import Auth from '../../services/auth';
import { Redirect } from "react-router-dom";
import AppBar from '../../components/AppBar';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { createUser } from '../../services/api';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    buttonLogin: {
        backgroundColor: '#218002',
        '&:hover': {
            backgroundColor: '#000000'
        },
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginTop: '10px'
    },
});


const Register = (props) => {

    const classes = useStyles();
    const { addToast } = useToasts();
    const history = useHistory();

    const [emailLogin, setEmailLogin] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [nameLogin, setNameLogin] = useState('');
    const [nameError, setNameError] = useState(false);
    const [passwordLogin, setPasswordLogin] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordLogin, setConfirmPasswordLogin] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfrimPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfrimPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePassword = (e) => {
        setPasswordLogin(e.target.value)
    }

    const handleConfirmPassword = (e) => {
        setConfirmPasswordLogin(e.target.value)
    }

    const handleName = (e) => {
        setNameLogin(e.target.value)
    }

    const handleEmail = (e) => {
        setEmailLogin(e.target.value)
    }

    const verificarCamposPrenchidos = () => {

        let isValid = true;

        if (!emailLogin || emailLogin === '' || emailLogin === undefined) {
            isValid = false;
            setEmailError(true);
        } else { setEmailError(false); }

        if (!nameLogin || nameLogin === '' || nameLogin === undefined) {
            isValid = false;
            setNameError(true);
        } else { setNameError(false); }

        if (!passwordLogin || passwordLogin === '' || passwordLogin === undefined) {
            isValid = false;
            setPasswordError(true);
        } else { setPasswordError(false); }

        if (!confirmPasswordLogin || confirmPasswordLogin === '' || confirmPasswordLogin === undefined) {
            isValid = false;
            setConfirmPasswordError(true);
        } else { setConfirmPasswordError(false); }

        return isValid;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (verificarCamposPrenchidos()) {
            if(passwordLogin !== confirmPasswordLogin){
                setConfirmPasswordError(true);
                addToast("Confirme sua senha novamente.", { appearance: 'error', placement: 'bottom-right', autoDismissTimeout: 3000, autoDismiss: true  });
            } else {
                setConfirmPasswordError(false);
                let request = await createUser({ email: emailLogin, password: passwordLogin, confirmPassword: confirmPasswordLogin, name: nameLogin });
                if (request.status === 200) {
                    localStorage.setItem('token', request.data.token)
                    history.push("/");
                } else {
                    addToast(request.data.message, { appearance: 'error', placement: 'bottom-right', autoDismissTimeout: 3000, autoDismiss: true  });
                }
            }
        } else {
            addToast('Preencha todos os campos obrigatórios!', { appearance: 'error', placement: 'bottom-right', autoDismissTimeout: 3000, autoDismiss: true });
        }
    }

    return (
        !Auth.isAuthenticated() ? (
            <>
                <AppBar />
                <main className="fixed-main-wrapper p-8 pt-32">
                    <div className="welcome">
                        <Typography style={{ 'fontWeight': "bold" }} variant="h4" component="h2" >
                            Faça o seu cadastro
                        </Typography>
                    </div>
                    <div className="content-wrapper login">
                        <form className="form form-login" autoComplete="off" method="post" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl className="form-control">
                                        <TextField variant="outlined" id="input-email" type="email" label="E-mail" onChange={handleEmail} error={emailError} value={emailLogin} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl className="form-control">
                                        <TextField variant="outlined" id="input-name" label="Nome" onChange={handleName} error={nameError} value={nameLogin} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="outlined" className="form-control">
                                        <InputLabel htmlFor="input-senha-label">Senha</InputLabel>
                                        <OutlinedInput
                                            id="input-senha"
                                            type={showPassword ? 'text' : 'password'}
                                            error={passwordError}
                                            value={passwordLogin}
                                            label="Senha"
                                            onChange={handlePassword}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="outlined" className="form-control">
                                        <InputLabel htmlFor="input-confirmar-senha-label">Confirmar Senha</InputLabel>
                                        <OutlinedInput
                                            id="input-confirmar-senha"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            error={confirmPasswordError}
                                            value={confirmPasswordLogin}
                                            label="Confirmar Senha"
                                            onChange={handleConfirmPassword}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowConfirmPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} direction="row" justify="flex-end" alignItems="flex-end">
                                <Grid item>
                                    <Button type="submit" variant="contained" color="primary" className={classes.buttonLogin}>
                                        Cadastrar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                        <Grid item>
                            <Link to={{pathname: "/login"}}>
                                <Button type="submit" color="primary">
                                    Já tenho conta! Quero fazer login
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </main>
            </>
        ) : (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
    )
}

export default Register;