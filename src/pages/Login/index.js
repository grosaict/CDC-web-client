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

import { userLogin } from '../../services/api';

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

const Login = (props) => {

    const classes = useStyles();
    const { addToast } = useToasts();
    const history = useHistory();

    const [ emailLogin, setEmailLogin ] = useState('');
    const [ emailError, setEmailError ] = useState(false);
    const [ pwdLogin, setPwdLogin ] = useState('');
    const [ pwdError, setPwdError ] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
        e.preventDefault();

        if(true /* verificarCamposPrenchidos() */){         // #### RETIRAR COMENTÁRIOS E VALORES DEFAULT
            let request = await userLogin({email: 'cdc1@mail.com'/* emailLogin */, password: 'cdc1'/* pwdLogin */});
            (request.status === 200) ? localStorage.setItem('token', request.data.token) : addToast(request.data.message, { appearance: 'error', placement: 'bottom-right' });
            history.push("/");
        } else {
            addToast('Preencha todos os campos obrigatórios!', { appearance: 'error', placement: 'bottom-right' });
        }
    }

    return (
        !Auth.isAuthenticated() ? (
            <>
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
                                            <TextField variant="outlined" id="input-email" label="E-mail" onChange={handleEmail} error={emailError} value={emailLogin}/>
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
                                        <Button type="submit" variant="contained" color="primary" className={classes.buttonLogin}>
                                            Login
                                        </Button>
                                    </Grid>
                                </Grid>   
                            </form>
                        </div>
                        <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                            <Grid item>
                                <Button type="button" color="primary">
                                    Esqueci minha senha
                                </Button>
                            </Grid>
                            <Grid item>
                                <Link to={{pathname: "/register"}}>
                                    <Button type="button" color="primary">
                                        Faça o seu cadastro
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </main>
                </>
            </>
        ) : (
            <Redirect to={{pathname: '/', state: {from: props.location}}} />
        )
    )
}

export default Login;