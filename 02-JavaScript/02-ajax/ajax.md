# 二十六、Ajax

## 1.1 认识ajax

### 1.1.1 概念

- 全称：Asynchronous JavaScript and XML 

- 中文：异步JavaScript和XML

`ajax`：在不刷新页面的情况下（当然是需要一些事件去触发），浏览器`异步`地向服务器发出`HTTP请求`。服务器收到请求后，传回新的格式化数据回来（通常是JSON）。浏览器解析JSON，通过DOM将新数据呈递显示，页面仅`局部刷新`。

必须在服务器上运行，不能跨域（只能访问同域名下的文件）

所以我们首先要搭建服务器，当然，我们这里有一款软件可以给我们搭建服务器 WampServer，只需要安装好，运行就可以了，我们可以在浏览器中输入  localhost或者127.0.0.1  就可以访问到软件目录里的www里面的内容，如果在www里面还有内容我们只需要加 /目录 就可以访问到里面的内容

 

### 1.1.2 ajax中的异步

浏览器执行到Ajax代码这行语句，发出了一个HTTP请求，欲请求服务器上的数据。服务器的此时开始I/O（输入/输出），需要花一些时间，所以不会立即产生下行HTTP报文。简单的说，就是发送请求以后不会立即返回结果。

由于Ajax是异步的，所以本地的JavaScript程序不会停止运行，页面不会假死，不会傻等下行HTTP报文的出现。后面的JavaScript语句将继续运行。

服务器I/O结束，将下行HTTP报文发送到本地。此时，回调函数将执行。回调函数中，将使用DOM更改页面内容。

 

## 1.2   通过ajax拿取数据

##### 一个完整的ajax执行过程：

```javascript
document.onclick = function () {
    var xhr = new XMLHttpRequest(); //创建一个XMLHTTPRequest对象  XMLHTTPRequest对象是一个内置对象 这个对象就是用来发起XML的HTTP请求的
    xhr.open('get' , '01-test.txt' , true);    //准备发送数据 第一个参数表示请求的方式    第二个表示文件的路径  第三个是否异步 异步true
    xhr.send();    //发送请求
    //当状态码改变的时候触发的事件   状态码为4表示请求处理完成
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4){
            alert( xhr.responseText );  //responseText 为拿取到的文本
        }
    };
};
```



### 1.2.1 XMLHttpRequest对象

Ajax请求都是通过内置的`XMLHttpRequest`来实现的，这是浏览器的内置对象

#### 1.2.1.1 XMLHttpRequest对象的创建

创建一个`XMLHTTPRequest`对象  XMLHTTPRequest对象是一个内置对象 这个对象就是用来发起XML的HTTP请求的

```javascript
var xhr = new XMLHttpRequest(); //创建一个XMLHTTPRequest对象  XMLHTTPRequest对象是一个内置对象 这个对象就是用来发起XML的HTTP请求的
```



#### 1.2.1.2 open()方法和send()方法

它接受三个参数：

- 要发送的请求的类型（get、post）、

- 请求的URL

- 表示是否异步的布尔值(异步true，默认true)。

##### 1、open方法表示配置：

```javascript
xhr.open('get' , '01-test.txt' , true);    //准备发送数据 第一个参数表示请求的方式    第二个表示文件的路径  第三个是否异步 异步true，调用open方法并不会真正发送请求，而只是启动一个请求以备发送。
```



##### 2、send()

要发送特定的请求，需要调用`send()`方法。它接受一个参数，即要作为请求主体发送的数据。如果不需要通过请求主体发送数据，则必须传入`null`，不能留空。

```javascript
xhr.send(null);    //发送请求
```

 

### 1.2.1.3 readyState 状态码

`.onreadystatechange` 当`readystate`发生改变的时候触发

##### .readyState 状态码：

- 0 ：请求还没有建立（open执行之前）；

- 1 ：请求建立了，但是还没有发送（open刚执行）；

- 2 ：请求正式发送了（send执行了）；

- 3 ：请求已经受理，有一部分数据已经可用，但是还没有完全处理完；

- 4 ：请求完全处理完成。

##### .responseText

请求的页面返回的字符串数据

## 1.3 GET和POST方式发送数据

首先来看一个PHP文件,大致的意思就是以POST方式接收

```php
<?php
    header("Content-type: text/html; charset=utf-8");
    $a = $_GET['user'];
    $b = $_GET['pwd'];
    echo "我是一个PHP页面！请求方式为POST，接受到的user为：{$a} ，接收到的pwd为： {$b} 。";
?>
```

- `header("Content-type: text/html; charset=utf-8")`	编码格式

- `echo为`输出
- {变量}

### 1.3.1表单中发送数据的 GET方式和POST方式

```html
<form action="get.php" method="get">
     用户名：<input type="text" name="user">
     密码：<input type="text" name="pwd">
     <button>提交</button>
 </form>
```


当使用get方式给后台发送数据的时候的格式：

```javascript
http://localhost/ajax/get.php?user=小阳&pwd=123
```

我们可以看见，后面会显示发送的内容，这样安全性较低。

```shell
url?user=小阳&pwd=123
```

而POST方式的时候却不会有后缀，并且我们可以发现表单在发送数据的时候会跳转页面。

### 1.3.2 ajax中的发送数据的GET方式和POST方式

#### 1.3.2.1 GET方式

```javascript
document.onclick = function() {
    //Ajax那一些公式
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText); //获取后台传过来的数据
        }
    };
    var URL = 'get.php?user=小阳&pwd=123';
    xhr.open("get", URL, true);
    xhr.send();
}
```

我们也可以发现ajax在发送数据和获取到数据的时候不会刷新页面

#### 1.3.2.2 POST方式

```javascript
xhr.open("post",'post.php',true); //第二个参数是发送的地址
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//POST方式请求头
xhr.send('user=123&pwd=123');  //请求实体仍然是罗列字符串的方式：
```

和GET方式不同的是，POST方式需要一个介于open和send之间的请求头，open的第二个参数不再是链接拼接上传输的内容，而只是一个简单的发送地址，而send变为了发送的内容，且请求实体仍然是罗列字符串的方式

------





## 1.4 拿取数组、JSON数据

- `JSON.parse()`：将字符串的JSON转为JSON，只认识属性和值都加引号的，如果不是json格式的字符串将不会被转

- `JSON.stringify()` ：将JSON转换为字符串的JSON

下面我们来获取data.txt里面的数组、JSON格式的数据，注意：

```javascript
[
{
    "name" : "小阳",
    "age" : 18,
    "sex" : "男"
},
    {
        "name" : "小阳",
        "age" : 18,
        "sex" : "男"
    },
    {
        "name" : "小阳",
        "age" : 18,
        "sex" : "男"
    }
]
```

我们要将拿到的数据放到ul里面

```html
<div class="box">
    <ul></ul>
</div>
```

```javascript
ajax();
setInterval(ajax,3000);       //每3秒刷新一次
function ajax() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            var data = JSON.parse(xhr.responseText); //后台传过来的数据为字符串类型需要转换为JavaScript代码
            console.log(data);
            var oUl = document.querySelector('.box ul');
            oUl.innerHTML = '';
            for( var i=0; i<data.length; i++ ){
                var aLi = document.createElement('li');
                aLi.innerHTML = '姓名：' + data[i].name + '&nbsp;&nbsp;年龄：' + data[i].age + '&nbsp;&nbsp;性别：' + data[i].sex;
                oUl.appendChild(aLi);
            }
        }

    }
    xhr.open("post",'json.txt',true); //第二个参数是发送/接收的地址
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); //请求头
    xhr.send(null);
}
```



## 1.5 封装ajax

### 1.5.1 整体代码

##### 参数：

- `type`: 发送数据的方式 默认为`get`  可选择 `post` 不区分大小写

- `url`:  发送或者接受数据的地址

- `data`: 发送的数据 可以为json格式也可以为 `'user=123&pwd=123'`  字符串格式 选填

- `success`: 发送或者请求成功以后可以执行的操作 选填

- `error`: 请求失败以后执行的操作 选填（若不填，在请求失败后会弹出状态码）

```javascript
function ajax(myJson) {
    var type = myJson.type || 'get';   //如果用户传了类型即为用户传入的，如果没传则默认为get
    var url = myJson.url;         //发送或者接受数据的地址
    var data = myJson.data;       //发送的数据
    var success = myJson.success;  //发送或者请求成功以后可以执行的操作
    var error = myJson.error;     //请求失败以后执行的操作

    /*当用户data是以json的格式传进来的情况下*/
    if (typeof data === 'object') {
        var str = '';
        for (var k in data) {
            str += k + '=' + data[k] + '&';  //将所有的data里的值用&拼接
        }

        /*加时间戳防止缓存*/
        data = str + '_=' + new Date().getTime(); //new Date().getTime() 从 1970/01/01 至今的毫秒数

        /*当用户是字符串形式传入*/
    }else{
        data += + '_=' + new Date().getTime(); //用string形式传数据
    }

    /*当用户以get方式传入的时候的url格式*/
    if (data && /^get$/i.test(type))url += '?' + data;

    //Ajax那一些公式
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            /*当状态码大于200小于300的时候为请求成功*/
            if (xhr.status >= 200 && xhr.status < 300) {
                success && success(xhr.responseText);
            }else{
                error ? error(xhr.status) : alert('访问出错，错误代码：' + xhr.status);
            }
        }
    };
    xhr.open(type, url, true); //以get方式
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //post方式 请求头
    xhr.send(data); //当为POST方式的时候需要在send中传入字符串类型的data
}
```



### 1.5.2封装思路

#### 1.5.2.1  用户会传入什么参数？

- type: 发送数据的方式 默认为get  可选择 post 不区分大小写

- url:  发送或者接受数据的地址

- data: 发送的数据 可以为json格式也可以为 'user=123&pwd=123' 字符串格式 

- success: 发送或者请求成功以后可以执行的操作 

- error: 请求失败以后执行的操作 选填（若不填，在请求失败后会弹出状态码）

 ```javascript
ajax({
    'type' : 'get',
    'url' : 'get.php',
    'async' : 'true',
    'data' : {
        'user' : 'Daniel',
        'pwd' : '123'
    },
    'success' : function (msg) {
        console.log(msg);
    },
    'error' : function (status) {
        alert('访问出错，错误代码：' + status);
    }
});
function ajax(myJson) {
    var type = myJson.type || 'get';   //如果用户传了类型即为用户传入的，如果没传则默认为get
    var url = myJson.url;            //发送或者接受数据的地址
    var async = myJson.async || true;  //是否异步
    var data = myJson.data;       //发送的数据
    var success = myJson.success;  //发送或者请求成功以后可以执行的操作
    var error = myJson.error;     //请求失败以后执行的操作
}
 ```

在确定参数以后我们就需要一步一步的去实现：

#### 1.5.2.2 当用户是以json的格式传进来的情况下：

我们要将data变为我们需要的字符串格式，那么我们就需要先遍历json然后拼接，最后加一个时间戳防止IE9以下的缓存问题

```javascript
if (typeof data === 'object') {
    var str = '';
    for (var k in data) {
        str += k + '=' + data[k] + '&';  //将所有的data里的值用&拼接
    }

    /*加时间戳防止缓存*/
    data = str + '_=' + new Date().getTime(); 		//new Date().getTime() 从 1970/01/01 至今的毫秒数
```



#### 1.5.2.3  当用户是字符串形式传入，我们就不需要去拼接了：

只需要加一个时间戳就行了

```javascript
}else{
    data += + '_=' + new Date().getTime(); //用string形式传数据
}
```

 

#### 1.5.2.4 当用户以get方式传入的时候的url格式：

我们也需要拼接，同时还需要不区分大小写

```javascript
if (data && /^get$/i.test(type))url += '?' + data;
```



##### 5. 最后就是我们的哪些ajax的公式

```javascript
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        /*当状态码大于200小于300的时候为请求成功*/
        if (xhr.status >= 200 && xhr.status < 300) {
            success && success(xhr.responseText);
        }else{
            error ? error(xhr.status) : alert('访问出错，错误代码：' + status);
        }
    }
};
xhr.open(type, url, async);     //以get方式
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //post方式请求头
xhr.send(data); //当为POST方式的时候需要在send中传入字符串类型的data
```

 `http状态码`：HTTP状态码（HTTP Status Code）是用以表示网页服务器HTTP响应状态的3位数字代码。它由 RFC 2616 规范定义的，并得到RFC 2518、RFC 2817、RFC 2295、RFC 2774、RFC 4918等规范扩展，说了那么多，我们只需要知道，当状态码`大于200小于300`的时候为请求成功。

```javascript
xhr.status
```



## 1.6 jQuery里的ajax

使用：

```javascript
$.ajax({
    type : 'get',
    url : 'data.txt',
    data : {
        "user" : "小阳",
        "pwd" : "123"
    },
    context : document,
    dataType : 'json',
    success :function (msg) {
        console.log( msg );
    }
})
```

- `context `： 改变success里的回调函数this指向

- `dataType`  ：将拿到的数据转换为json格式 注意：json格式的txt文件必须要特别严格，最后一个json后面不能多一个逗号，并且属性必须双引号

- `success `：请求成功以后执行的操作，第一个参数为拿取到的数据

也可以单独的调用get和post函数

```javascript
$.get('data.txt', 'user=小阳&pwd=123', function (msg) {
    console.log(msg);
},'json');
```

- 第一个参数是url

- 第二个参数是传输的数据

- 第三个是回调函数，函数里面的第一个参数依旧是返回的数据

- 第四个参数是将json格式字符串转换为json格式

 