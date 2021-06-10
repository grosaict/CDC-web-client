import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import { getKidByMeasureId } from '../../services/api'

import AppBar from '../../components/AppBar';
import FormMeasures from '../../components/FormMeasures';

const EditMeasures = (props) => {

    const idMeasure = (props.location.state ? props.location.state.id : props.match.params.id);

    const [ params, setParams ]   = useState(undefined);
    const [ loading, setLoading ]   = useState(false);

    const loadKid = async (idM) => {
        setLoading(true)
        let { data } = await getKidByMeasureId(idM);
        // console.log("EditMeasures >>> "+JSON.stringify(data))
        setParams(data.data)
        setLoading(false)
    }

    useEffect(() =>{
        loadKid(idMeasure);
    }, [idMeasure]);


    return (
        <>
            <AppBar />
            <main className="fixed-main-wrapper p-8 p-32">
                {
                    loading ?
                        <h3>carregando ... </h3>
                    :
                    <>
                        <div className="welcome">
                            <Typography style={{ 'fontWeight': "bold" }} className="side-menu-green" variant="h5" component="h5" >
                                Atualize as medidas 
                            </Typography>
                        </div>

                        <div className="content-wrapper">
                            {/* {console.log("EditMeasures 2 >>> "+JSON.stringify(params))} */}
                            <FormMeasures data={params}/>
                        </div>
                    </>
                }
            </main>
        </>

    );

};

export default EditMeasures;