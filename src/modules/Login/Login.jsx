import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Login.css';
import axios from 'axios';
import { FaUserCircle, FaLock } from 'react-icons/fa';
import LogoMinisterio from '../../components/LogoMinisterio/LogoMinisterio';
import Siglas from '../../components/Siglas/Siglas';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import configur from '../../env';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import Alert from '@mui/material/Alert';

const env = configur.envDev ? configur.dev:configur.prod;
const baseUrl = env.api.base + env.api.ruta.login;



const Login = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();

    const [values, setValues] = React.useState({
        email:"",
        password: "",
        showPassword: true,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const [error, setError] = React.useState('');


    const iniciarSesion = () => {
        const { email, password } = values;
         axios.post(baseUrl, {
                email: email,
                password: password
        })
        .then(resp=>{
            console.log(resp);
            if(resp.data.type === 'Success'){
                setError('');
                console.log(resp.data.msg);
                localStorage.setItem('token', resp.data.token);
                navigate('/dashboard');
            }else{
                setError(resp.data.msg);
                console.log(resp.data.msg);
            }
        })
        .catch(error=>{
            alert(error);
            console.log(error);
        })
    };

    useEffect(() => {
       
    }, []);


    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-form">
                    <div className="login-identy">
                        <LogoMinisterio size={100}/>
                        <Siglas width={70} height={30}/>
                        <div className="login-title">
                            <h6>Sistema de Gestión Documental</h6>
                        </div>
                    </div>
                    {error && <Alert severity="error">{error}</Alert>}
                    <div className="form-group">
                        <div className="form-field">
                            <label className="form-label">
                                <FaUserCircle className="form-icon"/>Usuario
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={values.email}
                                onChange={handleChange("email")}
                            />
                        </div>
                        <div className="form-field">
                            <InputLabel className="form-label" htmlFor="standard-adornment-password">
                                <FaLock className="form-icon"/>Contraseña
                            </InputLabel>
                            <Input
                                type={values.showPassword ? "password" : "text"}
                                onChange={handleChange("password")}
                                value={values.password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <VisibilityOff/> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </div>
                        <br/>
                        <button className="login-button" onClick={iniciarSesion}>Aceptar</button>
                        <div className="login-info">
                            <span >No tiene usuario? </span><a href="#">Contacte al administrador</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
