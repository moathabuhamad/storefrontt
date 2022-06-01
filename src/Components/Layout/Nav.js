import React from 'react';
import Cart from './Cart.js';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import '../Style/Nav.css';

function Nav(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          ></IconButton>
          <Typography variant='h6' className={classes.title}>
            Virtual Storefront
          </Typography>
          <Cart />
        </Toolbar>
      </AppBar>
      <div data-testid='Navbar' id='spacer'></div>
    </div>
  );
}

export default Nav;
