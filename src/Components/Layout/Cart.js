import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adjustProduct } from '../../Store-rtk/product-slice.js';
import { adjust, remove } from '../../Store-rtk/cart-slice.js';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '30%',
    maxWidth: '50%',
    height: '100%',
    position: 'absolute',
    right: '0',
    top: '0',
    padding: '10px 10px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  Button: {},
}));

function Cart(props) {
  const classes = useStyles();
  const itemsInCart = useSelector((state) => state.cart);
  const totalItemsInCart = itemsInCart.reduce((acc, item) => {
    return acc + item.numInCart;
  }, 0);
  const totalCost = itemsInCart.reduce((acc, item) => {
    return acc + item.numInCart * item.price;
  }, 0);

  const dispatch = useDispatch();

  function handleClick(item, method) {
    dispatch(adjustProduct({ item, method }));
    if (method === 'subtractAll') {
      dispatch(remove({ item, method }));
    } else {
      dispatch(adjust({ item, method }));
    }
  }

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
          <Typography className={classes.heading}>
            Cart {totalItemsInCart > 0 ? `(${totalItemsInCart})` : ''}
          </Typography>
        </AccordionSummary>
        {itemsInCart.map((item) => {
          return (
            <AccordionDetails key={item.name}>
              <Typography>
                {item.name} ({item.numInCart} x {item.price}) = $
                {item.numInCart * item.price}
                <IconButton
                  className={classes.Button}
                  color='secondary'
                  size='small'
                  onClick={() => handleClick(item, 'subtract')}
                >
                  <ArrowDownwardIcon fontSize='inherit' />
                </IconButton>
                <IconButton
                  className={classes.Button}
                  color='secondary'
                  size='small'
                  onClick={() => handleClick(item, 'add')}
                >
                  <ArrowUpward fontSize='inherit' />
                </IconButton>
                <IconButton
                  className={classes.Button}
                  aria-label='delete'
                  size='small'
                  onClick={() => handleClick(item, 'subtractAll')}
                >
                  <DeleteIcon />
                </IconButton>
              </Typography>
            </AccordionDetails>
          );
        })}
        <AccordionDetails>
          <Typography>
            Total Items: {totalItemsInCart} Total Cost: {totalCost}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Cart;
