import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

const DatePickerInput = (props) => {

    const { id, label, formatDate, initialPickDate, handleChange, error, disableFuture, disablePast, value, minDate, minDateMessage } = props;

    const [selectedDate, setSelectedDate] = useState(initialPickDate);
    
    const handleChangeDate = (value, formated) => {
        setSelectedDate(value);
        handleChange(value)
    }

    useEffect(() => {
        if(value){
            setSelectedDate(value)
        }
    }, [value]);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableFuture={disableFuture || false}
                disablePast={disablePast || false}
                error={error}
                //style={{width: 300}}
                disableToolbar
                variant="inline"
                inputVariant="filled"
                size="small"
                /* variant="inline" */
                /* inputVariant="outlined" */
                format={formatDate}
                margin="normal"
                id={id}
                label={label}
                value={selectedDate}
                autoOk={true}
                onChange={handleChangeDate}
                minDate={minDate}
                maxDateMessage="Data maior que a atual."
                minDateMessage={minDateMessage}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DatePickerInput;