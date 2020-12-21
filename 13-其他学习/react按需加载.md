在开发react单页面应用时，我们会遇到一个问题，那就是打包后的js文件特别巨大，首屏加载会特别缓慢。这个时候我们应该讲代码进行分割，按需加载，将js 拆分成若干个chunk.js,用到就加载，react-loadable就可以很好地解决这个问题。

#### 安装

```bash
$ npm i react-loadable
```

#### 基本使用

假设现在项目中有个 home页面组件

```
src/pages/home/index.js
import React, { Component } from 'react'
class Home extends Component {
    render(){
        return (
            <div>这个是home页面</div>
        )
    }
}

export default Home
```

在没有使用react-loadable之前，在我们的route.js里面是直接import Home这个组件的

```
router.js
import React, { Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from '@pages/home'

const Routes = () => (
    <BrowserRouter>
        <Route path="/home" component={Home}/>
    </BrowserRouter>
);

export default Routes
```

运行项目后我们可以看chrome的network记录

![img](https:////upload-images.jianshu.io/upload_images/13890429-9a987ca248cfa9dd.png?imageMogr2/auto-orient/strip|imageView2/2/w/985/format/webp)

image



可以看到1.chunk.js是687k

现在我们来添加react-loadable

在home文件下新建一个`loadable.js`文件

```
src/pages/home/loadable.js
import React from 'react';
import Loadable from 'react-loadable';

//通用的过场组件
const loadingComponent =()=>{
    return (
        <div>loading</div>
    ) 
}


export default Loadable({
    loader:import('./index.js'),
    loading:loadingComponent
});
```

然后再router里面调用

```js
import React, { Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from '@pages/home/loadable'

const Routes = () => (
    <BrowserRouter>
        <Route path="/home" component={Home}/>
    </BrowserRouter>
);

export default Routes
```

现在再看看chrome的network记录

![img](https:////upload-images.jianshu.io/upload_images/13890429-cba9972914d8fb3f.png?imageMogr2/auto-orient/strip|imageView2/2/w/998/format/webp)

image

这个时候1.chunk.js是156k，因为只加载首页所需的依赖，所以体积会小很多，而且这个差距会随着项目的增大而变大

看代码，可以知道，工作原理其实就是在页面组件上有包了一成高级组件来代替原来的页面组件

##### 到这里，代码分割其实已经解决了，但是如果项目有100个页面，那laodable.js就需要写100遍，这样就感觉有点冗余了，所以这个我们可以封装一下

首先，我们建一个util

```
src/util/loadable.js
import React from 'react';
import Loadable from 'react-loadable';

//通用的过场组件
const loadingComponent =()=>{
    return (
        <div>loading</div>
    ) 
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader,loading = loadingComponent)=>{
    return Loadable({
        loader,
        loading
    });
}
```

不难看出，我们可以将按需加载的组件和过渡组件通过参数传入最后返回包装后的组件，如此一来，home下面的laodable.js就不需要再建了

router里面调用方式改为如下

```js
import React, { Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import loadable from '../util/loadable'

const Home = loadable(()=>import('@pages/home'))

const Routes = () => (
    <BrowserRouter>
        <Route path="/home" component={Home}/>
    </BrowserRouter>
);

export default Routes
```

封装之后，laodable只需写一次，改变的只是组件的引入方式，这样一来就方便多了，react-loadable是以组件级别来分割代码的，这意味着，我们不仅可以根据路由按需加载，还可以根据组件按需加载，使用方式和路由分割一样，只用修改组件的引入方式即可