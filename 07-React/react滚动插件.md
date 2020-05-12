# react-custom-scrollbars (滚动条美化)

安装：

```
npm i react-custom-scrollbars
```

导入：

```js
import { Scrollbars } from 'react-custom-scrollbars';
```

使用：

```react
<Scrollbars style={{width: '100px', height: '100px'}}>content</Scrollbars>
```

如果想让整个浏览器使用此插件，先给 body 设置 `overflow: hidden`，再给 app 设置此插件。

```react
<Scrollbars style={{ minWidth: '100vw', minHeight: '100vh' }}>
    <div className="App"></div>
</Scrollbars>
```

是不是很简单呢？