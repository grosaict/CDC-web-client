import React, { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import Measures from '../../components/Measures';

//import { format } from 'date-fns'
import { getKidById } from '../../services/api'

const KidDashboard = (props) => {

    const idKid = (props.location.state ? props.location.state.id : props.match.params.id);

    const [ data, setData ] = useState(undefined);
    const [pediatricsShow,  setPediatricsShow]      = useState(false);
    const [measuresShow,    setMeasuresShow]        = useState(false);
    const [vaccinesShow,    setVaccinesShowShow]    = useState(false);

    const switchKidDashboard = (showComponent) => {
        setPediatricsShow(false);
        setMeasuresShow(false);
        setVaccinesShowShow(false);
        switch (showComponent){
            case 'Pediatrics':
                setPediatricsShow(true);
                break;
            case 'Measures':
                setMeasuresShow(true);
                break;
            case 'Vaccines':
                setVaccinesShowShow(true);
                break;
            default:
                setPediatricsShow(false);
                setMeasuresShow(false);
                setVaccinesShowShow(false);
        }
    }

    useEffect(() =>{
        const loadKid = async () => {
            let { data } = await getKidById(idKid);
            let props = {
                kid: data.data,
                switchKidDashboard: switchKidDashboard
            }
            setData(props)
        }
        loadKid();
    }, [idKid])

    /* useEffect(() =>{         ### pode ser útil
        console.log(data)
    }, [data]) */

    /* const formatDate = (date) => {
        date = new Date(date)
        return format(new Date(date), 'dd/MM/yyyy')
    } */

    return (
        <>
            <AppBar data={data}/>
            <main className="fixed-main-wrapper p-8 p-32">
                { data && data.kid._id ?
                    <>
                        { pediatricsShow    ? <p>CONSULTAS</p>              : null }
                        { measuresShow      ? <Measures data={data.kid}/>   : null }
                        { vaccinesShow      ? <p>VACINAS</p>                : null }
                    </>
                : null}
            </main>
        </>
    );

}

export default KidDashboard;