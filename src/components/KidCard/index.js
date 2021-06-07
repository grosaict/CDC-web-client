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

const ageCalculator = (birth) => {
  // GETTING NOW AT 00:00 GMT
  const today = new Date(new Date().getFullYear(), new Date().getMonth() ,new Date().getDate())
  // AGE IN MILLISECONDS
  const diff  = Math.abs(today.getTime() - birth.getTime())

  // ### DAYS
  // CONVERTING MILLISECONDS IN DAYS
  const days  = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 7) {
    return days+" dia(s) de idade"
  }

  // ### WEEKS
  const weeks = Math.trunc(days / 7)
  let   d     = days - (weeks * 7)
  if (weeks < 4) {
    return weeks+" semana(s) e "+d+" dia(s) de idade"
  }

  // ### MONTHS
  const months = Math.trunc(weeks / 4)
  let   w       = weeks - (months * 4)
  if (months < 12) {
    if (months === 1) {
      return months+" mês e "+w+" semana(s) de idade"
    } else {
      return months+" meses e "+w+" semana(s) de idade"
    }
  }

  // ### YEARS
  const years = Math.trunc(months / 12)
  let   m     = months - (years * 12)
  if (m === 1) {
    return years+" ano(s) e "+m+" mês de idade"
  } else {
    return years+" ano(s) e "+m+" meses de idade"
  }
}

export default function KidCard(props) {
  const k = props.data;
  const classesF = useStylesF();
  const classesM = useStylesM();

  return (
    <>
      <Link to={{ pathname: `/kid/detail/${k._id}`, state: { id: k._id } }}>
        <Card style={{height: '100%'}}>
            <CardHeader
              avatar={<Avatar aria-label="recipe" className={(k.gender === 'F') ? classesF.root : classesM.root}>{k.name.substring(0, 1) }</Avatar>}
              title={k.name+" ("+format(new Date(k.birth),'dd/MM/yyyy')+")"}
              subheader={ageCalculator(new Date(k.birth))}
            />
        </Card>
      </Link>
    </>
  );
}