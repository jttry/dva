import React from 'react';
import { connect } from 'dva';
import styles from './Count.css';

class Count extends React.Component {
    render() {
        const { dispatch, countState } = this.props;

        return (
            <div className={styles.normal}>
                <div className={styles.record}>Highest Record: {countState.record}</div>
                <div className={styles.current}>{countState.current}</div>
                <div className={styles.button}>
                    <button onClick={() => {dispatch({type: 'count/add'})}}>+</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        countState: state.count
    };
}

export default connect(mapStateToProps)(Count);
