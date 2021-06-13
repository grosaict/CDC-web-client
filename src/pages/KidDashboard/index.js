import React, { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import KidCard from '../../components/KidCard';
import Measures from '../../components/Measures';
import Vaccines from '../../components/Vaccines';

import { getKidById } from '../../services/api'

const KidDashboard = (props) => {
    const idKid = (props.location.state ? props.location.state.id : props.match.params.id);
    const path = props.match.path

    const [ data,           setData ]           = useState(undefined);
    const [ loading,        setLoading ]        = useState(true);
    const [ pediatricsShow, setPediatricsShow]  = useState(false);
    const [ measuresShow,   setMeasuresShow]    = useState(false);
    const [ vaccinesShow,   setVaccinesShow]    = useState(false);

    const setDashboard = (p) => {
        switch (p) {
            case "/kid/detail/:id/pediatrics":
                setPediatricsShow(true)
                break;
            case "/kid/detail/:id/vaccines":
                setVaccinesShow(true)
                break;    
            default:
                setVaccinesShow(true)
                //setMeasuresShow(true)
                break;
        }
    }

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
            setDashboard(path)
        }
        loadKid();
    }, [idKid, path])

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
                                    { vaccinesShow      ? <Vaccines data={data.kid}/>   : null }
                                </>
                            : null}
                        </>
                }
            </main>
        </>
    );

}

export default KidDashboard;

    /*
    "history": {
        "length":21,
        "action":"PUSH",
        "location": {
            "pathname":"/kid/detail/60c617a0b2fda541987e1692",
            "state": {
                "id":"60c617a0b2fda541987e1692"
            },
            "search":"",
            "hash":"",
            "key":"fwil0k"
        }
    },  
    "location": {
        "pathname":"/kid/detail/60c617a0b2fda541987e1692",
        "state": {
            "id":"60c617a0b2fda541987e1692"
        },
        "search":"","hash":"",
        "key":"fwil0k"
    },
    "match": {
        "path":"/kid/detail/:id",
        "url":"/kid/detail/60c617a0b2fda541987e1692",
        "isExact":true,
        "params":{
            "id":"60c617a0b2fda541987e1692"
        }
    }
    */