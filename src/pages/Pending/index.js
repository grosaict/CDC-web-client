import React from 'react';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import AppBar from '../../components/AppBar';

const Pending = (props) => {
    let goBack
    if (props.location.state) {
        goBack = "#"+props.location.state.from.pathname
    } else {
        goBack = '/'
    }

    return (
        <>
            <AppBar/>
            <main className="fixed-main-wrapper p-8 pt-32">
                <br/><br/><br/>
                <Typography align="center" variant="h4">
                    Não implementado!
                </Typography>
                <br/>
                <Typography align="center" variant="h5">
                    Em breve novidades.
                </Typography>
                <br/>
                <Typography align="center" variant="h6">
                    <Link href={goBack}>
                        Voltar para Página Anterior</Link>
                </Typography>
                <br/>
                <Typography align="center" variant="h6">
                    <Link href="/">
                        Ir para Página Inicial</Link>
                </Typography>
            </main>
        </>
    );

}

export default Pending;