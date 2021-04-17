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

    useEffect(() =>{
        console.log(data)
    }, [data])

    const formatDate = (date) => {
        date = new Date(date)
        return format(new Date(date), 'dd/MM/yyyy')
    }

    const chartData = {
        title: 'Gráfico de peso para meninas de 0 a 2 anos',
        data: [
            ['x', '-3', '-2', '-1', '0', '1', '2', '3'],
            [0, 2.0, 2.4, 2.8, 3.2, 3.7, 4.2, 4.8],
            [1, 2.7, 3.2, 3.6, 4.2, 4.8, 5.5, 6.2],
            [2, 3.4, 3.9, 4.5, 5.1, 5.8, 6.6, 7.5],
            [3, 4.0, 4.5, 5.2, 5.8, 6.6, 7.5, 8.5],
            [4, 4.4, 5.0, 5.7, 6.4, 7.3, 8.2, 9.3],
            [5, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [6, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [7, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [8, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [9, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [10, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [11, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [12, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [13, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [14, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [15, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [16, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [17, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [18, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [19, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [20, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [21, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [22, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [23, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
            [24, 4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10.0],
        ],
        hAxis: 'Meses',
        vAxis: 'Peso'
   };

    return (
        <>
            <AppBar/>
            
            <main className="fixed-main-wrapper p-8 p-32">
                    { data && data._id ? <>
                        <Card className="card-detail">
                            <div className="main-wrapper">
                                
                                {/* <Card key={`card-kid-${index}`} data={item} /> */}
                                <WhoChart data={chartData}/>
                                <WhoChart data={chartData}/>
                                <WhoChart data={chartData}/>
                                {/* <div className="titulo-container">
                                    <div className="badge-container">
                                        <span className="badge-detail">#{ARRAY_TIPO[data.tipo]}</span>
                                        <span className="badge-detail">#{ARRAY_CATEGORIA[data.categoria]}</span>
                                    </div>
                                    <Typography style={{ 'fontWeight': "bold" }} variant="h4" component="h2">
                                        {data.titulo}
                                    </Typography>
                                    <span className="data-achado-perdido">{formatDate(data.dataAchadoPerdido)}</span>
                                </div>

                                <div className="descricao-container">
                                    <p className="descricao">{data.descricao}</p>
                                </div>

                                <div className="slide-images-container">
                                    { data && data.imagens ? 
                                        <>
                                            {
                                                data.imagens.map((url, i) => (
                                                    <div className="container-image" key={`container-image-${i}`}>
                                                        <img className="image" src={url} alt={`Imagem ${i+1} de ${data.imagens.length}`} key={`image-${i}`}/>
                                                    </div>
                                                ))
                                            }
                                        </>
                                    : null }
                                </div> */}

                            </div>
                        </Card>
                        {/* <Card className="card-detail">
                            <div className="user-wrapper">
                                <div className="div">
                                    <label className="label">Usuário que postou:</label>
                                    <p className="text">{data.user?.name}</p>
                                </div>
                                <div className="div">
                                    <label className="label">E-mail de quem postou:</label>
                                    <p className="text">{data.user?.email}</p>
                                </div>
                                <div className="div">
                                    <label className="label">Telefone de quem postou:</label>
                                    <p className="text">+{data.user?.phone}</p>
                                </div>
                                <div className="div">
                                    <label className="label">Data da postagem:</label>
                                    <p className="text">{formatDate(data.createAt)}</p>
                                </div>
                            </div>
                        </Card> */}
                    </> 
                    : null}
            </main>
        </>
    );

}

export default KidDashboard;