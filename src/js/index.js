import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import * as actions from './actions'
import configureStore from './stores/configureStore'
import App from './containers/App'
import Home from './containers/Home'
import Blog from './containers/Blog'
import About from './containers/About'

// Global setting
window.jQuery = window.$ = require('jquery');
window.Highcharts = require('highcharts/highmaps');
require('highcharts/modules/drilldown')(Highcharts);

let store = configureStore();

// console.log(store.getState());
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/blog" component={Blog} />
                <Route path="/about" component={About} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)