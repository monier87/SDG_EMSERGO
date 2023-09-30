import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import FilePresentOutlined from '@mui/icons-material/FilePresentOutlined';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/FolderSpecial';
import { Link } from "react-router-dom";

export const DashboardMenu = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="/dashboard"><ListItemText primary="Dashboard" /></Link>
    </ListItemButton>
  </React.Fragment>
);

export const ExpedientesMenu = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Expedientes
    </ListSubheader> */}
    <ListItemButton>
      <ListItemIcon>
        <InventoryIcon />
      </ListItemIcon>
      <Link to="/dashboard/expedientes"><ListItemText primary="Expedientes" /></Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NoteAddIcon />
      </ListItemIcon>
      <Link to="/dashboard/insertar">
        <ListItemText primary="Registrar Expediente" />
      </Link>
    </ListItemButton>
  </React.Fragment>
);

export const AdminMenu = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Administración
    </ListSubheader> */}
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Gestionar Usuarios" />
    </ListItemButton>
  </React.Fragment>
);

