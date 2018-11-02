
import dva from 'dva';
import {message} from 'antd';
import createHistory from 'history/createBrowserHistory';
// import createLoading from 'dva-loading';
import './index.html';
import './index.css';

// 1. Initialize
const app = dva({
    history: createHistory(),
    onError(e, dispatch) {
        // dispatch({type: 'app/logout'});
        console.log(e);
        if (e.message === 'Unauthorized') {
            message.info('Please Login :)', 5);
        } else {
            message.error(e.message, 5);
        }
    }
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/common').default);
app.model(require('./models/example').default);
app.model(require('./models/11').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start(document.getElementById('root'));
