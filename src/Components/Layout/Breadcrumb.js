import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCategory } from '../../Store-rtk/category-slice.js';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

function Breadcrumb(props) {
  const dispatch = useDispatch();

  function handleClick(e) {
    console.log(e)
    e.preventDefault();
    dispatch(toggleCategory(e.target.value));
  }

  return (
    <Breadcrumbs aria-label='breadcrumb'>
      <Typography color='textPrimary'>
        <option value='home' onClick={handleClick} data-testid='home'>
          Browse by Category
        </option>
      </Typography>
      <span data-testid='food'>
        <option color='inherit' value='FOOD' onClick={handleClick}>
          Food
        </option>
      </span>
      <option
        color='inherit'
        value='HOUSEWARES'
        onClick={handleClick}
        data-testid='housewares'
      >
        Housewares
      </option>
      <option
        color='inherit'
        value='OUTDOORS'
        onClick={handleClick}
        data-testid='outdoors'
      >
        Outdoors
      </option>
      <option
        color='inherit'
        value='ALL'
        onClick={handleClick}
        data-testid='all'
      >
        View All
      </option>
    </Breadcrumbs>
  );
}

export default Breadcrumb;
