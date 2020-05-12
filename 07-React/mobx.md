## 1.1 基础

### 1.1.1 安装

- 安装

  ```shell
  npm i mobx
  ```

  

### 1.1.2 observable 

- 将变量转换为可观察对象

#### 1.1.2.1 转换数组

- 将数组转换为可观察对象

  ```js
  import { observable } from "mobx";
  
  const arr = observable(['a', 'b', 'c']);
  console.log(arr); // Proxy {0: "a", 1: "b", 2: "c", Symbol(mobx administration): ObservableArrayAdministration}
  ```

- 同样的，转化过后的数组依然可以使用下标访问，也可以调用数组的方法

  ```js
  import { observable } from "mobx";
  const arr = observable(['a', 'b', 'c']);
  console.log(arr[0],arr[1]); // a b
  console.log(arr.pop()); // c
  ```

  

#### 1.1.2.2 转换对象

- 将对象转换为可观察对象

  ```js
  const obj = observable({ a: 1, b: 2 });
  console.log(obj); // Proxy {Symbol(mobx administration): ObservableObjectAdministration}
  console.log(obj.a, obj.b); // 1 2
  ```

  

#### 1.1.2.3 转换 Map

- 将 Map 转换为可观察对象

  ```js
  const map = observable(new Map());
  console.log(map); // ObservableMap {enhancer: ƒ, name: "ObservableMap@1", _keysAtom: Atom, _data: Map(0), _hasMap: Map(0), …}
  map.set('a', 1);
  console.log(map.has('a')); //true
  ```

  

#### 1.1.2.4 observable.box()

- 将其他基本数据类型转为可观察对象

```js
let num = observable.box(20);
let str = observable.box('hello');
let bool = observable.box(true);
console.log(num, str, bool);
// ObservableValue {name: "ObservableValue@1", isPendingUnobservation: false, isBeingObserved: false, observers: Set(0), diffValue: 0, …} 
// ObservableValue {name: "ObservableValue@2", isPendingUnobservation: false, isBeingObserved: false, observers: Set(0), diffValue: 0, …}
// ObservableValue {name: "ObservableValue@3", isPendingUnobservation: false, isBeingObserved: false, observers: Set(0), diffValue: 0, …}
```

- get() 获取原始值

  ```js
  console.log(num.get(), str.get(), bool.get()); // 20 "hello" true
  ```

  

- set() 设置值

  ```js
  num.set(50)
  str.set('word')
  bool.set(false)
  console.log(num.get(), str.get(), bool.get()); // 50 "word" false
  ```

  

#### 1.1.2.5 @observable 修饰器

- 使用 @observable 修饰器可以很方便的声明可观察对象 

- 需要安装，配置package.json，如果是3.0以后的脚手架需要 `npm run eject` 导出 webpack 配置

  ```shell
  npm i babel-plugin-transform-decorators-legacy
  ```

  ```json
  "babel": {
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
    ],
    "presets": [
      "react-app"
    ]
  }
  ```

- 

- 

  ```js
  class Store {
    @observable array = [];
    @observable obj = {};
    @observable map = new Map();
    @observable string = 'hello';
    @observable number = 20;
    @observable bool = false;
  }
  ```



### 1.1.3 观察数据变化的方式

#### 1.1.3.1 computed

- 计算属性

  ```js
  import { observable, computed } from "mobx";
  class Store {
      @observable array = [];
      @observable obj = {};
      @observable map = new Map();
      @observable string = 'hello';
      @observable number = 20;
      @observable bool = false;
  }
  var store = new Store();
  var foo = computed(() => store.string + '.....' + store.number);
  console.log(foo.get()); // hello.....20
  foo.observe(change => console.log(change)) // 监听 foo 的改变 参数change 记录了改变前后的值
  store.string = 'haha'; // 当foo改变的时候触发 observe 函数 {type: "update", object: ComputedValue, newValue: "haha.....20", oldValue: "hello.....20"}
  ```



#### 1.1.3.2 autorun

- 可观察数据被修改以后自动执行可观察数据依赖的行为

  ```js
  import { observable, autorun } from "mobx";
  class Store {
      @observable array = [];
      @observable obj = {};
      @observable map = new Map();
      @observable string = 'hello';
      @observable number = 20;
      @observable bool = false;
      @computed get mixed () {
          return store.string + '.....' + store.number
      }
  }
  var store = new Store();
  autorun(() => console.log(store.string + '.....' + store.number));
  /* 
  等价于
  autorun(() => console.log(store.mixed)); 
  结果和上面一样，这就说明 autorun 触发的条件是引用的观察数据发生改变，这个条件是比较泛的
   */
  store.string = 'haha'; // hello.....20 haha.....20 第一次自动执行，第二次改变后自动执行
  ```



#### 1.1.3.3 when

- 两个参数，第一个参数为含函数且返回一个布尔值，第二个参数为函数

- 当第一个参数为真的时候执行，且如果第一个参数返回值一开始就为真会立即执行第二个参数，即同步执行

- 还要注意的是，第一个参数返回值必须根据可观察对象计算布尔值，不能根据普通变量。

  ```js
  import { observable, computed, when } from "mobx";
  class Store {
      @observable array = [];
      @observable obj = {};
      @observable map = new Map();
      @observable string = 'hello';
      @observable number = 20;
      @observable bool = false;
  
      @computed get mixed () {
          return store.string + '.....' + store.number
      }
  }
  var store = new Store();
  when(() => store.bool, () => console.log('it is true'))
  store.bool = true; // it is true
  ```

  

#### 1.1.3.4 reaction

- 第一个参数先会执行一次，会知道哪些是观察数据对象，当这些数据发生改变 的时候就会再次执行第一个参数和第二个参数。

  ```js
  import { observable, computed, reaction } from "mobx";
  class Store {
    @observable array = [];
  @observable obj = {};
  @observable map = new Map();
  @observable string = 'hello';
  @observable number = 20;
  @observable bool = false;
  
  @computed get mixed () {
    return store.string + '.....' + store.number
  }
  }
  var store = new Store();
  reaction(() => {
    console.log('1111');
    return [store.string, store.number]
  }, arr => console.log(arr))
  store.string = 'haha' //  1111 1111 ["haha", 20] 两次 111 是因为首先会执行一次第一个参数
  ```

  

### 1.1.4 修改可观察数据

- 我们先看一下以下代码

  ```js
  import { observable, computed, reaction } from "mobx";
  class Store {
    @observable array = [];
  @observable obj = {};
  @observable map = new Map();
  @observable string = 'hello';
  @observable number = 20;
  @observable bool = false;
  
  @computed get mixed () {
    return store.string + '.....' + store.number
  }
  }
  var store = new Store();
  reaction(() => store.string, store.number], arr => console.log(arr))
  store.string = 'haha' //   ["haha", 20]
  store.number = 50 //   ["haha", 50]
  ```

- 以上代码我们可以看到，每次我们改变值的时候都会调用一次，这样会很浪费性能。所以我们引入了 action。

#### 1.1.4.1 action

```js
import { observable, computed, action, reaction } from "mobx";
class Store {
    @observable array = [];
    @observable obj = {};
    @observable map = new Map();
    @observable string = 'hello';
    @observable number = 20;
    @observable bool = false;

    @computed get mixed () {
        return store.string + '.....' + store.number
    }

    @action bar () {
        store.string = 'haha';
        store.number = 50;
    }
}
var store = new Store();
reaction(() => [store.string, store.number], arr => console.log(arr))
store.bar()//  ["haha", 50]
```

- 以上代码，我们直接调用bar函数就可以了，可以看到只会触发一次。

#### 1.1.4.2 action.bound

- action.bound 将方法绑定到 action 上

  ```js
  import { observable, computed, action, reaction } from "mobx";
  class Store {
      @observable array = [];
      @observable obj = {};
      @observable map = new Map();
      @observable string = 'hello';
      @observable number = 20;
      @observable bool = false;
  
      @computed get mixed () {
          return store.string + '.....' + store.number
      }
  
      @action.bound bar () {
          this.string = 'haha';
          this.number = 50;
      }
  }
  var store = new Store();
  reaction(() => [store.string, store.number], arr => console.log(arr))
  var bar = store.bar
  bar()//  ["haha", 50]
  ```

  

#### 1.1.4.3 runInAction

- 直接在方法内修改，且立即执行

  ```js
  import { observable, computed, action, runInAction, reaction } from "mobx";
  class Store {
      @observable array = [];
      @observable obj = {};
      @observable map = new Map();
      @observable string = 'hello';
      @observable number = 20;
      @observable bool = false;
  
      @computed get mixed () {
          return store.string + '.....' + store.number
      }
  }
  var store = new Store();
  reaction(() => [store.string, store.number], arr => console.log(arr))
  runInAction('modify',()=>{ // modify 对于调试友好
    store.string = 'haha';
    store.number = 50;
  })
  ```

  

## 1.2 mobx-react

- 接下来将学习在 react 中使用 mobx

### 1.2.1 基础

- 安装

  ```js
  npm i mobx-react // 需要注意的是需要react16.8以上版本，因为需要支持 Hook
  ```

- index.js

  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';
  import { observable, computed, action, reaction } from "mobx";
  class Store {
      @observable cache = { queue: [] } // 将 cache 转为可观察对象
  
      @action.bound refresh () {
          this.cache.queue.push(1); // 调用一次就向queue增加一个1
      }
  }
  ReactDOM.render(<App store={new Store()} />, document.getElementById('root'));
  ```

- App.js

  ```jsx
  import React, { Component } from 'react';
  import Test from "./test";
  
  class App extends Component {
  
    render () {
      return (
        <div>
          <span onClick={this.props.store.refresh}>refresh</span>
          <Test queue={this.props.store.cache.queue}></Test>
        </div>
      )
    }
  }
  
  export default App;
  ```

- test.js

  ```jsx
  import React, { Component } from 'react'
  import { observer } from "mobx-react";
  @observer // 对于需要渲染 可观察对象的组件就需要使用 observer 装饰器,无形之中将shouldComponentUpdate这个生命周期的效果给展现了出来
  class test extends Component {
      render () {
          return (
              <div>
                  {this.props.queue.length}
              </div>
          )
      }
  }
  export default test;
  ```

  















































































































