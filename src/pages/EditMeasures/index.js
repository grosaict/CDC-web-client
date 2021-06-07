import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { getKidByMeasureId } from '../../services/api'

import AppBar from '../../components/AppBar';
import FormMeasures from '../../components/FormMeasures';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const EditMeasures = (props) => {

    const idMeasure = (props.location.state ? props.location.state.id : props.match.params.id);

    const classes = useStyles();

    const [ kid, setKid ]           = useState([]);
    const [ measure, setMeasure ]   = useState([]);
    const [ loading, setLoading ]   = useState(false);

    const loadKid = async () => {
        setLoading(true)
        let { data } = await getKidByMeasureId(idMeasure);
        console.log("EditMeasures >>> "+JSON.stringify(data))
        setKid(data.data.kid)
        setMeasure(data.data.measure)
        setLoading(false)
    }

    useEffect(() =>{
        loadKid();
    }, [idMeasure]);


    return (
        <>
            <AppBar />
            <main className="fixed-main-wrapper p-8 pt-32">
                <div className="welcome">
                    <Typography style={{ 'fontWeight': "bold" }} variant="h4" component="h4" >
                        Atualize as medidas para a data recomendada
                    </Typography>
                </div>

                <div className="content-wrapper">
                    <FormMeasures/>
                    FORMULÁRIO AQUI
                    <br/>
                    {/* {idMeasure}
                    {console.log(kid)}
                    {console.log(measure)} */}
                </div>

            </main>
        </>

    );

};

export default EditMeasures;