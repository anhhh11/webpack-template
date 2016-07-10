const _ = require('lodash/fp'),
  $ = require('jquery'),
  l = console.log.bind(console);
import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import HomeCom from './components/Home'
render((
  <Router history={browserHistory}>
    <Route path="/" component={HomeCom}>
      <IndexRoute component={HomeCom}/>
    </Route>
  </Router>
), document.getElementById('app'));

