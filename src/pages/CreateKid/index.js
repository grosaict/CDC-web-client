import React from 'react';

import AppBar from '../../components/AppBar';
import FormKidCreate from '../../components/FormKidCreate';

import Typography from '@material-ui/core/Typography';


const CreateKid = () => {

    return (
        <>
            <AppBar/>
            <main className="fixed-main-wrapper p-8 pt-32">
                <div className="welcome">
                    <Typography style={{ 'fontWeight': "bold" }} variant="h4" component="h2" >
                        Informe os dados da criança
                    </Typography>
                </div>

                <div className="content-wrapper">
                    <FormKidCreate/>
                </div>

            </main>
        </>

    );

};

export default CreateKid;