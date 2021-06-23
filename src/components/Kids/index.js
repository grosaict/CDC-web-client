import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { getKids } from '../../services/api'
import Auth from '../../services/auth'

import KidCard from '../KidCard';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const Kids = (props) => {

    const classes = useStyles();

    const [ data, setData ]         = useState([]);
    const [ status, setStatus ]     = useState([]);
    const [ loading, setLoading ]   = useState(false);

    const loadKidsData = async () => {
        setLoading(true)
        let { status, data } = await getKids();
        setData(data)
        setStatus(status)
        console.log("loadKidsData > status > data")
        console.log(status+" > "+JSON.stringify(data))
        setLoading(false)
    }

    useEffect(() =>{
        loadKidsData();
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={3} direction="row" justify="flex-start" alignItems="stretch">
                { loading ?
                    <div className="p-8">
                        <h3>carregando ... </h3>
                    </div>
                    : 
                    <>
                        { status === 401 ?
                        <>
                            { Auth.logout() }
                            <Redirect to={{pathname: '/', state: {from: props.location}}} />
                        </>
                        :
                        <>
                            { status === 200 ? 
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
                    </> 
                }
            </Grid>
        </div>
    );
}

export default Kids;