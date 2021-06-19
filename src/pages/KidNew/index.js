import React from 'react';

import AppBar from '../../components/AppBar';
import KidForm from '../../components/KidForm';

import Typography from '@material-ui/core/Typography';


const KidNew = () => {
    return (
        <>
            <AppBar/>
            <main className="fixed-main-wrapper p-8 pt-32">
                <div className="welcome">
                    <Typography style={{ 'fontWeight': "bold" }} className="side-menu-green" variant="h5" component="h5" >
                        Informe os dados da criança
                    </Typography>
                </div>

                <div className="content-wrapper">
                    <KidForm/>
                </div>

            </main>
        </>
    );
};

export default KidNew;