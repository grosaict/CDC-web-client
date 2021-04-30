import React, { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import FormKidCreate from '../../components/FormKidCreate';

import { getKidById } from '../../services/api'

import Typography from '@material-ui/core/Typography';

import { useHistory } from 'react-router-dom';


const ItemEdit = (props) => {

    const idItem = (props.location.state ? props.location.state.id : props.match.params.id);
    const history = useHistory();
    const [ data, setData ] = useState(undefined);

    useEffect(() =>{
        const carregarItem = async () => {
            let request = await getKidById(idItem);
            if(request.status === 403){
                history.push('/')
            } else {
                setData(request.data.data)
            }
        }
        carregarItem();
    }, [idItem])

    useEffect(() =>{
    }, [data])

    return (
        <>
            <AppBar/>
            <main className="fixed-main-wrapper p-8 pt-32">
                <div className="welcome">
                    <Typography style={{ 'fontWeight': "bold" }} variant="h4" component="h2" >
                        O que você está publicando?
                    </Typography>
                </div>

                <div className="content-wrapper">
                    <FormKidCreate dataEdit={data} idItem={idItem}/>
                </div>
            </main>
        </>

    );

};

export default ItemEdit;