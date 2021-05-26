import React, { useState, useEffect } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import SquareFootRoundedIcon from '@material-ui/icons/SquareFootRounded';
import BugReportRoundedIcon from '@material-ui/icons/BugReportRounded';

import Measures from '../../components/Measures';

export default function SideMenu(props) {

    const kid = props.data.kid;
    const onClose = props.data.onClose;

    const [heigth, setHeigth] = useState(0);
    const [width, setWidth] = useState(0);

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

    const closeMenuPanel = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    const openMeasures = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
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
                <MenuList>

                    <MenuItem onClick={closeMenuPanel}>
                        <ListItemIcon onClick={closeMenuPanel}>
                            <LocalHospitalRoundedIcon className="side-menu-green" fontSize="small" onClick={closeMenuPanel}/>
                        </ListItemIcon>
                        <Typography className="side-menu-green" variant="inherit" onClick={closeMenuPanel}>Consultas</Typography>
                    </MenuItem>

                    <MenuItem onClick={openMeasures}>
                        <ListItemIcon onClick={openMeasures}>
                            <SquareFootRoundedIcon className="side-menu-green" fontSize="small" onClick={openMeasures}/>
                        </ListItemIcon>
                        <Typography className="side-menu-green" variant="inherit" onClick={openMeasures}>Medidas</Typography>
                    </MenuItem>
                    
                    <MenuItem onClick={closeMenuPanel}>
                        <ListItemIcon onClick={closeMenuPanel}>
                            <BugReportRoundedIcon className="side-menu-green" fontSize="small" onClick={closeMenuPanel}/>
                        </ListItemIcon>
                        <Typography className="side-menu-green" variant="inherit" onClick={closeMenuPanel}>Vacinas</Typography>
                    </MenuItem>
                    
                </MenuList>
            </div>
        </div>
    );

}