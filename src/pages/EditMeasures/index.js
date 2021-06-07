import React from 'react';

import AppBar from '../../components/AppBar';
//import FormKidCreate from '../../components/FormKidCreate';

import Typography from '@material-ui/core/Typography';


const EditMeasures = (props) => {
    const idMeasure = props.match.params.id
    console.log(idMeasure)
    return (
        <>
            <AppBar/>
            <main className="fixed-main-wrapper p-8 pt-32">
                {/* <KidCard data={data.kid} /> */}
                <div className="welcome">
                    <Typography style={{ 'fontWeight': "bold" }} variant="h4" component="h4" >
                        Atualize as medidas para a data recomendada
                    </Typography>
                </div>

                <div className="content-wrapper">
                    {/* <FormKidCreate/> */}
                    FORMULÁRIO AQUI
                    <br/>
                    {idMeasure}
                </div>

            </main>
        </>

    );

};

export default EditMeasures;