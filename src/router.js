import React from 'react';
import {Router, Route, Switch, IndexRedirect} from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login';
import Count from './routes/Count';

export default ({history, app}) => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/count" exact component={Count} />
                <Route path="/" component={IndexPage} />
            </Switch>
        </Router>
    );
}

