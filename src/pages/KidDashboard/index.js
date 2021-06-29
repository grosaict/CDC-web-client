import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";

import AppBar from '../../components/AppBar';
import KidCard from '../../components/KidCard';
import Measures from '../../components/Measures';
import Vaccines from '../../components/Vaccines';

import { getKidById } from '../../services/api'

const KidDashboard = (props) => {
    const idKid     = (props.location.state ? props.location.state.id : props.match.params.id);
    const path      = props.match.path

    const history   = useHistory();

    const [ data,           setData ]           = useState(undefined);
    const [ loading,        setLoading ]        = useState(true);
    const [ pediatricsShow, setPediatricsShow]  = useState(false);
    const [ measuresShow,   setMeasuresShow]    = useState(false);
    const [ vaccinesShow,   setVaccinesShow]    = useState(false);

    const switchKidDashboard = (showComponent) => {
        setPediatricsShow(false);
        setMeasuresShow(false);
        setVaccinesShow(false);
        switch (showComponent){
            case 'Pediatrics':
                setPediatricsShow(true);
                break;
            case 'Measures':
                setMeasuresShow(true);
                if (idKid) { history.push("/kid/detail/"+idKid+"/measures") }
                break;
            case 'Vaccines':
                setVaccinesShow(true);
                if (idKid) { history.push("/kid/detail/"+idKid+"/vaccines") }
                break;
            default:
                setMeasuresShow(true);
                //setDashboard();
        }
    }

    const loadKid = async (idK) => {
        setLoading(true)
        let { data } = await getKidById(idK);
        let props = {
            kid:                data.data,
            status:             data.status,
            message:            data.message
        }
        setData(props)
        setLoading(false)
    }

    useEffect(() =>{
        loadKid(idKid)
    }, [idKid])

    useEffect(() =>{
        const setDashboard = () => {
            switch (path) {
                case "/kid/detail/:id/pediatrics":
                    setPediatricsShow(true)
                    break;
                case "/kid/detail/:id/measures":
                    setMeasuresShow(true)
                    break;
                case "/kid/detail/:id/vaccines":
                    setVaccinesShow(true)
                    break;
                default:
                    setPediatricsShow(false)
                    setVaccinesShow(true)
                    setMeasuresShow(false)
                    break;
            }
        }
        setDashboard();
    }, [path])

    return (
            <>
                <AppBar data={data} switchKidDashboard={switchKidDashboard} />
                <main className="fixed-main-wrapper p-8 p-32">
                    { loading ?
                        <h3>carregando ... </h3>
                    : 
                        <>
                            { data.status === 200 ?
                                <>
                                    <KidCard data={data.kid}  link={false} />
                                    { pediatricsShow    ? <Redirect to={{pathname: '/pending', state: {from: props.location} }} /> : null }
                                    { measuresShow      ? <Measures data={data.kid}/>   : null }
                                    { vaccinesShow      ? <Vaccines data={data.kid}/>   : null }
                                </>
                            :
                                <Redirect to={{pathname: '/', state: {from: props.location}}} />
                            }
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

/*
    "history": {
        "length":34,
        "action":"POP",
        "location":{
            "pathname":"/kid/detail/60c67e052df72b1a64fc693a",
            "search":"",
            "hash":""
        }
    },
    "location":{
        "pathname":"/kid/detail/60c67e052df72b1a64fc693a",
        "search":"",
        "hash":""
    },
    "match":{
        "path":"/kid/detail/:id",
        "url":"/kid/detail/60c67e052df72b1a64fc693a",
        "isExact":true,
        "params":{
            "id":"60c67e052df72b1a64fc693a"
        }
    }
*/
