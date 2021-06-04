import React, { useState, useEffect } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import SquareFootRoundedIcon from '@material-ui/icons/SquareFootRounded';
import BugReportRoundedIcon from '@material-ui/icons/BugReportRounded';

export default function SideMenu(props) {

    const onClose               = props.data.onClose;
    const switchKidDashboard    = props.data.switchKidDashboard;

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
    
    const openPediatrics = (e) => {
        if(e.target === e.currentTarget){
            switchKidDashboard('Pediatrics');
            onClose();
        }
    }    
    
    const openMeasures = (e) => {
        if(e.target === e.currentTarget){
            switchKidDashboard('Measures');
            onClose();
        }
    }
    
    const openVaccines = (e) => {
        if(e.target === e.currentTarget){
            switchKidDashboard('Vaccines');
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

                    <MenuItem onClick={openPediatrics}>
                        <ListItemIcon onClick={openPediatrics}>
                            <LocalHospitalRoundedIcon className="side-menu-green" fontSize="small" onClick={openPediatrics}/>
                        </ListItemIcon>
                        <Typography className="side-menu-green" variant="inherit" onClick={openPediatrics}>Consultas</Typography>
                    </MenuItem>

                    <MenuItem onClick={openMeasures}>
                        <ListItemIcon onClick={openMeasures}>
                            <SquareFootRoundedIcon className="side-menu-green" fontSize="small" onClick={openMeasures}/>
                        </ListItemIcon>
                        <Typography className="side-menu-green" variant="inherit" onClick={openMeasures}>Medidas</Typography>
                    </MenuItem>
                    
                    <MenuItem onClick={openVaccines}>
                        <ListItemIcon onClick={openVaccines}>
                            <BugReportRoundedIcon className="side-menu-green" fontSize="small" onClick={openVaccines}/>
                        </ListItemIcon>
                        <Typography className="side-menu-green" variant="inherit" onClick={openVaccines}>Vacinas</Typography>
                    </MenuItem>
                    
                </MenuList>
            </div>
        </div>
    );

}