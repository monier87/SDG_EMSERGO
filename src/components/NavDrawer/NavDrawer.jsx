import Drawer from './Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoMinisterio from '../LogoMinisterio/LogoMinisterio';
import Siglas from '../Siglas/Siglas';
import { DashboardMenu, ExpedientesMenu, AdminMenu } from '../NavMenu/NavMenu';

const NavDrawer = (props) => {

    return (
        <Drawer variant="permanent" open={props.status}>
            <Toolbar
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
                }}
            >
                <IconButton>
                    <LogoMinisterio size={40}/>
                </IconButton>
                <IconButton>
                    <Siglas width={70} height={30}/>
                </IconButton>
                <IconButton onClick={props.toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {DashboardMenu}
                <Divider sx={{ my: 1 }} />
                {ExpedientesMenu}
                <Divider sx={{ my: 1 }} />
                {AdminMenu}
            </List>
        </Drawer>
    );
};

export default NavDrawer;