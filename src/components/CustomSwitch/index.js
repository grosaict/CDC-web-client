import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const CustomSwitchComponent = withStyles ({
  switchBase: {
    color: "grey",
    '&$checked': {
      color: "#269500",
    },
    '&$checked + $track': {
      backgroundColor: "#269500",
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function CustomSwitch(props) {

    const { label, labelTrue, labelFalse, handleChange, value } = props;
    
    const handleChangeCheckedSwitch = (value) => {
        handleChange(value)
    }

    return (
        <>
            <Typography>
                {label}</Typography>
            <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                    {labelFalse}</Grid>
                <Grid item>
                    <CustomSwitchComponent
                        checked={value}
                        onChange={handleChangeCheckedSwitch}/>
                </Grid>
                <Grid item>
                    {labelTrue}</Grid>
            </Grid>
        </>
    );
}