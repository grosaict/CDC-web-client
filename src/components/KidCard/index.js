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
  const today = new Date(new Date().getFullYear(), new Date().getMonth() ,new Date().getDate()) // hoje desconsiderando as horas
  const diff  = Math.abs(today.getTime() - birth.getTime()) // subtraindo hoje da data de nascimento em milisengundos

  console.log(birth)
  console.log(today)
  console.log(diff)


  // ### DAYS
  const days  = Math.ceil(diff / (1000 * 60 * 60 * 24)); // calculando a quantidade de dias entre as datas
  console.log(days)
  if (days < 7) {
    return days+" dia(s)"
  }

  // ### WEEKS
 /*  let num = days / 7;
  const [w = 0, d = 0] = num.toString()
  .split('.')
  .map((num) => parseInt(num)); */

  let weeks = Math.trunc(days / 7)
  let d     = days - (weeks * 7)
  console.log(weeks, d)

  if (weeks < 4) {
    return weeks+" semana(s) e "+d+" dia(s)"
  }

  // ### MONTHS
  const   months = Math.trunc(weeks / 4)
  console.log('months '+months)
  if (months < 12) {
    if (months === 1) {
      return months+" mês"
    } else {
      return months+" meses"
    }
  }

  // ### YEARS
  const years = Math.trunc(months / 12)
  let   m     = months - (years * 12)
  if (years === 1) {
    return years+" ano e "+m+" meses"
  } else {
    return years+" anos e "+m+" meses"
  }
}

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
              subheader={ageCalculator(new Date(data.birth))}
            />
        </Card>
      </Link>
    </>
  );
}