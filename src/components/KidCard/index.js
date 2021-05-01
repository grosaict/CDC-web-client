import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { useToasts } from 'react-toast-notifications';
import { format } from 'date-fns';
import { desativarItem } from '../../services/api'
import randomColor from 'random-color'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: randomColor().hexString(),
  },
}));

export default function KidCard(props) {
  const { data } = props;
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { addToast } = useToasts();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

            console.log(data)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const submitRequest = async (id) => {
    const request = await desativarItem(id);
    (request.status === 200) ? addToast(request.data.message, { appearance: 'success' }) : addToast(request.data.message, { appearance: 'error' });
    setTimeout(()=> { 
      window.location.reload();
      handleCloseDialog();
    }, 1000);
  }

  const formatKidName = (name) => {
    return name.match(/\b(\w)/g).join('');
  }
  
  return (
    <>
      <Link to={{ pathname: `/kid/detail/${data._id}`, state: { id: data._id } }}>
        <Card style={{height: '100%'}}>
            <CardHeader
              avatar={<Avatar aria-label="recipe" className={classes.root}>{formatKidName(data.name)}</Avatar>}
              title={data.name+" ("+format(new Date(data.birth),'dd/MM/yyyy')+")"}
              subheader={"9 meses e 1 semana"}
            />
        </Card>
      </Link>
    </>
  );
}