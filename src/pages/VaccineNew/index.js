import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';

import { getKidById } from '../../services/api'

import AppBar from '../../components/AppBar';
import VaccineForm from '../../components/VaccineForm';

const NewVaccine = (props) => {
    const idKid = (props.location.state ? props.location.state.id : props.match.params.id);

    const [ params, setParams ]     = useState(undefined);
    const [ loading, setLoading ]   = useState(true);

    const loadKid = async (idK) => {
        setLoading(true)
        let { data } = await getKidById(idK);
        let obj = {}
            obj.status  = data.status
            obj.message = data.message
            obj.kid     = data.data
            obj.form    = "new"
        setParams(obj)
        setLoading(false)
    }

    useEffect(() =>{
        loadKid(idKid)
    }, [idKid]);

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
                                    <Typography style={{ 'fontWeight': "bold" }} className="side-menu-green" variant="h6" component="h5" >
                                        Adicione o registro da vacina
                                    </Typography>
                                </div>
                                <div className="content-wrapper">
                                    <VaccineForm data={params}/>
                                </div>
                            </> : 
                            <>
                                <Typography style={{ 'fontWeight': "bold" }} className="side-menu-green" variant="h6" component="h5" >
                                    ESSA PÁGINA NÃO EXISTE
                                </Typography>
                            </>
                        }
                    </>
                }
            </main>
        </>
    );
};

export default NewVaccine;