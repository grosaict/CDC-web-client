import React from 'react';

import AppBar from '../../components/AppBar';
import Kids from '../../components/Kids';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

const Home = (props) => {

    return (
        <>
            <AppBar/>
            <main className="fixed-main-wrapper p-8 pt-32">
                <Kids/>
                <div id="div-button-register">
                    <Link 
                        to={{
                            pathname: "/item/register",
                          }}
                    >
                        <button type="button" id="button-register">
                            <AddIcon className="icon" color="primary"/>
                        </button>
                    </Link>
                </div>
                
            </main>
        </>
    );

}

export default Home;