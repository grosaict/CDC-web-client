import React, { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import KidForm from '../../components/KidForm';

import { getKidById } from '../../services/api'

import { useHistory } from 'react-router-dom';


const KidEdit = (props) => {

    const idKid = (props.location.state ? props.location.state.id : props.match.params.id);
    const history = useHistory();
    const [ data, setData ] = useState(undefined);

    useEffect(() =>{
        const carregarKid = async () => {
            let request = await getKidById(idKid);
            if(request.status === 400 || request.status === 403){
                history.push("/");
                history.go(0);
            } else {
                setData(request.data.data)
            }
        }
        carregarKid();
    }, [idKid])

    useEffect(() =>{
    }, [data])

    return (
        <>
            <AppBar/>
            <main className="fixed-main-wrapper p-8 pt-32">
                <div className="content-wrapper">
                    <KidForm dataEdit={data} idKid={idKid}/>
                </div>
            </main>
        </>

    );

};

export default KidEdit;