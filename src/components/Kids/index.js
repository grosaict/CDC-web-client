import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '../KidCard';
import Grid from '@material-ui/core/Grid';

import { getKids } from '../../services/api'
import { search } from '../../services/api'

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
                                        data.map((item, index )=> (
                                            <Grid item xs={12} sm={6} md={4} lg={4} key={`grid-kid-${index}`}>
                                                <Card key={`card-kid-${index}`} data={item} />
                                            </Grid>
                                        ))
                                    }
                                </> 
                            : 
                                <div className="p-8">
                                    <h3>Sem nada ... </h3>
                                </div>
                        }
                        </> 
                }
            </Grid>
        </div>
    );
}

export default Kids;