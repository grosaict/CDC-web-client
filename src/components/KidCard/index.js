import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";

import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { useToasts } from 'react-toast-notifications';
import { format } from 'date-fns';
import { desativarItem } from '../../services/api'
import randomColor from 'random-color'

const useStylesF = makeStyles((theme) => ({
  root: {
    color: '#4F3E8C',
    backgroundColor: '#CCBFD9',
  },
}));

const useStylesM = makeStyles((theme) => ({
  root: {
    color: '#FFF',
    backgroundColor: '#027368',
  },
}));

export default function KidCard(props) {
  const { data } = props;
  const theme = useTheme();
  const classesF = useStylesF();
  const classesM = useStylesM();
  const { addToast } = useToasts();
  const [setOpen] = useState(false);

            console.log(data) // ########## APAGAR

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const submitRequest = async (id) => {
    const request = await desativarItem(id);
    (request.status === 200) ? addToast(request.data.message, { appearance: 'success', autoDismissTimeout: 3000, autoDismiss: true }) : addToast(request.data.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true });
    setTimeout(()=> { 
      window.location.reload();
      handleCloseDialog();
    }, 1000);
  }

  /* const formatKidName = (name) => {
    return name.match(/\b(\w)/g).join('');
  } */

  return (
    <>
      <Link to={{ pathname: `/kid/detail/${data._id}`, state: { id: data._id } }}>
        <Card style={{height: '100%'}}>
            <CardHeader
              avatar={<Avatar aria-label="recipe" className={(data.gender === 'F') ? classesF.root : classesM.root}>{data.name.substring(0, 1)/* formatKidName(data.name) */}</Avatar>}
              title={data.name+" ("+format(new Date(data.birth),'dd/MM/yyyy')+")"}
              subheader={"9 meses e 1 semana"}          // ### TO CREATE FUNCTION TO CALCULATE THIS INFORMATION
            />
        </Card>
      </Link>
    </>
  );
}