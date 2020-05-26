# 一、入门

## 1.1 初始化项目

新建一个目录，初始化npm

```
npm init
```

webpack是运行在node环境中的,我们需要安装以下两个npm包

```js
npm i -D webpack webpack-cli
// npm i -D 为npm install --save-dev的缩写
// npm i -S 为npm install --save的缩写
```

如果下载不了，安装淘宝镜像：

```
npm install -g cnpm --registry=http://registry.npm.taobao.org
```

如果出现（cnpm : 无法加载文件 C:\Users\hp\AppData\Roaming\npm\cnpm.ps1，因为在此系统上禁止运行脚本。），以管理员身份运行power shell：

```
set-ExecutionPolicy RemoteSigned
```

然后根据提示输入 A 回车，就可以使用cnpm了，然后：

```
cnpm i -D webpack webpack-cli
```

就可以下载成功了。

新建一个文件夹`src` ,然后新建一个文件`main.js`,写一点代码测试一下

```js
console.log('测试一下...')
```

配置package.json命令：

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack src/main.js"
}
```

执行：

```
npm run build
```

此时如果生成了一个dist文件夹，并且内部含有main.js说明已经打包成功了。



## 1.2 配置

上面一个简单的例子只是webpack自己默认的配置，下面我们要实现更加丰富的自定义配置

- 新建一个`build`文件夹,里面新建一个`webpack.config.js`

  ```js
  // webpack.config.js
  
  const path = require('path');
  module.exports = {
      mode:'development', // 开发模式
      entry: path.resolve(__dirname,'../src/main.js'),    // 入口文件
      output: {
          filename: 'output.js',      // 打包后的文件名称
          path: path.resolve(__dirname,'../dist')  // 打包后的目录
      }
  }
  ```

- 更改我们的打包命令

  ```json
  "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "webpack --config build/webpack.config.js"
  }
  ```

- 执行 `npm run build` 会发现dist目录生成了了output.js文件其中`output.js`就是我们需要在浏览器中实际运行的文件。当然实际运用中不会仅仅如此,下面让我们通过实际案例带你快速入手webpack。



## 1.3 配置HTML模板

js文件打包好了，但是我们不可能每次在`html`文件中手动引入打包好的js。

这里可能有的朋友会认为我们打包js文件名称不是一直是固定的嘛(output.js)？这样每次就不用改动引入文件名称了呀？实际上我们日常开发中往往会这样配置:

```js
module.exports = {
    // 省略其他配置
    output: {
      filename: '[name].[hash:8].js',      // 打包后的文件名称
      path: path.resolve(__dirname,'../dist')  // 打包后的目录
    }
}
复制代码
```

这时候生成的`dist`目录文件如下

![p3.png](https://user-gold-cdn.xitu.io/2019/12/11/16ef2e08b877e7f5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

为了缓存（浏览器缓存策略），你会发现打包好的js文件的名称每次都不一样。



### 1.3.1 html-webpack-plugin

webpack打包出来的js文件我们需要引入到html中，但是每次我们都手动修改js文件名显得很麻烦，因此我们需要一个插件来帮我们完成这件事情。

```
npm i -D html-webpack-plugin
```

新建一个`build`同级的文件夹`public`,里面新建一个index.html。

同时，`webpack.config.js`里面做如下添加：

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development', // 开发模式
    entry: path.resolve(__dirname, '../src/main.js'), // 入口文件
    output: {
        filename: '[name].[hash:8].js', // 打包后的文件名称(为了缓存，每次打包好的文件名字不一样)
        path: path.resolve(__dirname, '../dist') // 打包后的目录
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html') // 在public下的index.html引入打包好的js
        })
    ]
}
```

再使用命令打包，在dist文件中会出现index.html，可以发现打包生成的js文件已经被自动引入html文件中



```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

<script src="main.de1ae303.js"></script></body>

</html>
```



### 1.3.2 多入口文件如何开发

生成多个html-webpack-plugin实例来解决这个问题

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode:'development', // 开发模式
    entry: {
      main:path.resolve(__dirname,'../src/main.js'),
      header:path.resolve(__dirname,'../src/header.js')
  }, 
    output: {
      filename: '[name].[hash:8].js',      // 打包后的文件名称
      path: path.resolve(__dirname,'../dist')  // 打包后的目录
    },
    plugins:[
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'../public/index.html'),
        filename:'index.html',
        chunks:['main'] // 与入口文件对应的模块名
      }),
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'../public/header.html'),
        filename:'header.html',
        chunks:['header'] // 与入口文件对应的模块名
      }),
    ]
}
```

打包后，文件目录如下：

![p5.png](https://user-gold-cdn.xitu.io/2019/12/11/16ef2e1ff51375aa?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### 1.3.3 clean-webpack-plugin

每次执行`npm run build` 会发现dist文件夹里会残留上次打包的文件，这里我们推荐一个plugin来帮我们在打包输出前清空文件夹`clean-webpack-plugin`

```js
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
    // ...省略其他配置
    plugins:[
        // ...省略其他插件
        new CleanWebpackPlugin()
    ]
}
```



## 1.4 引用 CSS

### 1.4.1 loader

我们的入口文件是`main.js`，所以我们需要在入口中引入我们的css文件。

![p6.png](https://user-gold-cdn.xitu.io/2019/12/11/16ef2e43d850e765?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

所以，我们也需要一些loader来解析我们的css文件

```
npm i -D style-loader css-loader
```

如果我们使用less来构建样式，则需要多安装两个

```
npm i -D less less-loader
```

配置文件如下：

```js
// webpack.config.js
module.exports = {
    // ...省略其他配置
    module:{
      rules:[
        {
          test:/\.css$/,
          use:['style-loader','css-loader'] // 从右向左解析原则
        },
        {
          test:/\.less$/,
          use:['style-loader','css-loader','less-loader'] // 从右向左解析原则
        }
      ]
    }
}
```

浏览器打开`html`如下，这时候我们发现css通过style标签的方式添加到了html文件中，但是如果样式文件很多，全部添加到html中，难免显得混乱。这时候我们想用把css拆分出来用外链的形式引入css文件怎么做呢？这时候我们就需要借助插件来帮助我们

![p7.png](https://user-gold-cdn.xitu.io/2019/12/11/16ef2e4dc3ba12b4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 1.4.2 拆分 CSS

webpack 4.0以前，我们通过`extract-text-webpack-plugin`插件，把css样式从js文件中提取到单独的css文件中。webpack4.0以后，官方推荐使用`mini-css-extract-plugin`插件来打包css文件

```
npm i -D mini-css-extract-plugin
```

配置文件如下

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  //...省略其他配置
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
           MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].css",
    })
  ]
}
```



### 1.4.3 拆分多个 CSS

这里需要说的细一点,上面我们所用到的`mini-css-extract-plugin`会将所有的css样式合并为一个css文件。如果你想拆分为一一对应的多个css文件,我们需要使用到`extract-text-webpack-plugin`，而目前`mini-css-extract-plugin`还不支持此功能。我们需要安装@next版本的`extract-text-webpack-plugin`

```
npm i -D extract-text-webpack-plugin@next
```

webpack.config.js

```js
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let indexLess = new ExtractTextWebpackPlugin('index.less');
let indexCss = new ExtractTextWebpackPlugin('index.css');
module.exports = {
    module:{
      rules:[
        {
          test:/\.css$/,
          use: indexCss.extract({
            use: ['css-loader']
          })
        },
        {
          test:/\.less$/,
          use: indexLess.extract({
            use: ['css-loader','less-loader']
          })
        }
      ]
    },
    plugins:[
      indexLess,
      indexCss
    ]
}
```



### 1.4.4 css添加浏览器前缀

```
npm i -D postcss-loader autoprefixer
```

配置如下

```js
// webpack.config.js
module.exports = {
    module:{
        rules:[
            {
                test:/\.less$/,
                use:['style-loader','css-loader','postcss-loader','less-loader'] // 从右向左解析原则
           }
        ]
    }
} 
```

接下来，我们还需要引入`autoprefixer`使其生效，直接在`webpack.config.js`里配置

```js
{
    test: /\.less$/,
        use: indexLess.extract({
            use: ['style-loader', 'css-loader', {
                loader: 'postcss-loader',
                options: {
                    plugins: [require('autoprefixer')]
                }
            }, 'less-loader']
        }) // 从右向左解析原则
},
```



## 1.5 打包 图片、字体、媒体

`file-loader`就是将文件在进行一些处理后（主要是处理文件名和路径、解析文件url），并将文件移动到输出的目录中
 `url-loader` 一般与`file-loader`搭配使用，功能与 file-loader 类似，如果文件小于限制的大小。则会返回 base64 编码，否则使用 file-loader 将文件移动到输出的目录中

webpack.config.js

```js
module.exports = {
  // 省略其它配置 ...
  module: {
    rules: [
      // ...
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
    ]
  }
}
```



## 1.6 babel转义js文件

为了使我们的js代码兼容更多的环境我们需要安装依赖

```
npm i -D babel-loader @babel/preset-env @babel/core
```

注意 `babel-loader`与`babel-core`的版本对应关系

> 1. `babel-loader` 8.x 对应`babel-core` 7.x
> 2. `babel-loader` 7.x 对应`babel-core` 6.x

配置如下：

```js
// webpack.config.js
module.exports = {
    // 省略其它配置 ...
    module:{
        rules:[
          {
            test:/\.js$/,
            use:{
              loader:'babel-loader',
              options:{
                presets:['@babel/preset-env']
              }
            },
            exclude:/node_modules/
          },
       ]
    }
}
```

上面的`babel-loader`只会将 ES6/7/8语法转换为ES5语法，但是对新api并不会转换 例如(promise、Generator、Set、Maps、Proxy等).。此时我们需要借助babel-polyfill来帮助我们转换。

```
npm i @babel/polyfill
```



```js
// webpack.config.js
const path = require('path')
module.exports = {
    entry: ["@babel/polyfill",path.resolve(__dirname,'../src/index.js')],    // 入口文件
}
```



# 二、搭建 Vue 开发环境

上面的小例子已经帮助而我们实现了打包css、图片、js、html等文件。 但是我们还需要以下几种配置：



## 2.1 解析 .vue 文件

```
npm i -D vue-loader vue-template-compiler vue-style-loader
npm i -S vue
```

`vue-loader` 用于解析`.vue`文件
 `vue-template-compiler` 用于编译模板 

配置如下：

```js
const vueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    module:{
        rules:[{
            test:/\.vue$/,
            use:['vue-loader']
        },]
     },
    resolve:{
        // 别名，方便引入文件
        alias:{
          'vue$':'vue/dist/vue.runtime.esm.js',
          ' @':path.resolve(__dirname,'../src')
        },
        // 以下文件不需要写后缀名就可以导入
        extensions:['*','.js','.json','.vue']
   },
   plugins:[
        new vueLoaderPlugin()
   ]
}
```

同时，在loader中也要加入 `vue-style-loader`

```json
{
    test: /\.css$/,
    use: indexCss.extract({
        use: ['vue-style-loader','style-loader', 'css-loader', {
            loader: 'postcss-loader',
            options: {
                plugins: [require('autoprefixer')]
            }
        }]
    }) // 从右向左解析原则
},
{
    test: /\.less$/,
    use: indexLess.extract({
        use: ['vue-style-loader','style-loader', 'css-loader', {
            loader: 'postcss-loader',
            options: {
                plugins: [require('autoprefixer')]
            }
        }, 'less-loader']
    }) // 从右向左解析原则
},
```



## 2.2 webpack-dev-server 热更新

```
npm i -D webpack-dev-server
```

配置如下

```js
const Webpack = require('webpack')
module.exports = {
  // ...省略其他配置
  devServer:{
    port:3000,
    hot:true,
    contentBase:'../dist'
  },
  plugins:[
    new Webpack.HotModuleReplacementPlugin()
  ]
}
```

```json
// package.json
"scripts": {
    "build": "webpack --config build/webpack.config.js",
    "dev": "webpack-dev-server --config build/webpack.config.js --open"
}
```

执行`npm run dev` 即可运行项目

完整配置如下

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') // index.html自动引入打包好的js文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清除上次打包生成的文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 拆分css
const vueLoaderPlugin = require('vue-loader/lib/plugin') // 解析.vue文件
const Webpack = require('webpack')
const devMode = process.argv.indexOf('--mode=production') === -1; // 是否生产环境
console.log('devMode', process);

module.exports = {
    mode: 'development', // 开发模式
    entry: ["@babel/polyfill", path.resolve(__dirname, '../src/main.js')], // 入口文件(使用@babel/polyfill编译)
    output: {
        filename: '[name].[hash:8].js', // 打包后的文件名称(为了缓存，每次打包好的文件名字不一样)
        path: path.resolve(__dirname, '../dist') // 打包后的目录
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html') // 在public下的index.html引入打包好的js
        }),
        new CleanWebpackPlugin(), // 清除上次打包生成的js文件
        // 压缩css
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),
        new vueLoaderPlugin(),
        new Webpack.HotModuleReplacementPlugin() // 热更新
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../dist/css/",
                        hmr: devMode
                    }
                }, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }],
            },
            {
                test: /\.less$/,
                use: [{
                    loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../dist/css/",
                        hmr: devMode
                    }
                }, 'css-loader', 'less-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }]
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            // 使用 babel编译 js
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            },
            // 解析 .vue 文件
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    resolve: {
        // 别名
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': path.resolve(__dirname, '../src')
        },
        // 以下文件不需要写后缀名就可以导入
        extensions: ['*', '.js', '.json', '.vue']
    },
    devServer: {
        port: 3000,
        hot: true,
        contentBase: '../dist'
    }
}
```



## 2.3 配置打包命令

前面我们配置好了打包和运行命令：

```json
"scripts": {
    "build": "webpack --config build/webpack.config.js",
    "dev": "webpack-dev-server --config build/webpack.config.js --open"
}
```

接下来让我们测试一下，首先在src新建一个main.js：

```js
import Vue from "vue";
import App from "./App";

new Vue({
    render: h => h(App)
}).$mount('#app');
```

新建一个 App.vue

```vue
<template>
  <div id="container">
    <h1>{{initData}}</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      initData: 'Vue 开发环境运行成功！'
    };
  }
};
</script>
```

public中的index.html添加一个id为app的盒子

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="app"></div>
</body>

</html>
```

运行 `npm run dev`，如果浏览器出现**Vue开发环境运行成功！**，那么恭喜你，已经成功迈出了第一步。



## 2.4 开发环境与生产环境

实际应用到项目中，我们需要区分开发环境与生产环境，我们在原来webpack.config.js的基础上再新增两个文件

- `webpack.dev.js`   开发环境配置文件，开发环境主要实现的是热更新,不要压缩代码，完整的sourceMap

- `webpack.prod.js`  生产环境配置文件，生产环境主要实现的是压缩代码、提取css文件、合理的sourceMap、分割代码。需要安装以下模块:

```
cnpm i -D  webpack-merge copy-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
```

> - `webpack-merge` 合并配置
> - `copy-webpack-plugin` 拷贝静态资源
> - `optimize-css-assets-webpack-plugin` 压缩css
> - `uglifyjs-webpack-plugin` 压缩js
> - `webpack mode`设置`production`的时候会自动压缩js代码。原则上不需要引入`uglifyjs-webpack-plugin`进行重复工作。但是`optimize-css-assets-webpack-plugin`压缩css的同时会破坏原有的js压缩，所以这里我们引入`uglifyjs`进行压缩



- webpack.dev.js

```js
const Webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge') // 合并webpack.config.js配置
module.exports = WebpackMerge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 3000,
        hot: true,
        contentBase: '../dist'
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ]
})
```

- webpack.prod.js

```js
const path = require('path')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge') // 合并配置
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝静态资源
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩 js
module.exports = WebpackMerge(webpackConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../public'),
            to: path.resolve(__dirname, '../dist')
        }]),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({//压缩js
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: "chunk-libs",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // 只打包初始时依赖的第三方
                }
            }
        }
    }
})
```



## 2.5 优化 webpack 配置

优化配置对我们来说非常有实际意义，这实际关系到你打包出来文件的大小，打包的速度等。 具体优化可以分为以下几点：

### 2.5.1 优化打包速度

#### 2.5.1.1 合理的配置mode参数与devtool参数

- `mode`可设置`development， production`两个参数。 如果没有设置，`webpack4` 会将 `mode` 的默认值设置为 `production` 
-  `production`模式下会进行`tree shaking`(去除无用代码)和`uglifyjs`(代码压缩混淆)

#### 2.5.1.2 缩小文件的搜索范围(配置include exclude alias noParse extensions)

- `alias`: 当我们代码中出现 `import 'vue'`时， webpack会采用向上递归搜索的方式去`node_modules` 目录下找。为了减少搜索范围我们可以直接告诉webpack去哪个路径下查找。也就是别名(`alias`)的配置。
- `include exclude`： 同样配置`include exclude`也可以减少`webpack loader`的搜索转换时间。
- `noParse `： 当我们代码中使用到`import jq from 'jquery'`时，`webpack`会去解析jq这个库是否有依赖其他的包。但是我们对类似`jquery`这类依赖库，一般会认为不会引用其他的包(特殊除外,自行判断)。增加`noParse`属性,告诉`webpack`不必解析，以此增加打包速度。
- `extensions `：`webpack`会根据`extensions`定义的后缀查找文件(频率较高的文件类型优先写在前面)



#### 2.5.1.3 使用HappyPack开启多进程Loader转换

在webpack构建过程中，实际上耗费时间大多数用在loader解析转换以及代码的压缩中。日常开发中我们需要使用Loader对js，css，图片，字体等文件做转换操作，并且转换的文件数据量也是非常大。由于js单线程的特性使得这些转换操作不能并发处理文件，而是需要一个个文件进行处理。HappyPack的基本原理是将这部分任务分解到多个子进程中去并行处理，子进程处理完成后把结果发送到主进程中，从而减少总的构建时间

```
cnpm i -D happypack
```

```js
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
model.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                // 把js文件交给id为happyBabel的HappyPack的实例执行
                use: [{loader:'happypack/loader?id=happyBabel'}],
                exclude: /node_modules/
            }
        ],
        plugin: [
            new HappyPack({
            id: 'happyBabel', // 与loader对应的id标识
            // 用法和 loader 的配置一样，注意这里是loaders
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env']],
                        cacheDirectory: true
                    }
                }
            ],
            threadPool: happyThreadPool // 共享进程池
        })
        ]
    }
}
```



#### 2.5.1.4 webpack-parallel-uglify-plugin 增强代码压缩

上面对于loader转换已经做优化，那么下面还有另一个难点就是优化代码的压缩时间。

```
cnpm i -D webpack-parallel-uglify-plugin
```

```js
module.exports = {
    optimization: {
        minimizer: [
            new ParallelUglifyPlugin({
                cacheDir: '.cache/',
                uglifyJS: {
                    output: {
                        comments: false,
                        beautify: false
                    },
                    compress: {
                        drop_console: true,
                        collapse_vars: true,
                        reduce_vars: true
                    }
                }
            })
        ]
    }
}
```



#### 2.5.1.5 抽离第三方模块

对于开发项目中不经常会变更的静态依赖文件。类似于我们的`elementUi、vue`全家桶等等。因为很少会变更，所以我们不希望这些依赖要被集成到每一次的构建逻辑中去。 这样做的好处是每次更改我本地代码的文件的时候，`webpack`只需要打包我项目本身的文件代码，而不会再去编译第三方库。以后只要我们不升级第三方包的时候，那么`webpack`就不会对这些库去打包，这样可以快速的提高打包的速度。

这里我们使用`webpack`内置的`DllPlugin DllReferencePlugin`进行抽离。在与`webpack`配置文件同级目录下新建`webpack.dll.config.js` 代码如下

```js
// webpack.dll.config.js
const path = require("path");
const webpack = require("webpack");
module.exports = {
  // 你想要打包的模块的数组
  entry: {
    vendor: ['vue','element-ui'] 
  },
  output: {
    path: path.resolve(__dirname, 'static/js'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library' 
     // 这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '[name]-manifest.json'),
      name: '[name]_library', 
      context: __dirname
    })
  ]
};
```

在`package.json`中配置如下命令

```js
"dll": "webpack --config build/webpack.dll.config.js"
```

接下来在我们的`webpack.config.js`中增加以下代码

```js
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin') // npm i 安装
module.exports = {
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./vendor-manifest.json')
        }),
        new AddAssetHtmlPlugin(
            [
                {
                    filepath: "./static/js/*.dll.js", //将生成的dll文件加入到index.html中
                },
            ]
        )
    ]
};
```

执行

```
npm run dll
```

会发现生成了我们需要的集合第三地方 代码的`vendor.dll.js` 。这样如果我们没有更新第三方依赖包，就不必`npm run dll`。直接执行`npm run dev npm run build`的时候会发现我们的打包速度明显有所提升。因为我们已经通过`dllPlugin`将第三方依赖包抽离出来了。



#### 2.5.1.6 配置缓存

> 我们每次执行构建都会把所有的文件都重复编译一遍，这样的重复工作是否可以被缓存下来呢，答案是可以的，目前大部分 `loader` 都提供了`cache` 配置项。比如在 `babel-loader` 中，可以通过设置`cacheDirectory` 来开启缓存，`babel-loader?cacheDirectory=true` 就会将每次的编译结果写进硬盘文件（默认是在项目根目录下的`node_modules/.cache/babel-loader`目录内，当然你也可以自定义）

但如果 `loader` 不支持缓存呢？我们也有方法,我们可以通过`cache-loader` ，它所做的事情很简单，就是 `babel-loader` 开启 `cache `后做的事情，将 `loader` 的编译结果写入硬盘缓存。再次构建会先比较一下，如果文件较之前的没有发生变化则会直接使用缓存。使用方法如官方 demo 所示，在一些性能开销较大的 loader 之前添加此 loader即可

```
npm i -D cache-loader
```

```js
modeule.exports = {
	module: {
        rules: [
            {
                test: /\.ext$/,
                use: ['cache-loader', ...loaders],
                include: path.resolve(__dirname,'src')
            }
        ]
    }
}
```




### 2.5.2 优化打包文件体积

打包的速度我们是进行了优化，但是打包后的文件体积却是十分大，造成了页面加载缓慢，浪费流量等，接下来让我们从文件体积上继续优化



#### 2.5.2.1 引入webpack-bundle-analyzer 分析打包后的文件

`webpack-bundle-analyzer`将打包后的内容束展示为方便交互的直观树状图，让我们知道我们所构建包中真正引入的内容

```
npm i -D webpack-bundle-analyzer
```



![carbon-6.png](https://user-gold-cdn.xitu.io/2019/12/16/16f0d6291cc2f70c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```
const
```

接下来在`package.json`里配置启动命令

```
"analyz": "NODE_ENV=production npm_config_report=true npm run build" 
```

windows请安装`npm i -D cross-env`

```
"analyz": "cross-env NODE_ENV=production npm_config_report=true npm run build" 
```

接下来`npm run analyz`浏览器会自动打开文件依赖图的网页





























