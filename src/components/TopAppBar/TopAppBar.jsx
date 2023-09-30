import AppBar from './AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import PerfilPopover from '../PerfilPopover/PerfilPopover';


const TopAppBar = (props) => {

    const primary = "#f44336"; // #f44336
    return (
        <AppBar position="absolute" open={props.status}>
            <Toolbar
                sx={{
                    pr: '24px',
                }}
            >
                <IconButton
                    edge="start"
                    color="#f5f5f5"
                    aria-label="open drawer"
                    onClick={props.toggleDrawer}
                    sx={{
                    marginRight: '36px',
                    ...(props.status && { display: 'none' }),
                    }}
                >
                    <MenuIcon sx={{ color:"#f5f5f5 !important" }}/>
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    {props.title}
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="alert">
                    <NotificationsIcon sx={{ color:"#f5f5f5 !important" }}/>
                    </Badge>
                </IconButton>
                {/* <IconButton color="inherit">
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 36, height: 36 }}
                    />
                </IconButton> */}
                <PerfilPopover/>
            </Toolbar>
        </AppBar>
    );

};

export default TopAppBar;
