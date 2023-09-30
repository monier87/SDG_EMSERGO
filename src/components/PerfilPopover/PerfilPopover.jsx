import * as React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LoginIcon from '@mui/icons-material/Login';
import configur  from '../../env';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Cookies from 'universal-cookie';

const env = configur.envDev ? configur.dev:configur.prod;
const baseUrl = env.api.base + env.api.version + env.api.ruta.logout;

const styles = {
    showAvatar:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
        margin:'10px 5px'
    }

};


const PerfilPopover = () => {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    function logout (){
        window.localStorage.clear();
        navigate('/');
    }


    return (
        <div>
        <IconButton color="inherit" aria-describedby={id} variant="contained" onClick={handleClick}>
            <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 36, height: 36}}
            />
        </IconButton>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            >
            <Paper sx={{ width: 150, maxWidth: '100%' }}>
                <div style= {styles.showAvatar}>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 55, height: 55, mb:1}}
                    />
                    {/*<Typography variant="body2" color="text.secondary" align="center">*/}
                    {/*    {window.localStorage.getItem('user').name}*/}
                    {/*</Typography>*/}
                </div>
                <MenuList>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <ManageAccountsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Setting</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <LoginIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText onClick={logout}>Logout</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>
        </Popover>
        </div>
    );
};

export default PerfilPopover;
