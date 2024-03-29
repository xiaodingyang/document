## 1.1 HTTP和HTTPS是什么？

我们使用浏览器访问一个网站页面，在浏览器的地址栏中我们会看到一串URL，如图

![img](https://pics1.baidu.com/feed/3ac79f3df8dcd10089c3c49abb52f914b8122f0f.jpeg?token=0496ea7ba2b881d6df9e2e3dd8efeec7&s=28B6C812C572CE215CE39946020060F3)

网站的URL会分为两部分：**通信协议**和**域名地址**。

域名地址都很好理解，不同的域名地址表示网站中不同的页面，而通信协议，简单来说就是浏览器和服务器之间沟通的语言。网站中的通信协议一般就是**HTTP协议**和**HTTPS协议**。

### 1.1.1 HTTP协议

HTTP协议是一种使用明文数据传输的网络协议。一直以来HTTP协议都是最主流的网页协议，但是互联网发展到今天，HTTP协议的明文传输会让用户存在一个非常大的安全隐患。试想一下，假如你在一个HTTP协议的网站上面购物，你需要在页面上输入你的银行卡号和密码，然后你把数据提交到服务器实现购买。假如这个适合，你的传输数据被第三者给截获了，由于HTTP明文数据传输的原因，你的银行卡号和密码，将会被这个截获人所得到。现在你还敢在一个HTTP的网站上面购物吗？你还会在一个HTTP的网站上面留下你的个人信息吗？

![img](https://pics3.baidu.com/feed/730e0cf3d7ca7bcb469682e976d0d567f424a861.jpeg?token=7ca8f1a4d326804d7eff77228f70ace8&s=C8211F7088B151BB30CC24CB0100A0B2)

### 1.1.2 HTTPS协议

1. HTTPS协议可以理解为HTTP协议的升级，就是在HTTP的基础上增加了数据加密。在数据进行传输之前，对数据进行加密，然后再发送到服务器。这样，就算数据被第三者所截获，但是由于数据是加密的，所以你的个人信息让然是安全的。这就是HTTP和HTTPS的最大区别。

![img](https://pics3.baidu.com/feed/500fd9f9d72a605983f7f705e1ed8a9f023bba2c.jpeg?token=6d316f367a5aca68bd0e892c7632ec7f&s=8A215F201AB759A958CC00CC010070B0)

​	其实如果你足够细心，你会发现现在很多大型互联网网站，如百度、淘宝、腾讯很早就已经把HTTP换成HTTPS了。

![img](https://pics2.baidu.com/feed/77c6a7efce1b9d16c75661943b070a8b8e546494.jpeg?token=4e51c3b48be874a310d6a84609abb459&s=04106C324D624D2048FCD4CB0100E0B3)



2. 数据加密传输，是HTTP和HTTPS之间的本质性区别，其实除了这个之外，HTTPS网站和HTTP网站还有其他地方不同。

   当你使用Chrome浏览器访问一个HTTP网站的时候，你会发现浏览器会对该HTTP网站显示“不安全”的安全警告，提示用户当前所访问的网站可能会存在风险。

![img](https://pics0.baidu.com/feed/5ab5c9ea15ce36d33fe05084f12a8483eb50b1f9.jpeg?token=6e1d84f1505aa34ea527fef09ea9557e&s=04506D324D66FF2042D9C4CB010070B1)

​		而假如你访问的是一个HTTPS网站时，情况却是完全不一样。你会发现浏览器的地址栏会变成绿色，企业名		称会展示在地址栏中，地址栏上面还会出现一把“安全锁”的图标。这些都会给与用户很大的视觉上的安全体		验。以下是EV证书在不同浏览器中的展现。

![img](https://pics1.baidu.com/feed/e61190ef76c6a7ef69cec03937231155f2de6627.jpeg?token=5a83a4ce6fcc1040e82ae5fa11f78205&s=49CFC4121F1A404948F500DB0000D0B2)

3. 除了浏览器视觉上不同以外，HTTPS网站和HTTP网站还有一个很重要的区别，就是对搜索排名的提升，这也是很多站长所关注的地方。

   百度和谷歌两大搜索引擎都已经明确表示，HTTPS网站将会作为搜索排名的一个重要权重指标。也就是说HTTPS网站比起HTTP网站在搜索排名中更有优势。

   HTTPS网站相比起HTTP网站拥有着多种的优势，HTTP明显已经不能适应当今这个互联网时代，可以预见到HTTP在不久的将来将会全面被HTTPS所取代。

4. http和https使用完全不同的连接方式，同时使用的端口也不同，http时候用80端口，https使用443端口。

5. https协议需要申请证书，一般免费证书很少，需要交费，Web服务器启用 SSL 需要获得一个服务器证书并将该证书与要使用 SSL 的服务器绑定。

总结 https与http不同：：

> - 前者加密传输，更安全。
> - 前者默认端口443，后者80
> - 前者需要认证证书，后者不需要
> - 在网络模型中，前者工作在传输层，后者工作与在应用层
> - 前者引擎搜索优先