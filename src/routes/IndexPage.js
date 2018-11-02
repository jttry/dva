import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import {Router, Route, Switch, IndexRedirect} from 'dva/router';
import Silder from '../components/Silder';
import CustomBreadcrumb from '../components/breadcrumb'
import Routes11 from './1-1';
import Routes12 from './1-2';

class App extends Component {

    constructor(props) {
        super(props)
    };

    render() {
        return (
            <Row style={{ width: '1000px', margin: '0 auto' }}>
                <Col span={24}>
                    <CustomBreadcrumb data={this.props.common.breadcrumb} />
                </Col>
                <Col span={6}><Silder /></Col>
                <Col span={18}>
                    <Route path="/11" component={Routes11} />
                    <Route path="/12" component={Routes12} />
                    内容区域
                </Col>
            </Row>
        )
    }
}

function mapStateToProps({common}) {
    return {common};
}

export default connect(mapStateToProps)(App);