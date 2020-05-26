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
  - **state**：驱动应用的数据源；
  - **view**：以声明方式将 **state** 映射到视图；
  - **actions**：响应在 **view** 上的用户输入导致的状态变化。

- 以下是一个表示“单向数据流”理念的极简示意：

![](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/image-20200429100041128.png)

- 但是，当我们的应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏：
  > 多个视图依赖于同一状态。同时，来自不同视图的行为需要变更同一状态。

- 以上是什么情况下使用vuex。

- 对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。

- 对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

- 因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

- 另外，通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，我们的代码将会变得更结构化且易维护。

- 这就是 Vuex 背后的基本思想，借鉴了 [Flux](https://facebook.github.io/flux/docs/overview.html)、[Redux](http://redux.js.org/) 和 [The Elm Architecture](https://guide.elm-lang.org/architecture/)。与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。

- ![](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/Snipaste_2020-04-29_10-07-36.png)


### 1.1.2 核心概念

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

## 1.2 State 和 Mutation

- 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。Vuex 和单纯的全局对象有以下两点不同：

  > - Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
  >
  > - 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地使用commit**提交 mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

### 1.2.1 定义和注入

- 安装 vuex 模块

```js
npm i vuex
```

- 导入 vuex 和 vue，src 目录下新建一个 store 文件夹，里面新建 index.js

```js
import Vue from "vue";
import Vuex from "vuex"; 

Vue.use(Vuex);  // 作为插件使用

// 定义容器，并且把实例暴露出去
const store = new Vuex.Store({

});
export default store;
```

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

### 1.2.2 State 和 Mutation

#### 1. 示例

下面我们做一个小案例（简易计算器加减）来熟悉Vuex的基本使用。点击对应按钮可以使中间按钮数字变换。

```js
/*  src 目录下新建一个 store 文件夹，里面新建 index.js */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);  // 作为插件使用

// 定义容器，并且把实例暴露出去
const store = new Vuex.Store({
    state: {
        count: 100
    },
    mutations: {
        // 第一个参数为state, 可以通过 state 访问到状态里面的数据，第二个参数为组件的 commit 中传过来的参数
        addIncrement (state, payload) {
            state.count += payload.n;
        },
        reduceIncrement (state, payload) {
            state.count -= payload.n;
        }
    }
});
export default store;
```

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
      // 第一个参数是 mutation 下面的方法名，第二个参数是 给 mutation 传的参数
      this.$store.commit({ type: 'addIncrement', n: 5 })
      this.num = this.$store.state.count;
    },
    reduce () {
      this.$store.commit('reduceIncrement',{n: 5}) // 也可以通过这种方式 commite
      this.num = this.$store.state.count;
    }
  }
}
</script>
```

#### 2. Vue组件中获得 Vuex 状态

- 在上面一个章节我们可以看到，使用 methods 里面定义函数再去触发改变state值得时候，需要手动的给 num 赋值，才能达到响应式的效果。其实，由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在[计算属性](https://cn.vuejs.org/guide/computed.html)中返回某个状态，那么我们可以将以上的例子修改为：

```js
export default {
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
    // 直接在 computed 中拿到count，从而可以响应式
    computed: {
        count (){
            return this.$store.state.count;
        }
    }
}
```

这样子，每当 `store.state.count` 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。

#### 3. mapState辅助函数

当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性，让你少按几次键：

```js
computed: {
  ...mapState(['count']) // 在组件中可以直接使用 count
}
```

`mapState` 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 `computed` 属性。但是自从有了[对象展开运算符](https://github.com/sebmarkbage/ecmascript-rest-spread)（现处于 ECMAScript 提案 stage-4 阶段），我们可以极大地简化写法：

```js
computed: {
  ...mapState({
  	num: 'count' //这里的 count 为 vuex 中的 state 中的 count 在组件中就是用 num
  })
}
```

#### 4.  mapMutations 辅助函数

将mutation里的函数映射到methods，执行add,reduce函数即可自行commit提交mutations

```js
methods: {
  ...mapMutations({
    add: 'addIncrement',
    reduce: 'reduceIncrement'
  })
}
```

这里要注意的是，如果在mutations里面传有参数，则需要在事件函数里面传参数过去

```html
<div>
  <button @click="add({n:2})">加</button>
  <button>{{num}}</button>
  <button @click="reduce({n:2})">减</button>
</div>
```

如此，我们又可以将之前的代码优化为：

```js
important {mapMutations, mapState} from 'vuex'
export default {
    methods: {
        ...mapMutations({
            add: 'addIncrement',
            reduce: 'reduceIncrement'
        })
    },
    // 直接在 computed 中拿到count，从而可以响应式
    computed: {
        ...mapState['count']
    }
}
```



总结：vuex 状态存储是响应式的，唯一途径显式的提交 `mutations`，

**组件中**：

> - 在 `computed` 计算属性中获取到 `Vuex` 中的 `count` 值（this.$store.state）
> - 在 `methods` 中定义 `add` 和 `reduce` 两函数
> - 通过 `this.$store.commit` 提交`mutation`，如果要传参，第二个参数传一个对象，在此对象中定义参数。 还可以直接在 `commit` 里面传一个对象，`type` 属性表示 `mutaions` 中定义的函数。

**store 中**：

> - `state` 里面定义不同的状态（也就是需要改变的内容）
>
> - `mutations` 里面定义状态函数，第一个参数为`state`, 可以通过 `state` 访问到状态里面的数据，第二个参数为组件的 `commit` 中传过来的参数



### 1.2.3 使用常量

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

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

以上代码可以改写为：

```js
const ADDINCREMENT = 'ADDINCREMENT'
const REDUCEINCREMENT = 'REDUCEINCREMENT'
const store = new Vuex.Store({
    state: {
        count: 100
    },
    mutations: {
        [ADDINCREMENT] (state, obj) {
            state.count += obj.n;
        },
        [REDUCEINCREMENT] (state, obj) {
            state.count -= obj.n;
        }
    }
});
export default store;
```

```js
important {mapMutations, mapState} from 'vuex'
export default {
    methods: {
        ...mapMutations({
            add: 'ADDINCREMENT',
            reduce: 'REDUCEINCREMENT'
        })
    },
    // 直接在 computed 中拿到count，从而可以响应式
    computed: {
        ...mapState['count']
    }
}
```



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

#### 1. 通过属性访问

- Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：

  ```js
  store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
  ```

- 我们们可以很容易地在任何组件中使用它：

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

#### 2. 通过方法访问

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

### 1.3.2 mapGetters          

- 同样的。将 `getters` 里面的值映射到 `computed` 上

```js
computed: {
  ...mapGetters(['gettersCount']),  // 这里的 gettersCount 为 vuex 中的 getters 中的函数
}
```

- 如果你想将一个 getter 属性另取一个名字，使用对象形式：

```js
mapGetters({
  // 把 this.doneCount 映射为 this.$store.getters.doneTodosCount
  doneCount: 'doneTodosCount'
})
```



### 1.3.3 实例

- 现在我们有两个数字按钮，都可以进行加减，但是，对第二个按钮有限制条件，不能大于120。

```html
<div>
  <button  @click="reduce">-</button>
  <button >{{count}}</button>
  <button>{{gettersCount}}</button>
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
    ...mapGetters(['gettersCount']),
    ...mapState(['count'])
}
```

- 以上代码，同样的，getters 计算状态的值使用 `this.$store.getters` 获取到 `getters` 里面的值，那此时的值就有限制条件了。然后再渲染到 button 标签里面去。



## 1.5 Action 异步操作

- Action 类似于 mutation，不同在于：Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。


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

  

- 我们将以上实例加减实现一个间隔两秒才执行

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

  

- 在组件中，Action 通过 `store.dispatch` 方法触发：

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
      // 此处返回了promise，在dispatch时可以通过then拿到结果
    	return getList().then(res=>{
          commit('serverList', res) // acitonA中提交mutations
      })
    }
  }
  mutations: {　　　　　
      serverList(state, param) {
          state.serverList = param // param为接口返回数据，然后赋值给状态serverList
      }
  }　
  ```

  ```js
  // 组件中dispatch actionA
  created(){
      this.$store.dispatch('actionA')
      // 如果actionA返回了promise，此处可以直接通过then拿到结果
      this.$store.dispatch('actionA').then(res=>console.log(res))
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

### 1.5.3  mapAction

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



## 1.7 Module模块化

### 1.7.1 项目结构

Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：

> 1. 应用层级的状态应该集中到单个 store 对象中。
> 2. 提交 **mutation** 是更改状态的唯一方法，并且这个过程是同步的。
> 3. 异步逻辑都应该封装到 **action** 里面。

只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。

对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：

![](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/image-20200520151245849.png)

### 1.7.2 模块化

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



### 1.7.3 插件

Vuex 的 store 接受 `plugins` 选项，这个选项暴露出每次 mutation 的钩子。Vuex 插件就是一个函数，它接收 store 作为唯一参数：

```js
const myPlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
  })
}
```

然后像这样使用：

```js
const store = new Vuex.Store({
  // ...
  plugins: [myPlugin]
})
```

#### 1. 在插件内提交 Mutation

在插件中不允许直接修改状态——类似于组件，只能通过提交 mutation 来触发变化。通过提交 mutation，插件可以用来同步数据源到 store。例如，同步 websocket 数据源到 store（下面是个大概例子，实际上 `createPlugin` 方法可以有更多选项来完成复杂任务）：

```js
export default function createWebSocketPlugin (socket) {
  return store => {
    socket.on('data', data => {
      store.commit('receiveData', data)
    })
    store.subscribe(mutation => {
      if (mutation.type === 'UPDATE_DATA') {
        socket.emit('update', mutation.payload)
      }
    })
  }
}
const plugin = createWebSocketPlugin(socket)

const store = new Vuex.Store({
  state,
  mutations,
  plugins: [plugin]
})
```

#### 2. 生成 State 快照

有时候插件需要获得状态的“快照”，比较改变的前后状态。想要实现这项功能，你需要对状态对象进行深拷贝：

```js
const myPluginWithSnapshot = store => {
  let prevState = _.cloneDeep(store.state)
  store.subscribe((mutation, state) => {
    let nextState = _.cloneDeep(state)

    // 比较 prevState 和 nextState...

    // 保存状态，用于下一次 mutation
    prevState = nextState
  })
}
```

**生成状态快照的插件应该只在开发阶段使用**，使用 webpack 或 Browserify，让构建工具帮我们处理：

```js
const store = new Vuex.Store({
  // ...
  plugins: process.env.NODE_ENV !== 'production'
    ? [myPluginWithSnapshot]
    : []
})
```

上面插件会默认启用。在发布阶段，你需要使用 webpack 的 [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) 或者是 Browserify 的 [envify](https://github.com/hughsk/envify) 使 `process.env.NODE_ENV !== 'production'` 为 `false`。

#### 3. 内置 Logger 插件

> 如果正在使用 [vue-devtools](https://github.com/vuejs/vue-devtools)，你可能不需要此插件。

Vuex 自带一个日志插件用于一般的调试:

```js
import createLogger from 'vuex/dist/logger'

const store = new Vuex.Store({
  plugins: [createLogger()]
})
```

`createLogger` 函数有几个配置项：

```js
const logger = createLogger({
  collapsed: false, // 自动展开记录的 mutation
  filter (mutation, stateBefore, stateAfter) {
    // 若 mutation 需要被记录，就让它返回 true 即可
    // 顺便，`mutation` 是个 { type, payload } 对象
    return mutation.type !== "aBlacklistedMutation"
  },
  transformer (state) {
    // 在开始记录之前转换状态
    // 例如，只返回指定的子树
    return state.subTree
  },
  mutationTransformer (mutation) {
    // mutation 按照 { type, payload } 格式记录
    // 我们可以按任意方式格式化
    return mutation.type
  },
  logger: console, // 自定义 console 实现，默认为 `console`
})
```

日志插件还可以直接通过 `script` 标签引入，它会提供全局方法 `createVuexLogger`。要注意，logger 插件会生成状态快照，所以仅在开发环境使用。















