在mysql中SQL语句有一个为limit的条件筛选，limit中如果只传递一个值，则表示获取的条数，如果传递两个值则表示从第几条记录到第几条，如下：

> limit 10 //这里是需要从数据库读出10条数据
> limit 2,10 //这里这是从数据库中第3条数据开始取10条数据

### 使用limit实现分页

此方法不推荐，因为看上去不那么高大上

```js
var init_page=1;//默认页码为1
var num = 10;//每页要显示的数据量
//假如有传递进来的页码，比如2，那么当前的init_page的值则更改为传递进来的值
if(req.query.page){
 init_page = parseInt(req.query.page);
}
var start=0;//设置起始数据为第一条
if(init_page>1){
 start = (init_page-1)*num; //页码减去1，乘以条数就得到分页的起始数了
}
var sql='select * from user limit'+start+','+num; //这里就获得了第一页的10条数据
```

这样我们就可以准确的获取到相关的数据了，但是这种方法并不想我吗自己想象的那样高大上，因为这种方法大多是数据库管理人员使用的，如果你是一个队代码质量要求很高的程序猿，那么我推荐使用下面的代码，这种代码不仅能体现出你的逻辑思维，并且使用下面的方法，可以做出很完美的resetfull api。

### 使用limit结合offset

这两个参数结合使用，将会是非常完美的结合啊。所以你以后妈妈再也不用担心你的分页代码了。
完美先来看一个sql，where 1=1 后面接筛选条件，然后接排序，最后接limit

```js
let sql = `select * from blogs  where 1=1 order by createdTime desc  limit 10 offset 0`
```

以上，这段代码中limit是查询10条数据，offset 0这是设置从第1条开始，如果我们要从第十条开始，则是offset 9
有了offset，我们就能够更好的对数据进行分页啦，如此一来想要利用express+mysql制作一个可以分页，并且可以设置每页数据量的api，那就超级容易了。
下面完美就来实现一个resetfull api，地址如下user?page=1&num=10（其中page就是分页的页码，num则是显示的条数）

```js
module.exports = {
  select: function (currentPage = 1, pageSize = 10) {
    return "limit " + pageSize + " offset " + (currentPage - 1) * pageSize;
  },
};
```

