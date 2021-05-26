import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '../KidCard';
import Grid from '@material-ui/core/Grid';

import { getKids } from '../../services/api'
//import { search } from '../../services/api'

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
                                                <Card key={`card-kid-${index}`} data={kid} />
                                            </Grid>
                                        ))
                                    }
                                </> 
                            : 
                                <div className="p-8">
                                    {/* <h4>Adicione uma criança </h4> */}
                                    <img src="https://github.com/grosaict/CDC-web-client/blob/master/src/imgs/arrow-310622_960_720_2.png?raw=true" alt="Adicionar Crinaça" width="80%" top="50%"></img>
                                    {/* <img src="https://cdn.pixabay.com/photo/2014/04/03/10/29/arrow-310622_960_720.png" alt="Adicionar Criança" width="60%"></img> */}
                                </div>
                        }
                        </> 
                }
            </Grid>
        </div>
    );
}

export default Kids;