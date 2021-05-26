import React, { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import Measures from '../../components/Measures';

//import { format } from 'date-fns'
import { getKidById } from '../../services/api'


const KidDashboard = (props) => {

    const idKid = (props.location.state ? props.location.state.id : props.match.params.id);

    const [ data, setData ] = useState(undefined);

    useEffect(() =>{
        const loadKid = async () => {
            let { data } = await getKidById(idKid);
            setData(data.data)
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
                { data && data._id ? <Measures data={data}/> : null}
            </main>
        </>
    );

}

export default KidDashboard;