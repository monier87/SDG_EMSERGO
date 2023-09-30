import * as React from 'react';
import axios from 'axios';
import { useNavigate, useMatch } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TopAppBar from '../../components/TopAppBar/TopAppBar';
import NavDrawer from '../../components/NavDrawer/NavDrawer';
import FooterBar from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import {useEffect} from "react";
import '../../css/Dashboard.css';
import configur from '../../env';

const env = configur.envDev ? configur.dev:configur.prod;
const baseUrl = env.api.base + env.api.ruta.auth;

const defaultTheme = createTheme({
    palette: {
        primary:{
            main:'#0e9390'
        } ,
        secondary:{
            main:'#7abaa2'
        } ,
        alert:{
            main:'red'
        } ,
      },
});

const PageTemplate = () => {

    const path = useMatch('/dashboard/*').pathname;

    let nombre; // Declaración de la variable

    switch (path) {
        case '/dashboard':
            nombre = 'DASHBOARD';
            break;
        case '/dashboard/expedientes':
            nombre = 'EXPEDIENTES';
            break;
        case '/dashboard/insertar':
            nombre = 'REGISTRAR EXPEDIENTES';
            break;
        default:
            nombre = 'Título por defecto';
    }

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };


    useEffect(() => {
        axios.get(baseUrl,{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(resp=>{
            console.log(resp);
            if(resp.data.type === 'Success'){
                var data = resp.data;
                console.log(resp.data.msg);
            }else{
                console.log(resp.data.msg);
                localStorage.setItem('token','');
                navigate('/');
            }
        })
        .catch(error=>{
              console.log(error);
              localStorage.setItem('token','');
              navigate('/');
        })
    }, []);

    return (
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <TopAppBar status={open} toggleDrawer={toggleDrawer} title={nombre}/>
          <NavDrawer status={open} toggleDrawer={toggleDrawer}/>
          <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
          >
            <Container maxWidth="xl" sx={{ mt: 10, mb: 4 }}>
              {/* Aqui va el componente que se carga en el centro */}
                <Outlet/>
            </Container>
            <FooterBar status={open}/>
          </Box>
        </Box>
      </ThemeProvider>
    );
};

export default PageTemplate;
