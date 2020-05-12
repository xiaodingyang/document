# HTML5

## 1.1 HTML5基本概念

### 1.1.1 认识HTML5

- `HTML5`并不是新的语言，而是HTML语言的第五次重大修改
- `支持`：所有的主流浏览器（Chrome，Firefox，Safari），IE9及其以上支持HTML5，但是IE8及其以下不支持HTML5
- 改变了用户与文档的交互方式：多媒体（`video`，`audio`，`canvas`）
- 增加了其他新的特性：`语义特性`，`本地存储特性`，`网页多媒体`，`二维三维`，特效（`过渡`，`动画`）
- 相对于HTML4，HTML5：
	- 抛弃了一些不合理不常用的标记和睡醒
	- 新增了一些标记和属性（表单）
	- 从代码角度而言，HTML5的网页结构代码更加简洁。

### 1.1.2 HTML5 建立的一些规则

- 新特性应该基于 HTML、CSS、DOM 以及 JavaScript。

- 减少对外部插件的需求（比如 Flash）

- 更优秀的错误处理

- 更多取代脚本的标记

- HTML5 应该独立于设备

- 开发进程应对公众透明

### 1.1.3 HTML5 中的一些新特性

- 用于绘画的 `canvas` 元素

- 用于媒介回放的 `video` 和 `audio` 元素

- 对本地离线存储的更好的支持

- 新的特殊内容元素，比如 article、footer、header、nav、section

- 新的表单控件，比如 calendar、date、time、email、url、search

## 1.2 语义化标签

### 1.2.1 结构化标签

| 标签    | 特性                                                         |
| ------- | ------------------------------------------------------------ |
| header  | 定义文档头部区域，一般用在头部                               |
| section | 定义文档中的一块区域,替代div布局                             |
| nav     | 定义导航栏                                                   |
| aside   | 定义侧边栏、广告、nav元素组，以及其他类似的内容部分.aside 的内容应该与 article 的内容相关。一般与正文无关的。 |
| footer  | 定义文档底部区域内容，一般以footer结尾                       |
| article | 标签定义外部的内容。外部内容可以是来自一个外部的新闻提供者的一篇新的文章，或者是来自论坛的文本。 |
| figure  | 定义一块独立的内容（图像，图标，代码等等），通常用来展示图片及其描述。 |

##### figure

`figcaption`用来定义` figure`的标题,放在`figure`的子元素第一个或者最后一个。

```html
<figure>
    <figcaption></figcaption>
    <img src=””/>
</figure>
```

### 1.2.2 特殊结构标签

#### ruby

定义注释，行内元素。

```html
<ruby>龙<rt>long</rt></ruby>
```

#### mark

定义带有记号的文本，用于凸显

#### meter

定义已知范围或分数值内的标量测量，`<meter>` 标签不应用于指示进度（在进度条中）。如果标记进度条，请使用 `<progress> `标签。

- min 最小值   

- max 最大值  

- low  指定点为最低值   

- optimum  指定最佳值

- high  指定点为最高值

```html
<meter min=”0” max=”10” value=”3” low=”5” optimum=”9” high=”9” ></meter>
```

#### progress

标签显示任务的进度或者进程一般结合js使用，当不给定值时为一种加载的状态，在谷歌里面是一直滚动的状态，火狐里面是一种闪光的状态。支持宽高设置，但背景颜色需要结合js。

- max 最大值
- value 当前值

```html
<progress value="50" max="100"></progress>
```



#### details

用于描述文档细节部分，类似于定义列表

```html
<details>
    <summary>标题</summary>
    <p>对标题的描述</p>
</details>
```

#### wbr

定义文本在何处换行，相当于单词内换行。单标签

## 1.3 兼容性

- HTML5有部分内容兼容到IE9，IE8及以下对H5完全不兼容，后面的内容不再考虑此类浏览器。最新版本的 Safari、Chrome、Firefox 以及 Opera 支持某些HTML5 特性。

- 部分css3须加兼容前缀：
	- -webkit-       常用于兼容chrome浏览器
	-  -moz-              常用于兼容火狐
	- -o-                    常用于兼容opera
	- -ms-                常用于兼容IE

- 兼容性查询网站：http://caniuse.com/

- 兼容性处理：引入第三方插件`html5shiv.js`

## 1.4 HTML5智能表单

### 1.4.1 type类型

#### email邮箱

验证是否为正确的`email`格式，如果不，点击提交按钮会显示提示。

```
邮箱：<input type="email" class="in1">
```

#### tel电话

`tel`并不是用来验证的，他的本质目的是为了能够在移动端打开数字键盘。意味着数字键盘限制了用户只能输入数字

```html
电话：input type="tel">
```

#### url网址

验证只能输入合法的网址：必须包含http://

```html
网址：input type="url">
```

#### number数字

限制只能输入数字，不能输入其他字符（除了小数点）

- max: 最大值
- min: 最小值
- value: 默认值

```
商品数量：<input type="number">
```

#### search删除功能

人性化的输入体验。在表单内输入内容之后会显示一个关闭符号，可以删除输入的内容

```
<input type="search">
```

#### range

拖动条，step属性可以设置每次变换大小，支持value，max，min等属性。默认的value值为最大值的50%

```
<input type="range" step="2" max="10" min="0" value="5">
```

#### color调色板

点击弹出调色板。

```
<input type="color">
```

#### time时间

时分秒

```
<input type="time" class="in1">
```

#### date日期

年、月、日

```
<input type="date">
```



#### datetime日期时间

大多数浏览器不支持，只能在苹果Safari浏览器下支持

```
<input type="datetime">
```

#### datetime-local日期时间

日期和时间

```
<input type="datetime-local">
```

#### month月份

```
<input type="month">
```

#### week星期

```html
<input type="week">
```

### 1.4.2 表单新增属性

#### placehoder提示文本

```html
<input type="text" placehoder="请输入">
```

#### autofocus自定获取焦点

```html
<input type="text" autofocus>
```

#### autocomplete

值为`on`或者`off`。

- `on` 打开自动完成
- `off`关闭自动完成

自动完成的条件：

- 之前输入的内容必须成提交过
- 当前添加`autocomplete`的元素必须有`name`属性

```html
<input type="text" autocomplete="on">
```

#### required 必须输入

必须要输入框中输入内容

```html
<input type="text" required>
```

#### pattern

添加正则表达式验证

```html
<input type="tel" pattern="^(\+86)?1/d{10}$">
```

#### multiple

使file表单可以上传多个文件

在email中还可以允许输入多个邮箱地址，只不过以逗号进行分割

```html
<input type="file" multiple>
<input type="email" multiple>
```

#### form标签属性

指定表单的id，那么在将来指定id号的表单进行数据提交的时候，也会将当前表单元素的数据提交。

```html
<form action="http://www.baidu.com" id="from1">
	<input type="text">
</form>
<input type="text" form="from1">
```



### 1.4.3 HTML 新增元素

#### datalist

文本框输入关键字显示备用选项 `list`属性对应`datalist`的`id`值

##### 普通文本框

```html
请填写你的性别：<input type="text"  list="lis">
<datalist id="lis">
    <option value="英语" label="不会"></option>
    <option value="前端" label="so简单"></option>
    <option value="Java" label="使用人数多"></option>
</datalist>
```

##### 网址

```html
网址：<input type="url" list="urls">
<datalist id="urls">
   <option value="http://www.baidu.com" label="百度">
   <option value="http://www.sohu.com" label="百度">
   <option value="http://www.163.com" label="百度">
</datalist>
```



- 其中`option`可以使单标签也可以是双标签

- `label`会显示在`value`后面

### 1.4.4 表单新增事件

#### oninput

监听当前指定内容的改变，只要内容改变，就会触发这个事件（添加内容，删除内容），就会触发这个事件。

和`onkeup`的区别：每一个键抬起都会触发一次。

```javascript
oInp.oninput = function () {
	// 内容部分...
}
```



#### oninvalid

当验证没有通过时触发的事件，通常可以与`input`中的`pattern`验证搭配使用。

```html
<form action="http://www.baidu.com">
	请输入手机号码：
	<input type="text" pattern="^1\d{10}$">
	<button>提交</button>
</form>
```

```javascript
var oInp = document.querySelector("input");
oInp.oninvalid = function () {
	/* 设置默认的提示信息 */
	this.setCustomValidity("请输入1开头的十一位电话号码！")
}
```

其中，`setCustomValidity`可以设置默认的提示信息。

## 1.5音频和视频

### 1.5.1 认识HTML5视频

#### 常见的视频格式

- 视频的组成部分：画面、音频、编码格式

- 视频编码：H.264、Theora、VP8(google开源)

#### 常见的音频格式

- 音频编码：ACC、MP3、Vorbis

#### HTML5支持的视频格式

- Ogg=带有Theora视频编码+Vorbis音频编码的Ogg文件，支持的浏览器:F、C、O

- MEPG4=带有H.264视频编码+AAC音频编码的MPEG4文件，支持的浏览器: S、C

- WebM=带有VP8视频编码+Vorbis音频编码的WebM格式，支持的浏览器: I、F、C、O

### 1.5.2 video标签

| 属性     | 值                     | 描述                                                         |
| -------- | ---------------------- | ------------------------------------------------------------ |
| autoplay | autoplay(也可以不写值) | 如果出现该属性，则视频在就绪后马上播放                       |
| controls | controls               | 如果出现该属性，则向用户显示控件，比如播放按钮               |
| loop     | loop                   | 如果出现该属性，则当媒介文件完成播放后再次开始播放           |
| src      | src                    | 要播放视频的URL                                              |
| preload  | preload                | 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性 |
| poster   | poster                 | 等待播放图片，在视频播放前                                   |
| width    | px                     | 设置视频播放的宽度                                           |
| height   | px                     | 设置视频播放的                                               |

```html
<video src="mp4.mp4" controls width="400" poster="images/1.jpg"></video>
```



#### source

因为不同浏览器支持的视频格式不一样，所以我们进行视频添加的时候。需要考虑浏览器是否支持。我们可以准备多个格式的视频文件，让浏览器自动的选择。

```html
<video>
	<source src="flv.flv" type="video/flv">
	<source src="mp4.mp4" type="video/mp4">
	您的浏览器不支持该格式视频播放
</video>
```

#### API方法

| 方法           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| addTextTrack() | 向音频/视频添加新的文本轨道                                  |
| canPlayType()  | 检测浏览器是否能播放指定的音频/视频类型                      |
| load()         | 重新加载音频/视频元素                                        |
| play()         | 开始播放音频/视频                                            |
| pause()        | 暂停当前播放的音频/视频                                      |
| 退出全屏       | webkit    document.webkitCancelFullScreen(); <br>Firefox    document.mozCancelFullScreen(); <br>W3C        document.exitFullscreen() |
| 全屏           | webkit     element.webkitRequestFullScreen()<br/>Firefox    element.mozRequestFullScreen()
W3C        element.requestFullscreen() |


#### API属性

| **属性**                                                     | **描述**                                                   |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| [audioTracks](http://www.w3school.com.cn/html5/av_prop_audiotracks.asp) | 返回表示可用音轨的   AudioTrackList 对象                   |
| [autoplay](http://www.w3school.com.cn/html5/av_prop_autoplay.asp) | 设置或返回是否在加载完成后随即播放音频/视频                |
| [buffered](http://www.w3school.com.cn/html5/av_prop_buffered.asp) | 返回表示音频/视频已缓冲部分的 TimeRanges 对象              |
| [controller](http://www.w3school.com.cn/html5/av_prop_controller.asp) | 返回表示音频/视频当前媒体控制器的 MediaController 对象     |
| [controls](http://www.w3school.com.cn/html5/av_prop_controls.asp) | 设置或返回音频/视频是否显示控件（比如播放/暂停等）         |
| crossOrigin                                                  | 设置或返回音频/视频的 CORS 设置                            |
| [currentSrc](http://www.w3school.com.cn/html5/av_prop_currentsrc.asp) | 返回当前音频/视频的 URL                                    |
| [currentTime](http://www.w3school.com.cn/html5/av_prop_currenttime.asp) | 设置或返回音频/视频中的当前播放位置（以秒计）              |
| [defaultMuted](http://www.w3school.com.cn/html5/av_prop_defaultmuted.asp) | 设置或返回音频/视频默认是否静音                            |
| [defaultPlaybackRate](http://www.w3school.com.cn/html5/av_prop_defaultplaybackrate.asp) | 设置或返回音频/视频的默认播放速度                          |
| [duration](http://www.w3school.com.cn/html5/av_prop_duration.asp) | 返回当前音频/视频的长度（以秒计）                          |
| [ended](http://www.w3school.com.cn/html5/av_prop_ended.asp)  | 返回音频/视频的播放是否已结束                              |
| [error](http://www.w3school.com.cn/html5/av_prop_error.asp)  | 返回表示音频/视频错误状态的 MediaError 对象                |
| [loop](http://www.w3school.com.cn/html5/av_prop_loop.asp)    | 设置或返回音频/视频是否应在结束时重新播放                  |
| [mediaGroup](http://www.w3school.com.cn/html5/av_prop_mediagroup.asp) | 设置或返回音频/视频所属的组合（用于连接多个音频/视频元素） |
| [muted](http://www.w3school.com.cn/html5/av_prop_muted.asp)  | 设置或返回音频/视频是否静音                                |
| [networkState](http://www.w3school.com.cn/html5/av_prop_networkstate.asp) | 返回音频/视频的当前网络状态                                |
| [paused](http://www.w3school.com.cn/html5/av_prop_paused.asp) | 设置或返回音频/视频是否暂停                                |
| [playbackRate](http://www.w3school.com.cn/html5/av_prop_playbackrate.asp) | 设置或返回音频/视频播放的速度                              |
| [played](http://www.w3school.com.cn/html5/av_prop_played.asp) | 返回表示音频/视频已播放部分的 TimeRanges 对象              |
| [preload](http://www.w3school.com.cn/html5/av_prop_preload.asp) | 设置或返回音频/视频是否应该在页面加载后进行加载            |
| [readyState](http://www.w3school.com.cn/html5/av_prop_readystate.asp) | 返回音频/视频当前的就绪状态                                |
| [seekable](http://www.w3school.com.cn/html5/av_prop_seekable.asp) | 返回表示音频/视频可寻址部分的 TimeRanges 对象              |
| [seeking](http://www.w3school.com.cn/html5/av_prop_seeking.asp) | 返回用户是否正在音频/视频中进行查找                        |
| [src](http://www.w3school.com.cn/html5/av_prop_src.asp)      | 设置或返回音频/视频元素的当前来源                          |
| [startDate](http://www.w3school.com.cn/html5/av_prop_startdate.asp) | 返回表示当前时间偏移的 Date 对象                           |
| [textTracks](http://www.w3school.com.cn/html5/av_prop_texttracks.asp) | 返回表示可用文本轨道的   TextTrackList 对象                |
| [videoTracks](http://www.w3school.com.cn/html5/av_prop_videotracks.asp) | 返回表示可用视频轨道的   VideoTrackList 对象               |
| [volume](http://www.w3school.com.cn/html5/av_prop_volume.asp) | 设置或返回音频/视频的音量                                  |

#### 事件

| **事件**                                                     | **描述**                                     |
| ------------------------------------------------------------ | -------------------------------------------- |
| abort                                                        | 当音频/视频的加载已放弃时                    |
| [canplay](http://www.w3school.com.cn/html5/av_event_canplay.asp) | 当浏览器可以播放音频/视频时                  |
| [canplaythrough](http://www.w3school.com.cn/html5/av_event_canplaythrough.asp) | 当浏览器可在不因缓冲而停顿的情况下进行播放时 |
| [durationchange](http://www.w3school.com.cn/html5/av_event_durationchange.asp) | 当音频/视频的时长已更改时                    |
| emptied                                                      | 当目前的播放列表为空时                       |
| ended                                                        | 当目前的播放列表已结束时                     |
| error                                                        | 当在音频/视频加载期间发生错误时              |
| [loadeddata](http://www.w3school.com.cn/html5/av_event_loadeddata.asp) | 当浏览器已加载音频/视频的当前帧时            |
| [loadedmetadata](http://www.w3school.com.cn/html5/av_event_loadedmetadata.asp) | 当浏览器已加载音频/视频的元数据时            |
| [loadstart](http://www.w3school.com.cn/html5/av_event_loadstart.asp) | 当浏览器开始查找音频/视频时                  |
| pause                                                        | 当音频/视频已暂停时                          |
| play                                                         | 当音频/视频已开始或不再暂停时                |
| playing                                                      | 当音频/视频在已因缓冲而暂停或停止后已就绪时  |
| [progress](http://www.w3school.com.cn/html5/av_event_progress.asp) | 当浏览器正在下载音频/视频时                  |
| ratechange                                                   | 当音频/视频的播放速度已更改时                |
| seeked                                                       | 当用户已移动/跳跃到音频/视频中的新位置时     |
| seeking                                                      | 当用户开始移动/跳跃到音频/视频中的新位置时   |
| stalled                                                      | 当浏览器尝试获取媒体数据，但数据不可用时     |
| suspend                                                      | 当浏览器刻意不获取媒体数据时                 |
| timeupdate                                                   | 当目前的播放位置已更改时                     |
| volumechange                                                 | 当音量已更改时                               |
| waiting                                                      | 当视频由于需要缓冲下一帧而停止               |



## 1.6 HTML5操作类

- `classList`当前元素的所有样式列表
- `add()`添加类
- `remove()`删除类
- `toggle()`有就移出，没有就添加
- `contains()`是否包含某个类，包含返回true，没有包含返回false
- `item(n)`查看此项的第`n`个类名，没有此项则值为null

```css
.add{ color: red; }
.remove{ color: green; }
.toggle{ color: purple; }
.contains{ color: yellow; }
```

```html
<ul>
	<li>我是第一个li</li>
	<li class="remove">我是第二个li</li>
	<li class="toggle">我是第三个li</li>
   <li class="toggle contains">我是第四个li</li>
</ul>
```

```javascript
var aLi = document.querySelectorAll("li");
aLi[0].onclick = function () {
	this.classList.add("add")
}
aLi[1].onclick = function () {
	this.classList.remove("remove")
}
aLi[2].onclick = function () {
	this.classList.toggle("toggle")
}
aLi[3].onclick = function () {
	this.classList.contains("contains")
}
console.log(aLi[3].classList.item(1))	//contains
```

## 1.7 自定义标签属性

### 定义规范：

- `data-`开头，如："data-name-xiaoyang"
- `data-`后必须至少有一个字符串，多个单词使用`-`连接
- 名称应该都是用小写，不要包含任何大写字符
- 名称中不要有任何的特殊符号
- 名称不要使用纯数字
- `dataset` 获取自定义属性的值，必须将`data-`后面的连接词使用驼峰命名。否则无法正确获取到改属性值。

```html
<div data-name-xiaoyang="小阳"></div>
```

```javascript
var oDiv = document.querySelector("div")
var dValue = oDiv.dataset["nameXiaoyang"]	//小阳
```

## 1.8 HTML5网络监听接口

### 1.8.1 ononline

网络联通的时候触发这个事件

```javascript
window.addEventListener("online", function () {
	console.log( "连接上网络了！" )
})
```

### 1.8.2 offline

网络断开的手触发这个事件

```javascript
window.addEventListener("offline", function () {
	console.log( "网络断开了！" )
})
```

## 1.9 HTML5全屏接口

### 1.9.1 方法和属性

- `requestFullScreen()`: 开启全屏显示
- `cancelFullScreen()`:  退出全屏显示，在不同的浏览器下面只能使用document来实现，因为是整个document退出全屏
- `fullScreenElement`: 是否是全屏状态
- 兼容前缀：chorme(`webkit`)、firefox(`moz`)、IE(`ms`)、opera(`o`)

### 1.9.2 全屏状态

封装如下：

```javascript
function toFullVideo(obj) {
  if (obj.requestFullscreen) {
    return obj.requestFullScreen();
  } else if (obj.webkitRequestFullScreen) {
    return obj.webkitRequestFullScreen();
  } else if (obj.mozRequestFullScreen) {
    return obj.mozRequestFullScreen();
  } else {
    return obj.msRequestFullscreen()
  }
}
```



### 1.9.3 退出全屏

封装如下：

```javascript
function exitFullscreen() {
   if (document.exitFullscreen) {
      document.exitFullscreen();
   } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
   } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
   } else if(document.oRequestFullscreen){
      document.oCancelFullScreen();
   }else {
      document.webkitExitFullscreen();
   }
  }
```

也可以直接按ESC键退出全屏

### 1.9.4 是否全屏

封装如下：

```javascript
function isFullScreen() {
 return (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement || document.oFullscreenElement || document.msFullscreenElement) ? true : false
}
```



## 2.0 HTML5-FileReader

### 2.0.1 readAsText()

读取文本文件(test.txt)，返回文本字符串。默认编码是`UTF-8`



### 2.0.2 readAsBinaryString()

读取任意类型的文件，返回二进制字符串。这个方法不是用来读取文件展示给用户看的，而是存储文件。例如，读取文件的内容，获取二进制数据，传递给后台，后台接收到数据以后，再将数据存储。



### 2.0.3 readAsDataURL()

- src: 指定路径 ( 资源定位--url )，`src`请求的是外部文件，一般来说是服务器资源。意味着他需要像服务器发送请求，他占用服务器资源，因此，我们可以使用 `readAsDataURL()` 优化网站的加载速度和执行效率
- 读取文件获取一段以`data`开头的字符串，这段字符串的本质就是`DataURL.DataURL` 是一种将文件嵌入到文档的方案，`DataURL`是将资源转换为`base64`编码的字符串形式，并将这些内容直接存储在url中，优化网站的加载速度和执行效率。
- `abort()` 中断读取
- 没有任何返回值，但是他会将读取的结果存储在文件读取对象的`result`属性中
- 需要传递一个参数 `bingary large object`: 文件（图片或者其他可以嵌入到文档的类型）
- 文件存储在file表单元素的`files`属性中，他是一个数组。

### 2.0.4 FileReader事件

获取数据 在读取文件是异步的，所以我们需要通过事件来知道他是否读取完毕，只有读取完毕以后我们才能获取到值`FileReader` 提供一个完整的事件模型，用来捕获文件读取时的状态
* `onabout` 读取文件中断时触发
* `onerror` 读取错误时触发
* `onload` 文件读取成功完成时触发
* `onloadend` 读取完成时触发（无论成功还是失败）
* `onloadstart` 开始读取时触发
* `onprogress` 读取文件过程中触发

### 2.0.5  读取文件实时预览案例

我们会通过做一个上传文件实时预览的案例来详细介绍怎么去使用。

#### 2.1.0 HTML 部分

```html
<form action="">
  <input type="file" name="files" id="files"> <br>
  <input type="submit" value="提交">
  <div id="views"></div>
</form>
```

#### 2.1.1 JavaScript部分

```javascript
var file = document.getElementById("files")
var views = document.getElementById("views")
file.onchange = function () {
  /* 实例化文件读取对象*/
  var reader = new FileReader()
  /* 文件存储在file表单元素的`files`属性中，他是一个数组。 */
  var val = file.files
  /*
  * 需要传递一个参数 `bingary large object`: 文件（图片或者其他可以嵌入到文档的类型）
  * 没有任何返回值，但是他会将读取的结果存储在文件读取对象的`result`属性中
   *  */
  reader.readAsDataURL(val[0])
  reader.onload = function () {
    /* 读取文件 */
    var res = reader.result
    /* 创建一个img标签，将获取到的img的src给新创建的这个标签 */
    var img = document.createElement('img')
    img.src = res
    img.style.cssText = "width: 200px"
    views.appendChild(img)
  }

}
```



## 2.1 HTML5拖拽

### 2.1.1 拖拽事件

#### 应用于被拖拽元素的事件

拖拽元素，要拖拽的元素

- `ondrag`: 应用于拖拽元素，整个拖拽过程都会调用（持续的触发）
- `ondragstart`: 应用于拖拽元素，当拖拽开始时调用
- `ondragleave`: 应用于拖拽元素，当鼠标离开拖拽元素时调用
- `ondragend`: 应用于拖拽元素，当拖拽结束时调用

#### 应用于目标元素的事件

要拖到的那个盒子里面

- `ondragenter`: 应用于目标元素，当拖拽元素进入时调用

- `ondragover`: 应用于目标元素，当停留在目标元素上的时候调用

- `ondrop`: 应用于目标元素，当在目标元素上松开鼠标时调用。浏览器默认会阻止此事件， 我们必须在`ondragover`中去阻止浏览器的默认行为： `e.preventDefault()`

	```javascript
	oBox.ondragover = function (e) {
	   e.preventDefault()
	}
	```

- `ondragleave`: 应用于目标元素，当鼠标离开目标元素时调用

### 2.1.2 拖拽盒子案例

#### CSS部分

```css
.box1,
.box2 {
  width: 200px;
  height: 100px;
  border: 1px solid deeppink;
  margin: 10px;
}
p{
  background: darkblue;
  color: #fff;
  font: 12px/40px '';
  text-align: center;
}
```

#### HTML 部分

```html
<div class="box1">
  <p draggable="true">我是被拖拽的盒子</p>
</div>
<div class="box2"></div>
```

#### JavaScript部分

```javascript
var oBox1 = document.querySelector(".box1")
var oBox2 = document.querySelector(".box2")
var oP = document.querySelector(".box1 p")
/* box2拖拽到box1 */
prevent(oBox1)
oBox1.ondrop = function () {
  this.appendChild(oP)
}
/* box1拖拽到box2 */
prevent(oBox2)
oBox2.ondrop = function () {
  this.appendChild(oP)
}
/* 封装的阻止浏览器默认事件函数 */
function prevent(obj) {
  obj.ondragover = function (e) {
    var e = window.event || e
    e.preventDefault()  /* 阻止浏览器的默认事件 */
  }
}
```

但是我们可以发现，如果有很多个盒子那是不是要写很多事件？所以，我们可以通过`e.target`事件委托结合`dataTransfer.setData()` 来完善拖拽。

- `dataTransfer.setData(format, data)` : format 数据的类型（text/html，text/uri-list），data 一般来说是字符串值

#### 完善拖拽

##### html部分

```
<div id="box1">
  <p draggable="true" id="mybox">我是被拖拽的盒子</p>
</div>
<div id="box2"></div>
<div id="box3"></div>
```

##### JavaScript部分

```JavaScript
document.ondragstart = function (e) {
  var e = window.event || e
	/* 将拖拽对象的id保存下来 */
  e.dataTransfer.setData("text/html", e.target.id)
}
	/* 阻止浏览器默认事件 */
document.ondragover = function (e) {
  var e = window.event || e
  e.preventDefault()
}
	/* 通过dataTransfer.setData() 存储的数据，只能在ondrop事件中获取 */
document.ondrop = function (e) {
  var e = window.event || e
	/* 通过getData获取到之前存的id */
  var id = e.dataTransfer.getData("text/html")
	/* 将之前获取到的拖拽对象添加到现在的目标对象中 */
  e.target.appendChild(document.getElementById(id))
}
```

## 2.2 地理定位接口

### 2.2.1 获取位置的方式

| 数据源     | 有点                                                         | 缺点                                                   |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| IP地址     | 任何地方都可用在服务器端处理                                 | 不精确（经常出错，一般精确到城市级）运算代价大         |
| GPS        | 很精确                                                       | 定位时间长，耗电量大。室内效果差，需要额外硬件设备支持 |
| Wi-Fi      | 精确，可在室内使用，简单，快捷                               | 在乡村这些WiFi接入点少的地区没有办法使用               |
| 手机信号   | 相当精确，可在室内使用，简单，快捷                           | 需要能够访问手机或其 modem设备                         |
| 用户自定义 | 可获得比程序定位服务更准确的位置数据，用户自行输入可能比自动检测更快 | 可能很不准确，特别是当用户位置变更以后                 |



### 2.2.2 navigator.geolocation.getCurrentPosition(success, error, option)

- `success`: 获取地理信息成功后的回调
- `error`:  获取地理信息失败后的回调
- `option`: 获取当前地理信息的方式

检测浏览器是否支持定位，支持执行 navigator.geolocation.getCurrentPosition 不支持则输出提示信息

```javascript
function getLocation() {
  navigator.geolocation ? navigator.geolocation.getCurrentPosition(showPosition, showError, {}) : oMap.innerHTML = 'Geolocation is not supported by this browser'
}
```

#### 成功回调

成功获取之后的回调，如果获取地理信息成功，会将获取到的地理信息传递给成功之后的回调

- `position.coords.latitude`  纬度
- `position.coords.longitude`  经度
- `position.coords.accuracy`  精度
- `position.coords.altitude`  海拔高度

```javascript
function showPosition(position) {
  oMap.innerHTML = "纬度：" + position.coords.latitude + "<br>经度：" +  position.coords.longitude
}
```

#### 失败回调

```javascript
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      /* 用户拒绝定位请求 */
      oMap.innerHTML = 'User denied the request rot Geolocation'
      break;
    case error.POSITION_UNAVAILABLE:
      /* 定位信息不可用 */
      oMap.innerHTML = 'Location information is unavailable'
      break;
    case error.TIMEOUT:
      /* 请求超时 */
      oMap.innerHTML = 'The request to get user location timed out'
      break;
    case error.UNKNOWN_ERR:
      /* 位置错误 */
      oMap.innerHTML = 'An unknown error occurred'
      break;
  }
}
```

#### option 获取当前地理信息的方式

- `enableHighAccuracy: true/false`  是否使用高精度
- `timeout`: 设置超时时间，ms
- `maximumAge`: 可以设置浏览器重新获取地理信息的时间间隔，单位是ms

```javascript
navigator.geolocation.getCurrentPosition(showPosition, showError, {
  enableHighAccuracy: true,
  timeout: 3000
})
```

#### 地图案例

> 我的秘钥：GCDEQ3D0gGadtfbK8P6dcd4GRpUI1aeq



```html
<!DOCTYPE html>
<html>
<head>
  <title>普通地图&全景图</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=GCDEQ3D0gGadtfbK8P6dcd4GRpUI1aeq"></script>
  <style type="text/css">
    body, html{width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
    #panorama {height: 50%;overflow: hidden;}
    #normal_map {height:50%;overflow: hidden;}
  </style>
</head>
<body>
<div id="panorama"></div>
<div id="normal_map"></div>
<script type="text/javascript">
  //全景图展示
  var panorama = new BMap.Panorama('panorama');
  panorama.setPosition(new BMap.Point(104.072163, 30.550424)); //根据经纬度坐标展示全景图
  panorama.setPov({heading: -40, pitch: 6});

  panorama.addEventListener('position_changed', function(e){ //全景图位置改变后，普通地图中心点也随之改变
    var pos = panorama.getPosition();
    map.setCenter(new BMap.Point(pos.lng, pos.lat));
    marker.setPosition(pos);
  });
  //普通地图展示
  var mapOption = {
    mapType: BMAP_NORMAL_MAP,
    maxZoom: 18,
    drawMargin:0,
    enableFulltimeSpotClick: true,
    enableHighResolution:true
  }
  var map = new BMap.Map("normal_map", mapOption);
  var testpoint = new BMap.Point(104.072163, 30.550424);
  map.centerAndZoom(testpoint, 18);
  var marker=new BMap.Marker(testpoint);
  marker.enableDragging();
  map.addOverlay(marker);
  marker.addEventListener('dragend',function(e){
    panorama.setPosition(e.point); //拖动marker后，全景图位置也随着改变
    panorama.setPov({heading: -40, pitch: 6});}
  );
</script>
</body>
</html>
```

## 2.3 HTML5-本地存储

### 2.3.1 sessionStorage

`sessionStorage` 存储数据到本地，存储的容量5M左右。

- 这个数据本质是存在当前页面中的
- 他的生命周期默认为关闭当前页面，通常用来存储临时的值

- `sessionStorage.setItem(key,value)`: 存储数据，以键值对的方式存储
- `sessionStorage.getItem(key)`: 获取数据，通过制定名称的key获取对应的value值
- `sessionStorage.removeItem(key)`: 删除数据，通过制定名称ke删除对应的值
- `sessionStorage.clear()`: 清空所有存储的内容



```html
<label>姓名：<input type="text" id="username"></label>
<input type="button" value="设置值" id="set">
<input type="button" value="取值" id="get">
```



```javascript
let username = document.getElementById("username")
let set = document.getElementById("set")
/* 设置值 */
set.onclick = function () {
  let val = username.value
  window.sessionStorage.setItem("userName",val)
}
/* 取值 */
get.onclick = function () {
  let val = window.sessionStorage.getItem("userName")
  console.log( val )
}
/* 删除值 在删除的时候如果key值错误，不会报错也不会删除数据*/
remove.onclick = function () {
  window.sessionStorage.removeItem("userName")
}
```

### 2.3.2 localStorage

- 存储的内容大概20M
- 不同浏览器不能共享数据。但是在同一个浏览器的不容窗口中可以共享数据
- 永久生效，他的数据时存储在硬盘，并不会随着页面或者浏览器的关闭而清除。如果想清除必须手动清除。
- `sessionStorage.setItem(key,value)`: 存储数据，以键值对的方式存储
- `sessionStorage.getItem(key)`: 获取数据，通过制定名称的key获取对应的value值
- `sessionStorage.removeItem(key)`: 删除数据，通过制定名称ke删除对应的值
- `sessionStorage.clear()`: 清空所有存储的内容

```html
<label>姓名：<input type="text" id="username"></label>
<input type="button" value="设置值" id="set">
<input type="button" value="取值" id="get">
<input type="button" value="删除值" id="remove">
```



```javascript
let username = document.getElementById("username")
let set = document.getElementById("set")
let get = document.getElementById("get")
let remove = document.getElementById("remove")
/* 设置值 */
set.onclick = function () {
  let val = username.value
  window.localStorage.setItem("userName",val)
}
/* 取值 */
get.onclick = function () {
  let val = window.localStorage.getItem("userName")
  console.log( val )
}
/* 删除值 */
remove.onclick = function () {
  window.localStorage.removeItem("userName")
}
```

## 2.4 HTML5-应用缓存

- 概念：使用HTML5，通过创建`cache manifest`文件，可以轻松的创建web引用的离线版本。

- 优势：
	- 可配置需要缓存的资源
	- 无网络无连接应用仍然可用
	- 本地读取缓存资源，提升访问速度，增强用户体验
	- 减少请求，缓解服务器负担

### 2.4.1 启用应用缓存

如需启用应用程序缓存，请在文档`<html>` 标签中包含`manifest`属性：

> manifest="应用程序缓存清单文件的路径，建议文件的扩展名是`appcahe`，这个文件的本质就是一个文本文件"

```
<html lang="en" manifest="demo.appcache">
</html>
```

### 2.4.2 appcache文件

- #是注释
- *代表缓存所有文件
- manifest文件的建议的文件扩展名是：".appcache"
- 每个制定了manifest的页面在用户对齐访问时都会被缓存。如果未指定manifest属性，则页面不会被缓存(除非在manifest文件中直接指定了该页面)

```shell
CACHE MANIFEST
# 上面一句代码必须是当前文档的第一句，声明文档是缓存文件

#下面就是需要缓存的清单列表
CACHE:
images/1.jpg
images/2.jpg

#配置每一次都需要重新从服务器获取的文件清单列表
NETWORK:
images/3.jpg

#配置如果文件无法获取则使用指定的文件进行代替，使用空格隔开
FALLBACK:
images/4.jpg images/tihuan.jpg
```

> 注意: manifest文件需要配置正确的`MIME-type`，即 "`text/cache-manifest`"。必须在web服务器上进行设置







# 四、Websocket

- WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。
- WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

- HTTP 协议有一个缺陷：通信只能由客户端发起。举例来说，我们想了解今天的天气，只能是客户端向服务器发出请求，服务器返回查询结果。HTTP 协议做不到服务器主动向客户端推送信息。

## 1.1 简介

- WebSocket 协议在2008年诞生，2011年成为国际标准。所有浏览器都已经支持了。

- 它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于[服务器推送技术](https://en.wikipedia.org/wiki/Push_technology)的一种。

![img](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017051502.png)



- 其他特点包括：

  > - 建立在 TCP 协议之上，服务器端的实现比较容易。
  > - 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
  > - 数据格式比较轻量，性能开销小，通信高效。
  > - 可以发送文本，也可以发送二进制数据。
  > - 没有同源限制，客户端可以与任意服务器通信。
  > - 协议标识符是`ws`（如果加密，则为`wss`），服务器网址就是 URL。

![img](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017051503.jpg)



- 浏览器通过 JavaScript 向服务器发出建立 WebSocket 连接的请求，连接建立以后，客户端和服务器端就可以通过 TCP 连接直接交换数据。

- 当你获取 Web Socket 连接后，你可以通过 **send()** 方法来向服务器发送数据，并通过 **onmessage** 事件来接收服务器返回的数据。

- 以下 API 用于创建 WebSocket 对象。

  ```js
  var Socket = new WebSocket(url, [protocol] );
  ```

- 以上代码中的第一个参数 url, 指定连接的 URL。第二个参数 protocol 是可选的，指定了可接受的子协议。



## 1.2 Websocket 属性

- 以下是 WebSocket 对象的属性。假定我们使用了以上代码创建了 Socket 对象：

| 属性                  | 描述                                                         |
| :-------------------- | :----------------------------------------------------------- |
| Socket.readyState     | 只读属性 **readyState** 表示连接状态，可以是以下值：<br />0 - 表示连接尚未建立。<br />1 - 表示连接已建立，可以进行通信。<br />2 - 表示连接正在进行关闭。<br />3 - 表示连接已经关闭或者连接不能打开。 |
| Socket.bufferedAmount | 只读属性 **bufferedAmount** 已被 send() 放入正在队列中等待传输，但是还没有发出的 UTF-8 文本字节数。 |



## 1.3 WebSocket 事件

- 以下是 WebSocket 对象的相关事件。假定我们使用了以上代码创建了 Socket 对象：

| 事件    | 事件处理程序     | 描述                       |
| :------ | :--------------- | :------------------------- |
| open    | Socket.onopen    | 连接建立时触发             |
| message | Socket.onmessage | 客户端接收服务端数据时触发 |
| error   | Socket.onerror   | 通信发生错误时触发         |
| close   | Socket.onclose   | 连接关闭时触发             |



## 1.4 WebSocket 方法

- 以下是 WebSocket 对象的相关方法。假定我们使用了以上代码创建了 Socket 对象：

| 方法           | 描述             |
| :------------- | :--------------- |
| Socket.send()  | 使用连接发送数据 |
| Socket.close() | 关闭连接         |



## 1.5 WebSocket 实例

- WebSocket 协议本质上是一个基于 TCP 的协议。
- 为了建立一个 WebSocket 连接，客户端浏览器首先要向服务器发起一个 HTTP 请求，这个请求和通常的 HTTP 请求不同，包含了一些附加头信息，其中附加头信息"Upgrade: WebSocket"表明这是一个申请协议升级的 HTTP 请求，服务器端解析这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的 WebSocket 连接就建立起来了，双方就可以通过这个连接通道自由的传递信息，并且这个连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接。

### 1.5.1 客户端的 HTML 和 JavaScript

- 目前大部分浏览器支持 WebSocket() 接口，你可以在以下浏览器中尝试实例： Chrome, Mozilla, Opera 和 Safari。

```html
<!--runoob_websocket.html 文件内容-->
<!DOCTYPE HTML>
<html>
   <head>
   <meta charset="utf-8">
   <title>document</title>
    
      <script type="text/javascript">
         function WebSocketTest()
         {
            if ("WebSocket" in window)
            {
               alert("您的浏览器支持 WebSocket!");
               // WebSocket 对象作为一个构造函数，用于新建 WebSocket 实例。
               var ws = new WebSocket("ws://localhost:9998/echo");
               ws.onopen = function() {
                  // Web Socket 已连接上，使用 send() 方法发送数据
                  ws.send("发送数据");
                  alert("数据发送中...");
               };
                
               ws.onmessage = function (event) { 
                 // 注意，服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象）。
                  if(typeof event.data === String) {
                    var received_msg = event.data;
                    console.log("Received data string");
                  }

                 if(event.data instanceof ArrayBuffer){
                   var buffer = event.data;
                   console.log("Received arraybuffer");
                 }
                  alert("数据已接收...");
               };
                
               ws.onclose = function() { 
                  // 关闭 websocket
                  alert("连接已关闭..."); 
               };
            } else {
               // 浏览器不支持 WebSocket
               alert("您的浏览器不支持 WebSocket!");
            }
         }
      </script>
        
   </head>
   <body>
      <div id="sse">
         <a href="javascript:WebSocketTest()">运行 WebSocket</a>
      </div>
   </body>
</html>
```

