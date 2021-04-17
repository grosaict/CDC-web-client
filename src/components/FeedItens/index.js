import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '../ItemCard';
import Grid from '@material-ui/core/Grid';

import { buscarTodosItens } from '../../services/api'
import { search } from '../../services/api'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
}));

const FeedItens = () => {

    const classes = useStyles();

    const [ data, setData ] = useState([]);

    var getParams = function (url) {
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        if(!query) {
            return false;
        }
        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }

        return params;
    };

    const carregarItens = async () => {
        let { data } = await buscarTodosItens();
        setData(data.data)
    }

    const realizarBusca = async (busca) => {
        if(busca.query){
            let { data } = await search(false, busca.query);
            if(!data.length) {
                carregarItens();
            } else {
                setData(data);
            }
        } else {
            let advanced = window.location.search
            let { data } = await search(true, advanced);
            if(!data.length) {
                carregarItens();
            } else {
                setData(data);
            }
        }
    }

    useEffect(() =>{
        if(!data.length){
            let busca = getParams(window.location.href);
            let hasValues = false;
            let keys = Object.keys(busca);
            for (let i = 0; i < keys.length; i++) {
                if(busca[keys[i]] != ""){
                    hasValues = true; break
                }
            }

            if(busca && hasValues){
                realizarBusca(busca);
            } else {
                carregarItens();
            }
        }
    }, [data]);
    
    return (
        <div className={classes.root}>
            <Grid container spacing={3} direction="row" justify="flex-start" alignItems="stretch">
                {
                    data.length ? 
                    <>
                        {
                            data.map((item, index )=> (
                                <Grid item xs={12} sm={6} lg={3} md={4} key={`grid-item-${index}`}>
                                    <Card key={`card-item-${index}`} data={item} />
                                </Grid>
                            ))
                        }
                    </> 
                    : 
                    <div className="p-8">
                        <h1>CARREGANDO</h1>
                    </div>
                }
                
            </Grid>
        </div>
    );

}

export default FeedItens;