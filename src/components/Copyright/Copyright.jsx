import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Copyright = (props) =>{
    return (
      <div>
        <Typography  variant="body2" color="#ffffff" align="center" {...props}>
          {'Copyright © SGD '}
          {/* <Link color="#ffffff" href="#"> */}
            
          {/* </Link>{' '} */}
          {new Date().getFullYear()}
        </Typography>
        <Typography  variant="body3" color="#ffffff" align="center" {...props}>
          {'Sistema de Gestión Documental'}
        </Typography>
      </div>
    );
  };

  export default Copyright;