import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import './index.less'
import MapRoute from './routes/MapRoute'
import routes from './routes/routes'
ReactDOM.render((
    <Router>
        <MapRoute routes={routes}/>
    </Router>
), document.getElementById('root'));
