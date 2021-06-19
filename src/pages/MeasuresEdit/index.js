import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

import Typography from '@material-ui/core/Typography';

import { getKidByMeasureId } from '../../services/api'

import AppBar from '../../components/AppBar';
import MeasuresForm from '../../components/MeasuresForm';

const EditMeasures = (props) => {

    const idMeasure = (props.location.state ? props.location.state.id : props.match.params.id);

    const [ params, setParams ]     = useState(undefined);
    const [ loading, setLoading ]   = useState(true);

    const loadKid = async (idM) => {
        setLoading(true)
        let { data } = await getKidByMeasureId(idM);
        setParams(data)
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
                        { params.status === 200 ?
                            <>
                                <div className="welcome">
                                    <Typography style={{ 'fontWeight': "bold" }} className="side-menu-green" variant="h5" component="h5" >
                                        Atualize as medidas 
                                    </Typography>
                                </div>
                                <div className="content-wrapper">
                                    <MeasuresForm data={params}/>
                                </div>
                            </> : <Redirect to={{pathname: '/', state: {from: props.location}}} />
                        }
                    </>
                }
            </main>
        </>

    );

};

export default EditMeasures;