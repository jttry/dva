
## dva = redux + react-route + redux-saga

是对以上三者的封装，简化代码写法。



![image](https://thumbnail0.baidupcs.com/thumbnail/f7afaf547633f708606520b6cfd72d90?fid=705178594-250528-997528828797605&time=1541062800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-IgJHlWoKDaxI5X04W7OK2%2B6HuOE%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=7067473815987854333&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)

#### 1、通过 npm 安装 dva-cli创建新应用
```
npm install dva-cli -g
dva new dva-demo
cd dva-demo
npm start

目录结构如下
├── mock    // mock数据文件夹
├── node_modules // 第三方的依赖
├── public  // 存放公共public文件的文件夹
├── src  // 最重要的文件夹，编写代码都在这个文件夹下
│   ├── assets // 可以放图片等公共资源
│   ├── components // 就是react中的木偶组件
│   ├── models // dva最重要的文件夹，所有的数据交互及逻辑都写在这里
│   ├── routes // 就是react中的智能组件，不要被文件夹名字误导。
│   ├── services // 放请求借口方法的文件夹
│   ├── utils // 自己的工具方法可以放在这边
│   ├── index.css // 入口文件样式
│   ├── index.ejs // ejs模板引擎
│   ├── index.js // 入口文件
│   └── router.js // 项目的路由文件
├── .eslintrc // bower安装目录的配置
├── .editorconfig // 保证代码在不同编辑器可视化的工具
├── .gitignore // git上传时忽略的文件
├── .roadhogrc.js // 项目的配置文件，配置接口转发，css_module等都在这边。
├── .roadhogrc.mock.js // 项目的配置文件
└── package.json // 当前整一个项目的依赖

```
#### 2、创建dva实例

在src/index.js文件中创建实例

```
import dva from 'dva';
import createHistory from 'history/createBrowserHistory';

// 1. Initialize
const app = dva({
    history: createHistory()  //默认是hashHistory，此处改为browserHistory
});

// 2. Plugins
app.use({});

// 3. Model
app.model(require('./models/common').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start(document.getElementById('root'));

```

#### 3、定义数据处理逻辑（重要）
dva的特性是把一个路由下的state/reducer/sagas写到一个文件中

```
export default {

    namespace: 'count',       //当前 Model 的名称。
    state: {  //该 Model 当前的状态。
        record: 0,
        current: 0
    },
    subscriptions: {         //用于订阅一个数据源，然后根据需要 dispatch 相应的 action
        keyboardWatcher({ dispatch }) {
            // key('⌘+up, ctrl+up', () => { dispatch({type:'add1'}) });
        }
    },
    effects: {                //Action 处理器，处理异步动作，基于 Redux-saga 实现
        *add({ payload }, { call, put, select, take }) {   //Generator 函数
            const state= yield select();     //select，从state获取数据
            yield put({ type: 'add1'});      //put，触发action
            yield call(delay, 1000);         //call，调用异步逻辑，支持Promise
            yield put({ type: 'minus' });
        }
    },
    reducers: {               //Action 处理器，处理同步动作，用来算出最新的 State
        add1(state, action) {
            const newCurrent = state.current + 1;
            return { ...state,
                record: newCurrent > state.record ? newCurrent : state.record,
                current: newCurrent,
            };
        },
        minus(state) {
            return { ...state, current: state.current - 1 };
        }
    }

};

```

#### 4、组件与model绑定
connect 是一个函数，绑定 State 到 View。
```
import { connect } from 'dva';
class App extends React.Component {
    render() {
        const { dispatch, countState } = this.props;
        return (
            <div>
                <button onClick={() => {dispatch({type: 'count/add'})}}>+</button>
            </div>
        );
    }
}

function mapStateToProps({todos}) {
    return {todos};
}
connect(mapStateToProps)(App);
```
#### 5、路由
```
export default ({history, app}) => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/count" exact component={Count} />
                <Route path="/" component={====IndexPage====} />
            </Switch>
        </Router>
    );
}
```

ps: react-router4.0 以后嵌套路由需要将<Route />标签写到父级页面内，或者使用react-router-config

#### 整体架构
![image](https://zos.alipayobjects.com/rmsportal/PPrerEAKbIoDZYr.png)

