import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';

import { getKidByVaccineId } from '../../services/api'

import AppBar from '../../components/AppBar';
import FormVaccine from '../../components/FormVaccine';

const EditVaccine = (props) => {

    const idVaccine = (props.location.state ? props.location.state.id : props.match.params.id);

    const [ params, setParams ]     = useState(undefined);
    const [ loading, setLoading ]   = useState(false);

    const loadKid = async (idV) => {
        setLoading(true)
        let { data } = await getKidByVaccineId(idV);
        data.data.form = "edit"
        setParams(data.data)
        setLoading(false)
    }

    useEffect(() =>{
        loadKid(idVaccine)
    }, [idVaccine]);


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
                            <Typography style={{ 'fontWeight': "bold" }} className="side-menu-green" variant="h6" component="h5" >
                                Atualize o registro da vacina
                            </Typography>
                        </div>
                        <div className="content-wrapper">
                            <FormVaccine data={params}/>
                        </div>
                    </>
                }
            </main>
        </>

    );

};

export default EditVaccine;