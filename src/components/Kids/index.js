import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import KidCard from '../KidCard';

import { getKids } from '../../services/api'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const Kids = () => {

    const classes = useStyles();

    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const loadKidsData = async () => {
        setLoading(true)
        let { data } = await getKids();
        setData(data)
        setLoading(false)
    }

    useEffect(() =>{
        loadKidsData();
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={3} direction="row" justify="flex-start" alignItems="stretch">

                {
                    loading ?
                        <div className="p-8">
                            <h3>carregando ... </h3>
                        </div>
                    : 
                        <>
                        {
                            data.length ? 
                                <>
                                    {
                                        data.map((kid, index )=> (
                                            <Grid item xs={12} sm={6} md={4} lg={4} key={`grid-kid-${index}`}>
                                                <KidCard key={`card-kid-${index}`} data={kid} link={true} />
                                            </Grid>
                                        ))
                                    }
                                </> 
                            : 
                                <div className="p-8" id="div-click-here">
                                    <img src="https://github.com/grosaict/CDC-web-client/blob/master/src/imgs/arrow-310622_960_720_2.png?raw=true" alt="Adicionar Crinaça" width="80%" top="50%"></img>
                                </div>
                        }
                        </> 
                }
            </Grid>
        </div>
    );
}

export default Kids;