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

    const loadKidsData = async () => {
        let { data } = await getKids();
        setData(data.data)
    }

    const loadKids = async (kidsParams) => {
        if(kidsParams.query){
            let { data } = await search(false, kidsParams.query);
            if(!data.length) {
                loadKidsData();
            } else {
                setData(data);
            }
        } else {
            let advanced = window.location.search
            let { data } = await search(true, advanced);
            if(!data.length) {
                loadKidsData();
            } else {
                setData(data);
            }
        }
    }

    useEffect(() =>{
        if(!data.length){
            let kidsParams = getParams(window.location.href);
            let hasValues = false;
            let keys = Object.keys(kidsParams);
            for (let i = 0; i < keys.length; i++) {
                if(kidsParams[keys[i]] != ""){
                    hasValues = true; break
                }
            }

            if(kidsParams && hasValues){
                loadKids(kidsParams);
            } else {
                loadKidsData();
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
                                <Grid item xs={12} sm={6} md={4} lg={4} key={`grid-kid-${index}`}>
                                    <Card key={`card-kid-${index}`} data={item} />
                                </Grid>
                            ))
                        }
                    </> 
                    : 
                    <div className="p-8">
                        <h3>carregando ...</h3>
                    </div>
                }
            </Grid>
        </div>
    );
}

export default Kids;