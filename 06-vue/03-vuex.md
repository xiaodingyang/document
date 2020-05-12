## 1.1 vuex 概念

- Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 [devtools extension](https://github.com/vuejs/vue-devtools)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

### 1.1.1 什么是“状态管理模式”？

- 让我们从一个简单的 Vue 计数应用开始：

  ```js
  new Vue({
    // state
    data () {
      return {
        count: 0
      }
    },
    // view
    template: `<button @click="increment"></button> <div>{{ count }}</div> `,
    // actions
    methods: {
      increment () {
        this.count++
      }
    }
  })
  ```

- 这个状态自管理应用包含以下几个部分：
  - **state**，驱动应用的数据源；
  - **view**，以声明方式将 **state** 映射到视图；
  - **actions**，响应在 **view** 上的用户输入导致的状态变化。

- 以下是一个表示“单向数据流”理念的极简示意：

![](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/image-20200429100041128.png)

- 但是，当我们的应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏：
  > - 多个视图依赖于同一状态。
  > - 来自不同视图的行为需要变更同一状态。
  > - 以上两点都是什么情况下使用vuex
  
- 对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。

- 对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

- 因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

- 另外，通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，我们的代码将会变得更结构化且易维护。

- 这就是 Vuex 背后的基本思想，借鉴了 [Flux](https://facebook.github.io/flux/docs/overview.html)、[Redux](http://redux.js.org/) 和 [The Elm Architecture](https://guide.elm-lang.org/architecture/)。与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。

- ![](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/Snipaste_2020-04-29_10-07-36.png)


### 1.1.2 核心概念：

> - `store`：类似容器，包含应用的大部分状态，一个页面只能有一个 `store`，状态存储是响应式的，唯一途径显式的提交 `mutations`。
>
> - `state`：包含所有应用级别状态的对象。页面状态管理容器对象。集中存储 `Vue components` 中 `data` 对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取，利用 Vue 的细粒度数据响应机制来进行高效的状态更新。
>
> - `Vue Components`：Vue 组件。HTML页面上，负责接收用户操作等交互行为，执行 `dispatch` 方法触发对应 `actions` 进行回应。
>
> - `getters`：在组件内部获取 store 中状态的函数。 
>
> - `mutations`：唯一修改状态的时间回调函数（默认同步），是 `Vuex` 修改 `state` 的唯一推荐方法，其他修改方式在严格模式下将会报错。该方法`只能进行同步操作`，且方法名只能全局唯一。操作之中会有一些 `hook` 暴露出来，以进行 `state` 的监控等。
>
> - `commit`：状态改变提交操作方法。对 `mutation` 进行提交，是唯一能执行 `mutation` 的方法。
>
> - `actions`：包含异步操作，提交mutation改变状态。负责处理 `Vue Components` 接收到的所有交互行为。包含`同步/异步操作`，支持多个同名方法，按照注册的顺序依次触发。向后台 `API` 请求的操作就在这个模块中进行，包括触发其他 `actions` 以及提交 `mutation` 的操作。该模块提供了 `Promise` 的封装，以支持 `actions` 的链式触发。
>
> - `dispatch`：操作行为触发方法，是唯一能执行 `actions` 的方法。
>
> - `modules`：将store分割成不同的模块。
>
>   

总结：

> 同步： commit --> mutations --> state
>
> 异步：dispatch （触发action）--> action --> commit（提交mutations） --> mutations --> state

## 1.2 vuex 使用 和 定义

- 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。Vuex 和单纯的全局对象有以下两点不同：

  > - Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
  >
  > - 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地使用commit**提交 mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

### 1.2.1 安装 和 导入

- 安装 vuex 模块

```js
npm i vuex
```




### 1.2.2 导入 vuex 和 vue

```js
/* 
    src 目录下新建一个 store 文件夹，里面新建 index.js，在 index.js 中写入以下步骤因为要用到 vue 所以要导入 vue 
*/
import Vue from "vue";
import Vuex from "vuex"; 

Vue.use(Vuex);  // 作为插件使用

// 定义容器，并且把实例暴露出去
const store = new Vuex.Store({

});
export default store;
```



### 1.2.3 在 main.js 的 vue 中注入根实例

- 在 `main.js` 中导入 store 里面的 index.js，再在 Vue 中注入。通过在根实例中注册 `store` 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到。

```js
import store from './store'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```



- 下面我们做一个小案例（简易计算器加减）来熟悉Vuex的基本使用。点击对应按钮可以使中间按钮数字变换。

### 1.2.4 提交mutation

- vuex代码：

  ```js
  /* 
      src 目录下新建一个 store 文件夹，里面新建 index.js，在 index.js 中写入以下步骤因为要用到 vue 所以要导入 vue 
  */
  import Vue from "vue";
  import Vuex from "vuex";
  
  Vue.use(Vuex);  // 作为插件使用
  
  // 定义容器，并且把实例暴露出去
  const store = new Vuex.Store({
      state: {
          count: 100
      },
      mutations: {
          // 第一个参数为state, 可以通过 state 访问到状态里面的数据
          // 第二个参数为组件的 commit 中传过来的参数
          addIncrement (state, obj) {
              state.count += obj.n;
          },
          reduceIncrement (state, obj) {
              state.count -= obj.n;
          }
      }
  });
  export default store;
  ```

- 组件中

  ```html
  <template>
    <div>
      <button @click="reduce">-</button>
      <button>{{num}}</button>
      <button @click="add">+</button>
    </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        num: this.$store.state.count // 通过 this.$store.state 获取到 vuex 中的 state
      }
    },
    methods: {
      add () {
        // 提交 mutation，所谓的提交mutation就是使用 $store 下面的 commit 方法提交 vuex 中 mutation 属性下面的方法，从而去改变 state 的状态。
        // 第一个参数是 mutation 下面的方法名
        // 第二个参数是 给 mutation 传的参数
        this.$store.commit({
          type: 'addIncrement',
          n: 5
        })
        this.num = this.$store.state.count;
        console.log('this.$store.state.count', this.$store.state.count);
  
      },
      reduce () {
        this.$store.commit('reduceIncrement',{n: 5}) // 也可以通过这种方式 commite
        this.num = this.$store.state.count;
        console.log('this.$store.state.count', this.$store.state.count);
      }
    }
  }
  </script>
  ```

- 总结：

  - vuex 状态存储是响应式的，唯一途径显式的提交 `mutations`，实现步骤：

    > - 在 `computed` 计算属性中获取到 `Vuex` 中的 `count` 值（this.$store.state）
    > - 在 `methods` 中定义 `add` 和 `reduce` 两函数
    > - 将 Vuex 中 `mutations` 中定义的方法传过来，通过 `commit` 改变状态提交`mutation`，如果要传参，第二个参数传一个对象，在此对象中定义参数。
    > - 如果要传参，还可以直接在 `commit` 里面传一个对象，`type` 属性表示 `mutaions` 中定义的函数。

  - **store 中**

    > 1. `state` 里面定义不同的状态（也就是需要改变的内容）
    > 2. `mutations` 里面定义状态函数，第一个参数为`state`, 可以通过 `state` 访问到状态里面的数据，第二个参数为组件的 `commit` 中传过来的参数

### 1.2.5 Vue组件中获得 Vuex 状态

- 在上面一个章节我们可以看到，使用 methods 里面定义函数再去触发改变state值得时候，需要手动的给 num 赋值，才能达到响应式的效果。其实，由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在[计算属性](https://cn.vuejs.org/guide/computed.html)中返回某个状态，那么我们可以将以上的例子修改为：

  ```vue
  <template>
    <div>
      <button @click="add">加</button>
      <button>{{count}}</button>
      <button @click="reduce">减</button>
    </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        
      }
    },
    methods: {
      add () {
        this.$store.commit({
          type: 'addIncrement',
          n: 5
        })
      },
      reduce () {
        this.$store.commit('reduceIncrement',{n: 5})
      }
    },
    computed: {
      count (){
        return this.$store.state.count;
      }
    }
  }
  </script>
  ```

- 这样子，每当 `store.state.count` 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。

## 1.3 Getter

### 1.3.1 基本

- 有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：

  ```js
  computed: {
    doneTodosCount () {
      return this.$store.state.todos.filter(todo => todo.done).length
    }
  }
  ```

- 如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。

- Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

- Getter 接受 state 作为其第一个参数：

  ```js
  const store = new Vuex.Store({
    state: {
      todos: [
        { id: 1, text: '...', done: true },
        { id: 2, text: '...', done: false }
      ]
    },
    getters: {
      doneTodos: state => {
        return state.todos.filter(todo => todo.done) // 返回 done 为真的项
      }
    }
  })
  ```

- Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：

  ```js
  computed: {
    gett(){
      return this.$store.getters.doneTodos
    }
  }
  ```

- Getter 也可以接受其他 getter 作为第二个参数：

  ```js
  getters: {
    // ...
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  }
  ```

- 你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

  ```js
  getters: {
    // ...
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  }
  store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
  ```

  

- 注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。



### 1.3.2 实例

- 现在我们有两个数字按钮，都可以进行加减，但是，对第二个按钮有限制条件，不能大于120。

```html
<div>
  <button  @click="reduce">-</button>
  <button >{{num}}</button>
  <button>{{num2}}</button>
  <button  @click="add">+</button>
</div>
```

- 这时候我们就需要用到 `getters`,在 store 里面给  `getters` 属性， 里面定义一个函数 `gettersCount`，参数为 `state`，然后书写限制条件。返回一个值。

```js
getters: {
  gettersCount (state) {
    return state.count < 120 ? 120 : state.count
  }
}
```

- 那么，在组件里面怎么去使用 `getters` 计算状态的 count 值呢。

```js
computed: {
  num () {
    return this.$store.state.count
  },
  num2 () {
    return this.$store.getters.gettersCount
  }
}
```

- 以上代码，同样的，getters 计算状态的值使用 `this.$store.getters` 获取到 `getters` 里面的值，那此时的值就有限制条件了。然后再渲染到 button 标签里面去。

## 1.4 Mutation

- 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

- 你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 `increment` 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 **store.commit** 方法：

```js
store.commit('increment')
```

### 1.4.1 提交载荷（Payload）

- 你可以向 `store.commit` 传入额外的参数，即 mutation 的 **载荷（payload）**：

  ```js
  store.commit('increment', 10)
  ```

- 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：

  ```js
  store.commit('increment', {
    amount: 10
  })
  ```

  ```js
  // ...
  mutations: {
    increment (state, payload) {
      state.count += payload.amount
    }
  }
  ```

  

### 1.4.2 对象风格的提交方式

- 提交 mutation 的另一种方式是直接使用包含 `type` 属性的对象：

  ```js
  store.commit({
    type: 'increment',
    amount: 10
  })
  ```

  

- 当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：

  ```js
  mutations: {
    increment (state, payload) {
      state.count += payload.amount
    }
  }
  ```

  

### 1.4.3 Mutation 需遵守 Vue 的响应规则

- 既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：
  
> - 最好提前在你的 store 中初始化好所有所需属性。
  > - 当需要在对象上添加新属性时，你应该使用 `Vue.set(obj, 'newProp', 123)`, 或以新对象替换老对象。

- 例如，利用 stage-3 的[对象展开运算符](https://github.com/sebmarkbage/ecmascript-rest-spread)我们可以这样写：
  
  
  ```js
  state.obj = { ...state.obj, newProp: 123 }
  ```

### 1.4.4 使用常量替代 Mutation 事件类型

- 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

- 用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。但如果你不喜欢，你完全可以不这样做。



## 1.5 Action 异步操作

- Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

### 1.5.1 基本

- 让我们来注册一个简单的 action：

  ```js
  const store = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increment (state) {
        state.count++
      }
    },
    actions: {
      increment (context) {
        context.commit('increment')
      }
    }
  })
  ```

  

- Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。当我们在之后介绍到 [Modules](https://vuex.vuejs.org/zh/guide/modules.html) 时，你就知道 context 对象为什么不是 store 实例本身了。

- 实践中，我们会经常用到 ES2015 的 [参数解构](https://github.com/lukehoban/es6features#destructuring) 来简化代码（特别是我们需要调用 `commit` 很多次的时候）：

  ```js
  actions: {
    increment ({ commit }) {
      commit('increment')
    }
  }
  ```

  

- 我们将以上实例加减实现一个间隔一秒才执行

  ```js
  const store = new Vuex.Store({
      state: {
          count: 100
      },
      mutations: {
          addIncrement (state, obj) {
              state.count++;
          },
          reduceIncrement (state, obj) {
              state.count--;
          }
      },
      actions: {
          addIncrement ({commit}) {
              setTimeout(() => {
                  commit('addIncrement');
              }, 2000)
          },
          reduceIncrement ({commit}) {
              setTimeout(() => {
                  commit('reduceIncrement');
              }, 2000)
          }
      }
  
  });
  ```

  

- Action 通过 `store.dispatch` 方法触发：

  ```vue
  <template>
    <div>
      <button @click="add">加</button>
      <button>{{count}}</button>
      <button @click="reduce">减</button>
    </div>
  </template>
  
  <script>
    import { mapState } from 'vuex'
    export default {
      methods: {
        add () {
          this.$store.dispatch('addIncrement');
        },
        reduce () {
          this.$store.dispatch('reduceIncrement');
        }
      },
      computed: {
        ...mapState(['count'])
      }
    }
  </script>
  ```

  

- 以上代码，乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 **mutation 必须同步执行**这个限制么？Action 就不受约束！我们可以在 action 内部执行**异步**操作。Action支持同样的载荷方式和对象方式进行分发：

  ```js
  // 以载荷形式分发
  store.dispatch('addIncrement', {
    amount: 10
  })
  
  // 以对象形式分发
  store.dispatch({
    type: 'reduceIncrement',
    amount: 10
  })
  ```

  

- 如果想要多个异步执行，第一个异步语句执行完毕再执行第二个。那么：

  ```js
  actions: {
    /* 1s以后才执行 */
    addAction ({commit,dispatch}) {
      setTimeout(() => {
        commit("addIncrement", {n: 5});
        dispatch("textAction",{test: '测试'})
      }, 1000);
    },
    textAction (context,obj) {
      console.log(obj.test);
    }
  }
  ```

  

### 1.5.2 组合 Action

- Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

- 首先，你需要明白 `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：

  ```js
  actions: {
    actionA ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('someMutation') // 一秒钟以后提交 mutation 的 'someMutation' 函数
          resolve()
        }, 1000)
      })
    }
  }
  ```

- 以上代码，说明，我们可以在异步完成，拿到数据以后再使用commit提交mutation，以下是调取接口的例子：

  ```js
  actions: {
    actionA ({ commit }) {
      getList().then(res=>{
          commit('serverList', res)
      })
    }
  }
  mutations: {　　　　　
      serverList(state, param) {
          state.serverList = param // param为接口返回数据，然后赋值给状态serverList
      }
  }　
  ```

- 在另外一个 action 中也可以：

  ```js
  actions: {
    // ...
    actionB ({ dispatch, commit }) {
      return dispatch('actionA').then(() => {
        commit('someOtherMutation')
      })
    }
  }
  ```

  以上代码为，先执行完 actionA 返回结果以后再执行actionB，也就是将异步变为同步。

- 如果我们利用 [async / await](https://tc39.github.io/ecmascript-asyncawait/)，我们可以如下组合 action：

  ```js
  // 假设 getData() 和 getOtherData() 返回的是 Promise
  
  actions: {
    async actionA ({ commit }) {
      commit('gotData', await getData())
    },
    async actionB ({ dispatch, commit }) {
      await dispatch('actionA') // 等待 actionA 完成
      commit('gotOtherData', await getOtherData())
    }
  }
  ```

  

> - 一个 `store.dispatch` 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。

## 1.6 辅助函数	

- 当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性，让你少按几次键：

- 导入

```js
import {mapState, mapGetters, mapAction, mapMutations} from 'vuex' 
```

### 1.6.1 mapState 

- 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组。

  ```js
  computed: {
    ...mapState(['count']) // 在组件中可以直接使用 count
  }
  ```

- `mapState` 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 `computed` 属性。但是自从有了[对象展开运算符](https://github.com/sebmarkbage/ecmascript-rest-spread)（现处于 ECMAScript 提案 stage-4 阶段），我们可以极大地简化写法：

  ```js
  
  computed: {
    other () {},
    ...mapState({
    	num: 'count' //这里的 count 为 vuex 中的 state 中的 count 在组件中就是用 num
    })
  }
  ```


### 1.6.2 mapGetters          

- 同样的。将 `getters` 里面的值映射到 `computed` 上

```js
computed: {
  ...mapGetters(['gettersCount']),  //这里的 gettersCount 为 vuex 中的 getters 中的函数
}
```



- 如果你想将一个 getter 属性另取一个名字，使用对象形式：

```js
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

### 1.6.3 mapAction

- 将action 上的函数映射到methods上，从而可以执行函数自动dispatch action

  ```js
  actions: {
    addAction(context) {}
  }
  ```

  ```js
  methods: {
    ...mapActions(['addAction'])  //这里的 addAction 为 vuex 中的 actions 中的函数
  }
  ```



### 1.6.4  mapMutation

- 将mutation里的函数映射到methods，执行add,reduce函数即可自行commit提交mutations

  ```js
  methods: {
    ...mapMutations({
      add: 'addIncrement',
      reduce: 'reduceIncrement'
    })
  }
  ```

- 这里要注意的是，如果在mutations里面传有参数，则需要在事件函数里面传参数过去

  ```html
  <div>
    <button @click="add({n:2})">加</button>
    <button>{{num}}</button>
    <button @click="reduce({n:2})">减</button>
  </div>
  ```



## 1.7 Module模块化

#### 1.7.1 基本

- 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
- 为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```



