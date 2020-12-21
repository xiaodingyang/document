### Token的特点

> - 随机性
> - 不可预测性
> - 时效性
> - 无状态、可扩展



### 基于Token的身份验证方法

> - 客户端使用用户名和密码请求登录
> - 服务端收到请求，验证登录是否成功
> - 验证成功后，服务端会返回一个Token给客户端，反之，返回身份验证失败的信息
> - 客户端收到Token后把Token用一种方式(cookie/localstorage/sessionstorage/其他)存储起来
> - 客户端每次发起请求时都将Token发给服务端
> - 服务端收到请求后，验证Token的合法性，合法就返回客户端所需数据，反之，返回验证失败的信息



### JWT(Json Web Tokens)

生成Token的解决方案有许多，常用的一种就是 ***Json Web Tokens*** .

JWT标准的Tokens由三部分组成

1. header
2. payload
3. signature

中间使用 " . " 分隔开，并且都会使用Base64编码方式编码,如下

```javascript
eyJhbGc6IkpXVCJ9.eyJpc3MiOiJCIsImVzg5NTU0NDUiLCJuYW1lnVlfQ.SwyHTf8AqKYMAJc
```

#### header

header 部分主要是两部分内容，一个是 Token 的类型，另一个是使用的算法，比如下面类型就是 JWT，使用的算法是 Hash256。

```json
{
  "typ": "JWT",
  "alg": "HS256"
}
```

#### payload

Payload 里面是 Token 的具体内容，这些内容里面有一些是标准字段，你也可以添加其它需要的内容。下面是标准字段：

> - iss：Issuer，发行者
> - sub：Subject，主题
> - aud：Audience，观众
> - exp：Expiration time，过期时间
> - nbf：Not before
> - iat：Issued at，发行时间
> - jti：JWT ID

比如下面

```json
{
 "iss": "ninghao.net",
 "exp": "1438955445",
 "name": "wanghao",
 "admin": true
}d
```

#### signature

JWT 的最后一部分是 Signature ，这部分内容有三个部分，先是拼接 Base64 编码的 header.payload ，再用不可逆的Hamc加密算法加密，加密时使用一个密钥，这个密钥服务端保存，生成signature。

最后组合token，如下

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpc3MiOiJuaW5naGFvLm5ldCIsImV4cCI6IjE0Mzg5NTU0NDUiLCJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlfQ.
SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc
```

客户端收到这个 Token 以后把它存储下来，下回向服务端发送请求的时候就带着这个 Token 。服务端收到这个 Token ，然后进行验证，通过以后就会返回给客户端想要的资源。



具体参考：https://ninghao.net/blog/2834



### 示例

新建token.js，里面包含创建和验证token的函数

```js
const jwt = require("jsonwebtoken");
const ResModels = require("../model/resModels");

// 密钥
const secret = "secret";
var token = {
  createToken: function (data) {
    // Token 数据 data为自定义数据，我这里data为用户登录信息
    const payload = data;
    // 签发 Token
    const token = jwt.sign({ ...payload }, secret, { expiresIn: 24 * 3600 }); // exporesIn为过期时间，单位：ms/h/days/d  eg:1000, "2 days", "10h", "7d"
    return token;
  },
  checkToken: function (token, res, next) {
    // 验证 Token 把要验证的 Token 数据，还有签发这个 Token 的时候用的那个密钥告诉 verify 这个方法，在一个回调里面有两个参数，error 表示错误，decoded 是解码之后的 Token 数据。
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        if (error.name === "JsonWebTokenError") {
          res.json(new ResModels({ message: "无效的token", status: 403 }));
          return;
        }
        if (error.name === "TokenExpiredError") {
          res.json(new ResModels({ message: "token已过期", status: 403 }));
          return;
        }
      }
      next();
    });
  },
};
module.exports = exports = token;
```

再创建一个中间件，拦截请求，验证token

```js
const { checkToken } = require("../utils/token");

module.exports = (req, res, next) => {
  const notCheckApi = ["/api/user/captcha", "/api/user/login"]; // token白名单（无需token验证的api）
  const isNext = notCheckApi.find((item) => item === req.url);
  if (isNext) {
    next();
    return;
  }
  // get方式不需要Token验证
  if (req.method !== "GET") {
    checkToken(req.headers.authorization, res, next);
    return;
  }
  next();
};
```

app.js中使用中间件

```js
app.use(loginCheck);
```



在生成token以后，将token返回给前端，前端将token存cookie或者session Storage，每次发送请求的时候带上这个token，后端再使用中间件验证token。

```js
const token = createToken(data);
// 向客户端设置一个Cookie
const userInfo = {
    ...data,
    token,
};
res.json(
    new resModels({
        data: userInfo,
        message: "登录成功！",
        status: 200,
    })
);
return;
} else {
    res.json(
        new resModels({
            data: [],
            message: "用户名或密码错误！",
            status: 403,
        })
    );
}
});
```

