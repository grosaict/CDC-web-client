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

export default function MeasureCard(props) {
  const k = props.data.kid
  const m = props.data.measure
  const classesF = useStylesF()
  const classesM = useStylesM()

  const dueMonthTag = () => {
      return m.dueMonth === 0 ?
          "Medições no nascimento da criança" :
          "Medidas do "+m.dueMonth+"º mês (medir o mais próximo de "+format(new Date(m.scheduleDate),'dd/MM/yyyy')+")"
  }

  return (
    <>
      <Card style={{height: '100%'}}>
          <CardHeader
            avatar={<Avatar aria-label="recipe" className={(k.gender === 'F') ? classesF.root : classesM.root}>{k.name.substring(0, 1) }</Avatar>}
            title={k.name+" ("+format(new Date(k.birth),'dd/MM/yyyy')+")"}
            subheader={dueMonthTag()}
          />
      </Card>
    </>
  );
}