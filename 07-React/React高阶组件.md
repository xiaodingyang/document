# React高阶组件

## 1.1 高阶组件介绍

### 1.1.1 高阶函数基本概念

- 函数可以作为参数被传递

```js
setInterval(() => {
    console.log(111);
}, 1000);
```

- 函数可以作为返回值输出

```js
function name(params) {
    return function () {
        return params
    }
}
```



> - 总结：
>   - 高阶组件就是接受一个组件作为参数并返回一个新的组件函数。
>   - 高阶组件就是一个函数，不是组件。

### 1.1.2 编写高阶组件

> - 实现普通组件
> - 将普通组件使用函数包裹

- 高阶组件 Order

```jsx
import React, { Component } from 'react'

function Order (Params) {
    return class O extends Component {
        render () {
            return (
                <div>
                    <h1>我是高阶组件</h1>
                    <Params></Params>
                </div>
            )
        }
    }
}
export default Order;
```

- 可以简写为：

```jsx
import React, { Component } from 'react'

export default (Params) => class order extends Component {
    render () {
        return (
            <div>
                <h1>我是高阶组件</h1>
                <Params></Params>
            </div>
        )
    }
}
```

- 在组件 A 中使用 高阶组件 B

```jsx
import React, { Component } from 'react'
import Order from "./B";
class A extends Component {
    render () {
        return (
            <div>
                <h1>我是传入的组件A</h1>
            </div>
        )
    }
}
export default Order(A);
```

- 最后在 App.js 中使用 A组件

```jsx
import React, { Component } from 'react'
import A from './A';

export default class App extends Component {
    render () {
        return (
            <div>
                <A></A>
            </div>
        )
    }
}
```



### 1.1.3 使用@装饰器

#### 1.1.3.1 安装 babel 插件

- Babel >= 7.x

```shell
npm install --save-dev @babel/plugin-proposal-decorators
```

- Babel@6.x

```shell
npm install --save-dev babel-plugin-transform-decorators-legacy
```



#### 1.1.3.2 修改package.json文件的babel配置项

- Babel >= 7.x

```json
  "babel": {
    "plugins": [
      ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ],
    "presets": [
      "react-app"
    ]
  }
```

- Babel@6.x

```json
"babel": {
    "plugins": [
      "transform-decorators-legacy"
    ],
    "presets": [
      "react-app"
    ]
  }
```



#### 1.1.3.3 在项目中使用装饰器@

```jsx
import React, { Component } from 'react'
import Order from "./B";
@Order
class A extends Component {
    render () {
        return (
            <div>
                <h1>我是传入的组件A</h1>
            </div>
        )
    }
}
export default A;
```



## 1.2 高阶组件应用

### 1.2.1 代理方式的高阶组件

- 返回的新组件类直接继承自 `React.Component` 类，新组件扮演的角色传入参数组件的一个代理，在新组件的 `render` 函数中，将被包裹组件渲染出来，除了高阶组件自己要做的工作，其余功能全都转手给了被包裹的组件。

#### 1.2.1.1 操纵 prop

- App.js 文件中加载 A组件，同时传 props

```jsx
import React, { Component } from 'react'
import A from './A';

export default class App extends Component {
    render () {
        return (
            <div>
                <A name="肖定阳" sex="男"></A>
            </div>
        )
    }
}
```

- Order 高阶组件传递来自App 中的 props，使用 `...` 扩展符扩展，并新增 age 属性

```jsx
import React, { Component } from 'react'

export default (Params) => class order extends Component {
    render () {
        return (
            <div>
                <h1>我是高阶组件</h1>
                <Params age="18" {...this.props}></Params>
            </div>
        )
    }
}
```

- 在组件 A 中使用 props

```jsx
import React, { Component } from 'react'
import Order from "./order";
@Order
class A extends Component {
    render () {
        return (
            <div>
                <h1>我是传入的组件A</h1>
                <h2>姓名：{this.props.name}</h2>
                <h2>性别：{this.props.sex}</h2>
                <h2>年龄：{this.props.age}</h2>
            </div>
        )
    }
}
export default A;
```

- 如果想要在高阶组件中过滤掉某些 props 属性，那么：

```jsx
import React, { Component } from 'react'

export default (Params) => class order extends Component {
    render () {
        const { sex, ...otherProps } = this.props;
        return (
            <div>
                <h1>我是高阶组件</h1>
                <Params age="18" {...otherProps}></Params>
            </div>
        )
    }
}
```

- 以上代码，过滤掉了 `age` props 属性。



#### 1.2.1.2 访问 ref

- 在组件 A 中

```jsx
import React, { Component } from 'react'
import Order from "./order";
@Order
class A extends Component {
    getName () {
        console.log('肖定阳');
    }
    render () {
        return (
            <div> </div>
        )
    }
}
export default A;
```

- 高阶组件中

```jsx
import React, { Component } from 'react'

export default (Params) => class order extends Component {
    getData = (instance) => {
        instance.getName(); // instanc 是ref组件的实例对象，可以通过这个对象拿到 ref组件中的属性和方法
    }
    render () {
        return (
            <div>
                <h1>我是高阶组件</h1>
                <Params ref={this.getData}></Params>
            </div>
        )
    }
}

```



#### 1.2.1.3 抽取状态

- 将 input 绑定state 中的 value，当输入框值改变时触发 `onChange` 事件时，会执行 `changeInput` 事件，从而使用 `setState` 改变state中的值实现双向绑定：

```jsx
import React, { Component } from 'react'
import Order from "./order";
@Order
class A extends Component {
    constructor(...arg) {
        super(...arg);
        this.state = {
            value: '默认值'
        }
    }
    changeInput = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    render () {
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.changeInput} />
                <h2>{this.state.value}</h2>
            </div>
            
        )
    }
}
export default A;
```

- 以上代码，只是在A组件中能够实现此功能，那如果我们期望在高阶组件下的组件都能有此功能，那么我们就可以将这个功能提取出来。
- **高阶组件**：

```jsx
import React, { Component } from 'react'

export default (Params) => class order extends Component {
    constructor(...arg) {
        super(...arg);
        this.state = {
            value: '默认值'
        }
    }
    changeInput = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    render () {
        const newProps = {
            value: this.state.value,
            onChange: this.changeInput
        } 
        return (
            <div>
                <h1>我是高阶组件</h1>
                <Params {...newProps}></Params>
            </div>
        )
    }
}
```

- **A组件**：

```jsx
import React, { Component } from 'react'
import Order from "./order";
@Order
class A extends Component {
    render () {
        return (
            <div>
                <input type="text" {...this.props} />
                <h2>{this.props.value}</h2>
            </div>
            
        )
    }
}
export default A;
```

- 以上代码，在高阶组件中以 key，value的形式定义好props，再扩展到组件上，在 A 组件上就可以直接扩展使用了。



### 1.2.2 继承方式的高阶组件

- 采用继承关联作为参数的组件和返回的组件，假如传入的组件参数是 AComponent，那么返回的组件就直接继承自 AComponent



#### 1.2.2.1 操纵 props

- **继承高阶组件**

```jsx
import React, { Component } from 'react'

export default (Params) => class order extends Params {

    render () {
        const element = super.render() // 继承过来的元素
        const newStyle = {
            color: element.type === 'div' ? 'red' : 'green' // 如果是被 div包裹的组件者字体为红色
        } 
        const newProps = { ...this.props, style: newStyle }
        return React.cloneElement(element, newProps,element.props.children)
    }
}
```

- **组件A**

```jsx
import React, { Component } from 'react'
import Order from "./order";
@Order
class A extends Component {
    render () {
        return (
            <div>
                <div>我是div</div>
            </div>
        )
    }
}
export default A;
```



#### 1.2.2.2 操纵声明周期函数

- **A 组件**

```jsx
import React, { Component } from 'react'
import Order from "./order";
@Order
class A extends Component {
    componentDidMount () {
        console.log('修改前的生命周期');
    }
    render () {
        return (
            <div>
                <div>我是div</div>
            </div>
            
        )
    }
}
export default A;
```

- **继承高阶组件**

```jsx
import React, { Component } from 'react'

export default (Params) => class order extends Params {
    componentDidMount () {
        console.log('修改后的生命周期');
    }
    render () {
        const element = super.render() // 继承过来的元素
        const newStyle = {
            color: element.type === 'div' ? 'red' : 'green' // 如果是被 div包裹的组件者字体为红色
        } 
        const newProps = { ...this.props, style: newStyle }
        return React.cloneElement(element, newProps,element.props.children)
    }
}
```



### 1.2.3 高阶组件显示名

- 在我们使用 React 工具进行调试的时候，可能需要知道组件的名字，但是使用高阶组件包裹以后的组件名都是高阶组件的名字，那么这个时候我们可以使用高阶组件命名。

```jsx
import React, { Component } from 'react'

export default (Params) => class Order extends Params {
    static displayName = Params.name // Params.name 表示穿过来的组件的组件名，displayName 为设置高阶组件展示的名字
    render () {
        const element = super.render() // 继承过来的元素
        const newStyle = {
            color: element.type === 'div' ? 'red' : 'green' // 如果是被 div包裹的组件者字体为红色
        } 
        const newProps = { ...this.props, style: newStyle }
        return React.cloneElement(element, newProps,element.props.children)
    }
}
```

