import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  default: {
      backgroundColor: '#269500',
      '&:hover': {
          backgroundColor: '#000000'
      },
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      marginTop: '10px'
  },
  alert: {
      backgroundColor: 'red',
      '&:hover': {
          backgroundColor: '#000000'
      },
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
});

export default function AlertDialogSlide (props) {
  const { label, title, message, action } = props;

  const buttonClass       = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid item>
          <Button type="submit" variant="contained" color="primary" className={buttonClass.alert} onClick={handleClickOpen}>
              {label}
          </Button>
      </Grid>
      <div>
        {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Slide in alert dialog
        </Button> */}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
              {title}</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {message}</DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              CANCELA
            </Button>
            <Link to={{ pathname: action } } >
              <Button /* onClick={handleClose} */ color="primary">
                CONFIRMA
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}