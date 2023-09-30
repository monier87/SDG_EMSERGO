// MenuBar.js
import React from 'react';
import AppBar from '../TopAppBar/AppBar';
import Copyright from '../Copyright/Copyright';

const FooterBar = (props) => {

    return (
        <AppBar
         sx={{
                position:"absolute",
                bottom:"0px",
                top:"92vh",
                height:"8vh",
                alignItems: "center",
                justifyContent: "center"
        }}
        open={props.status}>
            <Copyright  />
        </AppBar>

    );
};

export default FooterBar;
