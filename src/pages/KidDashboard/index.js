import React, { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import WhoChart from '../../components/WhoChart';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns'
import { getKidById } from '../../services/api'


const KidDashboard = (props) => {

    const idKid = (props.location.state ? props.location.state.id : props.match.params.id);
    const ARRAY_TIPO = ['Achado', 'Perdido'],
    ARRAY_CATEGORIA = ['Chave', 'Carteira', 'Eletrônicos', 'Jóias e bijuterias', 'Relógio'];

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

    const formatDate = (date) => {
        date = new Date(date)
        return format(new Date(date), 'dd/MM/yyyy')
    }

    const chartData = {
        title: 'Gráfico de peso para meninas de 0 a 2 anos',
        data: [
            ['x', '3', '2', '1', '0', '-1', '-2', '-3', 'kid'],
            [0, 4.8, 4.2, 3.7, 3.2, 2.8, 2.4, 2.0, 2.7],
            [1, 6.2, 5.5, 4.8, 4.2, 3.6, 3.2, 2.7, 3.7],
            [2, 7.5, 6.6, 5.8, 5.1, 4.5, 3.9, 3.4, 4.6],
            [3, 8.5, 7.5, 6.6, 5.8, 5.2, 4.5, 4.0, 5.3],
            [4, 9.3, 8.2, 7.3, 6.4, 5.7, 5.0, 4.4, 5.9],
            [5, 10.0, 8.8, 7.8, 6.9, 6.1, 5.4, 4.8, 6.4],
            [6, 10.6, 9.3, 8.2, 7.3, 6.5, 5.7, 5.1, 6.8],
            [7, 11.1, 9.8, 8.6, 7.6, 6.8, 6.0, 5.3, 7.1],
            [8, 11.6, 10.2, 9.0, 7.9, 7.0, 6.3, 5.6, 7.4],
            [9, 12.0, 10.5, 9.3, 8.2, 7.3, 6.5, 5.8, 7.7],
            [10, 12.4, 10.9, 9.6, 8.5, 7.5, 6.7, 5.9, 8],
            [12, 13.1, 11.5, 10.1, 8.9, 7.9, 7.0, 6.3, 8.4],
            [13, 13.5, 11.8, 10.4, 9.2, 8.1, 7.2, 6.4, 8.7],
            [14, 13.8, 12.1, 10.6, 9.4, 8.3, 7.4, 6.6, 8.9],
            [15, 14.1, 12.4, 10.9, 9.6, 8.5, 7.6, 6.7, 9.1],
            [16, 14.5, 12.6, 11.1, 9.8, 8.7, 7.7, 6.9, 9.3],
            [17, 14.8, 12.9, 11.4, 10.0, 8.9, 7.9, 7.0, 9.5],
            [18, 15.1, 13.2, 11.6, 10.2, 9.1, 8.1, 7.2, 9.7],
            [19, 15.4, 13.5, 11.8, 10.4, 9.2, 8.2, 7.3, 9.9],
            [20, 15.7, 13.7, 12.1, 10.6, 9.4, 8.4, 7.5, 10.1],
            [21, 16.0, 14.0, 12.3, 10.9, 9.6, 8.6, 7.6, 10.4],
            [22, 16.4, 14.3, 12.5, 11.1, 9.8, 8.7, 7.8, 10.6],
            [23, 16.7, 14.6, 12.8, 11.3, 10.0, 8.9, 7.9, 10.8],
            [24, 17.0, 14.8, 13.0, 11.5, 10.2, 9.0, 8.1, 11],            
        ],
        hAxis: 'Idade (meses)',
        vAxis: 'Peso (kg)'
   };

    return (
        <>
            <AppBar/>
            
            <main className="fixed-main-wrapper p-8 p-32">
                    { data && data._id ? <>
                        <Card className="card-detail">
                            <div className="main-wrapper">
                                <div className="title-container"> 
                                    <WhoChart data={chartData}/>
                                </div>
                            </div>
                        </Card>

                        <Card className="card-detail">
                            <div className="main-wrapper">
                                <div className="title-container"> 
                                    <WhoChart data={chartData}/>
                                </div>
                            </div>
                        </Card>

                        <Card className="card-detail">
                            <div className="main-wrapper">
                                <div className="title-container"> 
                                    <WhoChart data={chartData}/>
                                </div>
                            </div>
                        </Card>
                    </> 
                    : null}
            </main>
        </>
    );

}

export default KidDashboard;