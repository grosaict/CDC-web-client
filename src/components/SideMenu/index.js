import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';

import format from 'date-fns/format';

import { useToasts } from 'react-toast-notifications';

export default function SideMenu(props) {

    const { onClose } = props;

    const { addToast } = useToasts();

    const [heigth, setHeigth] = useState(0);
    const [width, setWidth] = useState(0);

    const [tipoSearch, setTipoSearch] = useState('');
    const [categoriaSearch, setCategoriaSearch] = useState('');
    const [dataInicio, setDataInicio] = useState(null);
    const [dataFim, setDataFim] = useState(null);
    const [palavraSearch, setPalavraSearch] = useState('');

    const getMaxHeigth = () => {
        setHeigth((window.innerHeight - document.getElementById('div-menu-father').offsetHeight) - 20);
    }

    const getMaxWidth = () => {
        if(window.innerWidth < 768){
            setWidth('100%');
        } else {
            setWidth('40vw');
        }
    }

    const handleDataInicio = (date) => {
        setDataInicio(date);
    };

    const handleDataFim = (date) => {
        setDataFim(date);
    };

    const handleTipo = (e) => {
        setTipoSearch(e.target.value);
    };

    const handleCategoria = (e) => {
        setCategoriaSearch(e.target.value);
    };

    const handlePalavra = (e) => {
        setPalavraSearch(e.target.value);
    };

    const closeMenuPanel = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    const buscaAvancada = () => {
        if(tipoSearch === '' && categoriaSearch === '' && dataFim === '' && dataInicio === '' && palavraSearch === '') {
            addToast('Preencha pelo menos um dos campos para filtrar', { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true });
            return false;
        }
        let query = `palavrasChave=${palavraSearch}&tipo=${tipoSearch}&categoria=${categoriaSearch}&dataInicio=${dataInicio ? format(new Date(dataInicio), 'yyyy-MM-dd') : ''}&dataFim=${dataFim ? format(new Date(dataFim), 'yyyy-MM-dd') : ''}`
        window.location.href = 'http://localhost:3000/?' + query //palavrasChave=teste&tipo=1&categoria=2&dataInicio&dataFim
    }

    const buscaSimples = () => {
        if(!palavraSearch || palavraSearch === ''){
            addToast('Preencha pelo menos uma palavra chave ou termo para buscar', { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true });
            return false;
        }
        let query = encodeURIComponent(palavraSearch)
        window.location.href = 'http://localhost:3000/?query=' + query
    }

    useEffect(() => {
        getMaxHeigth();
        getMaxWidth();
    }, [width, heigth]);

    window.addEventListener('resize', () => {
        getMaxHeigth();
        getMaxWidth();
    });

    return (
        <div id="menu-mask-panel" onClick={closeMenuPanel}>
            <div className="menu-panel" style={{height: heigth, width: width}}>
                <div>

                    <div>
                        <h3>Busque por alguma coisa</h3>
                        <div className="div-form-control">
                            <FormControl className="form-control" id="div-input-query">
                                <TextField variant="outlined" id="input-query" label="Palavra chave" onChange={handlePalavra}/>
                            </FormControl>
                            <button id="button-search" onClick={buscaSimples}>
                                <SearchIcon/>
                            </button>
                        </div>
                        
                    </div>
                    <div>
                        <h3>Busca Avançada</h3>
                        <div className="div-form-control">
                            <FormControl variant="outlined" className="form-control">
                                <InputLabel id="input-tipo-label">Tipo</InputLabel>
                                <Select
                                    labelId="search-tipo-label"
                                    id="search-tipo"
                                    value={tipoSearch}
                                    onChange={handleTipo}
                                    label="Tipo"
                                    error={false}
                                >
                                    <MenuItem value={''} disabled={true}>Selecine uma opção</MenuItem>
                                    <MenuItem value={0}>Estrou procurando o que foi achado</MenuItem>
                                    <MenuItem value={1}>Estrou procurando o que foi perdido</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="div-form-control">
                            <FormControl variant="outlined" className="form-control">
                                <InputLabel id="search-categoria-label">Categoria</InputLabel>
                                <Select
                                    labelId="search-categoria-label"
                                    id="search-categoria"
                                    value={categoriaSearch}
                                    onChange={handleCategoria}
                                    label="Categoria"
                                    error={false}
                                >
                                    <MenuItem value={''} disabled={true}>Selecine uma opção</MenuItem>
                                    <MenuItem value={0}>Chave</MenuItem>
                                    <MenuItem value={1}>Carteira</MenuItem>
                                    <MenuItem value={2}>Eletrônicos</MenuItem>
                                    <MenuItem value={3}>Jóias e bijuterias</MenuItem>
                                    <MenuItem value={4}>Relógio</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="div-form-control">
                            <div className="half">
                                <FormControl variant="outlined" className="form-control">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="dataInicio-search"
                                        label="De"
                                        value={dataInicio}
                                        onChange={handleDataInicio}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </FormControl>
                            </div>

                            <div className="half">
                                <FormControl variant="outlined" className="form-control">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="dataFim-search"
                                        label="Até"
                                        value={dataFim}
                                        onChange={handleDataFim}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </FormControl>
                            </div>
                            
                        </div>

                        <div className="div-btn-busca-avancada">
                            <button id="btn-filter" onClick={buscaAvancada}>
                                Aplicar filtro avançado
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}