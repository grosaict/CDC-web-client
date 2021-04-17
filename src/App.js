import React from 'react';
import Routes from './routes/index';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ToastProvider } from 'react-toast-notifications'

const App = () => (
    <ToastProvider placement={'bottom-right'}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Routes />
        </MuiPickersUtilsProvider>
    </ToastProvider>
);

export default App;