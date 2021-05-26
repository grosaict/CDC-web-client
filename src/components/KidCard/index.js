import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';

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
  const classesF = useStylesF();
  const classesM = useStylesM();

  return (
    <>
      <Link to={{ pathname: `/kid/detail/${data._id}`, state: { id: data._id } }}>
        <Card style={{height: '100%'}}>
            <CardHeader
              avatar={<Avatar aria-label="recipe" className={(data.gender === 'F') ? classesF.root : classesM.root}>{data.name.substring(0, 1)/* formatKidName(data.name) */}</Avatar>}
              title={data.name+" ("+format(new Date(data.birth),'dd/MM/yyyy')+")"}
              subheader={"9 meses e 1 semana"}          // ### NEED CREATE A FUNCTION TO CALCULATE THIS INFORMATION
            />
        </Card>
      </Link>
    </>
  );
}