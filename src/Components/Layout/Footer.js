import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  text: {
    right: 0,
    padding: theme.spacing(2, 2, 0),
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    flexGrow: 1,
  },
}));

function Footer(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position='fixed' color='primary' className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.text}>
            &copy; Moath Abu Hamad 2022
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Footer;
