import React from 'react';
// import ReactDOM from 'react-dom';


//Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  searchForm: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
  },
  button: {
    marginTop: '9px',
  },
}));

const Form = props => {
  const classes = useStyles();
  return (
    <form noValidate autoComplete="off" className={classes.searchForm} onSubmit={ props.getPerson } >
      <TextField label="Search for an Actor" name="personName" color="primary" />
      <Button className={classes.button} type="submit" variant="contained" color="primary">
        Search
    </Button>
    </form>
  );
};

export default Form;