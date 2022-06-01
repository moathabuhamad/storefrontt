import React from 'react';
import { useDispatch } from 'react-redux';
import { adjustProduct } from '../../Store-rtk/product-slice.js';
import { adjust } from '../../Store-rtk/cart-slice.js';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Unsplash from 'react-unsplash-wrapper';

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    maxHeight: 300,
  },
  media: {
    maxheight: 100,
  },
});

function MediaCard(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  function handleClick(item, method) {
    dispatch(adjustProduct({ item, method }));
    dispatch(adjust({ item, method }));
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Unsplash width='200' height='100' keywords={props.item.name} img />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.item.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          size='small'
          color='primary'
          onClick={() => handleClick(props.item, 'add')}
        >
          ${props.item.price} <ShoppingCart fontSize='inherit' />
        </IconButton>
        <Button size='small' color='primary'>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default MediaCard;
