import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Auth from '../../services/auth';
import { userLogin } from '../../services/api';

import AppBar from '../../components/AppBar';

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

const Login = (props) => {
    const classes       = useStyles();
    const { addToast }  = useToasts();
    const history       = useHistory();

    const [ disabledButton, setDisabledButton ] = useState(false);
    const [ emailLogin, setEmailLogin ]     = useState('');
    const [ emailError, setEmailError ]     = useState(false);
    const [ pwdLogin, setPwdLogin ]         = useState('');
    const [ pwdError, setPwdError ]         = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePassword = (e) => {
        setPwdLogin(e.target.value)
    }

    const handleEmail = (e) => {
        setEmailLogin(e.target.value)
    }

    const verificarCamposPrenchidos = () => {

        let isValid = true;

        if(!emailLogin || emailLogin === '' || emailLogin === undefined){
            isValid = false;
            setEmailError(true);
        } else { setEmailError(false); }

        if(!pwdLogin || pwdLogin === '' || pwdLogin === undefined){
            isValid = false;
            setPwdError(true);
        } else { setPwdError(false); }

        return isValid;
    }


    const handleSubmit = async (e) => {
        setDisabledButton(true)
        e.preventDefault();

        if(verificarCamposPrenchidos()){
            let request = await userLogin({email: emailLogin, password: pwdLogin});
            (request.status === 200) ? localStorage.setItem('token', request.data.token) : addToast(request.data.message, { appearance: 'error', placement: 'bottom-right', autoDismissTimeout: 3000, autoDismiss: true });
            history.push("/");
        } else {
            addToast('Preencha todos os campos obrigatórios!', { appearance: 'error', placement: 'bottom-right', autoDismissTimeout: 3000, autoDismiss: true });
            setDisabledButton(false)        }
    }

    return (
        !Auth.isAuthenticated() ? (
            <>
                <AppBar/>
                <main className="fixed-main-wrapper p-8 pt-32">
                    <div className="welcome">
                        <Typography style={{ 'fontWeight': "bold" }} variant="h4" component="h2" >
                            Faça o seu login
                        </Typography>
                    </div>
                    <div className="content-wrapper login">
                        <form className="form form-login" autoComplete="off" method="post" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl className="form-control">
                                        <TextField variant="outlined" id="input-email" type="email" label="E-mail" onChange={handleEmail} error={emailError} value={emailLogin}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="outlined" className="form-control">
                                        <InputLabel htmlFor="input-pwd-label">Senha</InputLabel>
                                        <OutlinedInput
                                            id="input-pwd" 
                                            type={showPassword ? 'text' : 'password'}
                                            error={pwdError} 
                                            value={pwdLogin}
                                            label="Pwd"
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
                            </Grid>
                            <Grid container spacing={2} direction="row" justify="flex-end" alignItems="flex-end">
                                <Grid item>
                                { disabledButton ?
                                    <Button type="submit" variant="contained" color="primary" disabled>
                                        Aguarde
                                    </Button>
                                :
                                    <Button type="submit" variant="contained" color="primary" className={classes.buttonLogin}>
                                        Login
                                    </Button>
                                }
                                </Grid>
                            </Grid>   
                        </form>
                    </div>
                    <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                        <Grid item>
                            <Link to={{pathname: "/pending", state: {from: props.location} }}>
                                <Button type="button" color="primary">
                                    Esqueci minha senha
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={{pathname: "/register", state: {from: props.location} }}>
                                <Button type="button" color="primary" >
                                    Faça o seu cadastro
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </main>
            </>
        ) : (
            <Redirect to={{pathname: '/', state: {from: props.location}}} />
        )
    )
}

export default Login;