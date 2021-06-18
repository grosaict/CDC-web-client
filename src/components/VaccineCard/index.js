import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

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

export default function VaccineCard(props) {
  const k = props.data.kid
  const v = props.data.vaccine
  const classesF = useStylesF()
  const classesM = useStylesM()

  const scheduleDateTag = () => {
      if (v) {
        return v.isSUS ? "Vacina oferecida no SUS" : "Vacina não oferecida no SUS"
      } else {
        return "Vacina não oferecida no SUS"
      }
  }

  return (
    <>
      <Card style={{height: '100%'}}>
          <CardHeader
            avatar={<Avatar aria-label="recipe" className={(k.gender === 'F') ? classesF.root : classesM.root}>{k.name.substring(0, 1) }</Avatar>}
            title={k.name+" ("+format(new Date(k.birth),'dd/MM/yyyy')+")"}
            subheader={scheduleDateTag()}
          />
      </Card>
    </>
  );
}