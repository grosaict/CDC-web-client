import React from 'react';

import AppBar from '../../components/AppBar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';


const Error = (props) => {

    return (
        <>
            <AppBar/>
            <main className="fixed-main-wrapper p-8 pt-32">
                <Typography align="center" variant="h2">
                    404
                </Typography>
                <Typography align="center" variant="h5">
                    Página não encontrada!
                </Typography>
                <Typography align="center" variant="h6">
                    <Link href="/">Ir para Página Inicial</Link>
                </Typography>
            </main>
        </>
    );

}

export default Error;