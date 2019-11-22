import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import 'antd/dist/antd.css';

import './index.less'
import MapRoute from './routes/MapRoute'
import routes from './routes/routes'
import axios from 'axios'
Component.prototype.$http = axios
ReactDOM.render((
    <Router>
        <MapRoute routes={routes}/>
    </Router>
), document.getElementById('root'));
