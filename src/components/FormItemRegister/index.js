import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"
import DeleteIcon from '@material-ui/icons/Delete';

import DatePickerInput from '../../components/DatePickerInput';

import { cadastrarItem, atualizarItem } from '../../services/api';

import { makeStyles } from '@material-ui/core/styles';

import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
    buttonPublicar: {
        backgroundColor: '#218002',
        '&:hover': {
            backgroundColor: '#000000'
        },
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginTop: '10px'
    },
    buttonRemoverFotos: {
        backgroundColor: '#de1212',
        '&:hover': {
            backgroundColor: '#000000'
        },
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
});

const FormItemRegister = (props) => {

    const { dataEdit, idItem } = props;

    const { addToast } = useToasts();
    const history = useHistory();
    const classes = useStyles();

    const [ categoria, setCategoria ] = useState('');
    const [ categoriaError, setErrorCategoria ] = useState(false);
    const [ tipo, setTipo ] = useState('');
    const [ tipoError, setErrorTipo ] = useState(false);
    const [ titulo, setTitulo ] = useState('');
    const [ tituloError, setErrorTitulo ] = useState(false);
    const [ descricao, setDescricao ] = useState('');
    const [ descricaoError, setErrorDescricao ] = useState(false);
    const [ dataAchadoPerdido, setDataAchadoPerdido ] = useState(new Date());
    const [ dataAchadoPerdidoError, setErrorDataAchadoPerido ] = useState(false);
    const [ imagens, setImagens ] = useState(undefined);
    const [ imagensPreview, setImagensPreview ] = useState([]);

    const handleChangeCategoria = (e) => {
        setCategoria(e.target.value);
    };

    const handleChangeTitulo = (e) => {
        setTitulo(e.target.value);
    };

    const handleChangeDescricao = (e) => {
        setDescricao(e.target.value);
    };

    const handleChangeTipo = (e) => {
        setTipo(e.target.value);
    };

    const handleChangeDataAchadoPerdido = (value) => {
        setDataAchadoPerdido(value);
    };

    const verificarCamposPrenchidos = () => {

        let isValid = true;

        if(categoria === '' || categoria === undefined){
            isValid = false;
            setErrorCategoria(true);
        } else { setErrorCategoria(false); }

        if(!titulo || titulo === '' || titulo === undefined){
            isValid = false;
            setErrorTitulo(true);
        } else { setErrorTitulo(false); }

        if(!descricao || descricao === '' || descricao === undefined){
            isValid = false;
            setErrorDescricao(true);
        } else { setErrorDescricao(false); }

        if(tipo === '' || tipo === undefined){
            isValid = false;
            setErrorTipo(true);
        } else { setErrorTipo(false); }

        if(!dataAchadoPerdido || dataAchadoPerdido === '' || dataAchadoPerdido === undefined){
            isValid = false;
            setErrorDataAchadoPerido(true);
        } else { setErrorDataAchadoPerido(false); }

        return isValid;
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        const isCamposValidos = verificarCamposPrenchidos();

        if(isCamposValidos){
            let formData = new FormData();
            formData.append('tipo', tipo);
            formData.append('categoria', categoria);
            formData.append('titulo', titulo);
            formData.append('descricao', descricao);
            formData.append('dataAchadoPerdido', dataAchadoPerdido);

            if(imagens === undefined){
                formData.append('imagens', undefined);
            } else {
                for(let i= 0; i < imagens.length; i++){
                    formData.append('imagens', imagens[i]);
                }
            }

            let request;
            if(dataEdit?._id && idItem){
                request = await atualizarItem(idItem, formData);
            } else {
                request = await cadastrarItem(formData);
            }
            if(request.status === 200) {
                addToast(request.data.message, { appearance: 'success' })
                setTimeout(() => { history.push("/") }, 1000)
            } else {
                addToast(request.data.message, { appearance: 'error' });
            }
            
        } else {
            addToast('Preencha todos os campos obrigatórios!', { appearance: 'error' });
        }

    };

    const handleFiles = (e) => {

        setImagensPreview([]);

        const files = e.target.files;
        let isValid = true;
        if(files.length > 6){
            isValid = false;
            addToast('Máximo de 6 fotos por postagem', { appearance: 'error', autoDismiss: true });
        }

        let maxSize = 2 * 1024 * 1024;
        for(let i= 0; i < files.length; i++){
            if(files.item(i).size > (maxSize)){
                isValid = false;
                addToast('O tamanho da imagem deve ser menor que 2MB', { appearance: 'error', autoDismiss: true });
                break;
            };
        }

        if(isValid) {
            setImagens(files);
            for(let i= 0; i < files.length; i++){
                let fr = new FileReader();
                fr.onload = function(e) {
                    setImagensPreview(valorAnterior => [...valorAnterior, this.result])
                }
                fr.readAsDataURL(files.item(i));
            }
            setImagens(files)
            
        }
        
        return isValid;

    } 

    const removeImagesUpload = () => {
        setImagensPreview([]);
        setImagens(undefined);
    }

    useEffect(() =>{
        if(dataEdit){
            setTipo(dataEdit.tipo);
            setCategoria(dataEdit.categoria);
            setTitulo(dataEdit.titulo);
            setDescricao(dataEdit.descricao);
            setDataAchadoPerdido(dataEdit.dataAchadoPerdido);
            setImagensPreview(dataEdit.imagens);
            dataEdit.imagens.length ? setImagens(true) : setImagens(null);
        }
    }, [dataEdit]);

    useEffect(() => {}, [imagensPreview, imagens]);

    return (
        <form className="form form-register-item" autoComplete="off" method="post" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl variant="outlined" className="form-control">
                        <InputLabel id="input-tipo-label">Tipo</InputLabel>
                        <Select
                            labelId="input-tipo-label"
                            id="input-tipo"
                            value={tipo}
                            onChange={handleChangeTipo}
                            style={{width: 300}}
                            label="Tipo"
                            error={tipoError}
                        >
                            <MenuItem value={0}>Achado</MenuItem>
                            <MenuItem value={1}>Perdido</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="outlined" className="form-control">
                        <InputLabel id="input-categoria-label">Categoria</InputLabel>
                        <Select
                            labelId="input-categoria-label"
                            id="input-categoria"
                            value={categoria}
                            onChange={handleChangeCategoria}
                            style={{width: 300}}
                            label="Categoria"
                            error={categoriaError}
                        >
                            <MenuItem value={0}>Chave</MenuItem>
                            <MenuItem value={1}>Carteira</MenuItem>
                            <MenuItem value={2}>Eletrônicos</MenuItem>
                            <MenuItem value={3}>Jóias e bijuterias</MenuItem>
                            <MenuItem value={4}>Relógio</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className="form-control">
                        <TextField variant="outlined" id="input-titulo" label="Título" onChange={handleChangeTitulo} error={tituloError} value={titulo}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className="form-control">
                        <TextField multiline rows={4} variant="outlined" id="input-descricao" label="Descrição" onChange={handleChangeDescricao} error={descricaoError} value={descricao}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className="form-control">
                        <DatePickerInput disableFuture={true} handleChange={handleChangeDataAchadoPerdido} initialPickDate={new Date()} id={"data-achado-perdido"} value={dataAchadoPerdido} label={"Data do Achado ou Perdido"} formatDate={'dd/MM/yyyy'} error={dataAchadoPerdidoError}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <label className="label-fotos">Fotos</label>
                    <span className="span-label-fotos">Adicione até 6 fotos</span>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleFiles}
                        style={{display: 'none'}}
                    />
                    <div className="wrapper-button-file">
                        <label htmlFor="contained-button-file">
                            <Fab component="span" className={classes.button}>
                                <AddPhotoAlternateIcon />
                            </Fab>
                        </label>
                    </div>

                    {
                        imagensPreview.length ?
                        <div className="wrapper-thumb-preview">
                            <Grid container spacing={1} direction="row" justify="center" alignItems="flex-start">
                                {
                                    imagensPreview.map((imagemBase64, index) => (
                                        <Grid item key={`grid-mini-thumb-preview-${index}`}>
                                            <img className="mini-thumb-preview" alt={`Preview upload`} key={`image-base-64-${index}`} src={imagemBase64}/>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                            <div className="container-button-delete">
                                <Button type="button" variant="contained" color="primary" className={classes.buttonRemoverFotos} onClick={removeImagesUpload}>
                                    <DeleteIcon/> Remover fotos selecionadas
                                </Button>
                            </div>
                        </div>
                        : null
                    }
                    
                </Grid>
            </Grid>
            <Grid container spacing={2} direction="row" justify="flex-end" alignItems="flex-end">
                <Grid item>
                    <Button type="submit" variant="contained" color="primary" className={classes.buttonPublicar}>
                        { dataEdit?._id && idItem ? 'Atualizar' : 'Publicar'}
                    </Button>
                </Grid>
            </Grid>            
        </form>

    );

};

export default FormItemRegister;