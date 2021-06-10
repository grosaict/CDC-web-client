import React, { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import KidCard from '../../components/KidCard';
import Measures from '../../components/Measures';

import { getKidById } from '../../services/api'

const KidDashboard = (props) => {

    const idKid = (props.location.state ? props.location.state.id : props.match.params.id);

    const [ data, setData ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);
    const [pediatricsShow,  setPediatricsShow]  = useState(false);
    const [measuresShow,    setMeasuresShow]    = useState(true);
    const [vaccinesShow,    setVaccinesShow]    = useState(false);

    const switchKidDashboard = (showComponent) => {
        switch (showComponent){
            case 'Pediatrics':
                setPediatricsShow(true);
                setMeasuresShow(false);
                setVaccinesShow(false);
                break;
            case 'Measures':
                setPediatricsShow(false);
                setMeasuresShow(true);
                setVaccinesShow(false);
                break;
            case 'Vaccines':
                setPediatricsShow(false);
                setMeasuresShow(false);
                setVaccinesShow(true);
                break;
            default:
                setPediatricsShow(false);
                setMeasuresShow(false);
                setVaccinesShow(false);
        }
    }

    useEffect(() =>{
        setLoading(true)
        const loadKid = async () => {
            let { data } = await getKidById(idKid);
            let props = {
                kid:                data.data,
                switchKidDashboard: switchKidDashboard
            }
            setData(props)
            setLoading(false)
        }
        loadKid();
    }, [idKid])

    /* useEffect(() =>{         ### pode ser útil
        console.log(data)
    }, [data]) */

    return (
        <>
            <AppBar data={data}/>
            <main className="fixed-main-wrapper p-8 p-32">
                {
                    loading ?
                        <h3>carregando ... </h3>
                    : 
                        <>
                            { data && data.kid._id ?
                                <>
                                    <KidCard data={data.kid} />
                                    { pediatricsShow    ? <p>CONSULTAS</p>              : null }
                                    { measuresShow      ? <Measures data={data.kid}/>   : null }
                                    { vaccinesShow      ? <p>VACINAS</p>                : null }
                                </>
                            : null}
                        </>
                }
            </main>
        </>
    );

}

export default KidDashboard;