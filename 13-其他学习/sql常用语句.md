### 检索数据

```
检索单个列：
SELECT pname FROM product
 
检索多个列：
SELECT pname,market_price,is_hot FROM product
 
检索所有列：
SELECT * FROM product
 
过滤检索结果中的重复数据：
SELECT DISTINCT market_price FROM product
DISTINCT关键字：
1、返回不同的值，使用时放在列名的前面
2、多查询一个及以上列时，除非你查询的所有列的数据都不同，否则所有行都将被检索出来
 
限制检索结果：
SELECT pname FROM product LIMIT 5,5
limit5,5指示mysql返回从行5开始的5行记录
```



### 排序检索数据

```
排序数据
SELECT pname FROM product ORDER BY pname
 
按多个列排序数据
SELECT pid,market_price,pname FROM product ORDER BY market_price,pname
按多个列排序时，排序列之间用,隔开，并且按列的顺序来排序数据，先排价格，后排名称
 
指定排序方向
降序排序(按照价格降序排序)
SELECT pid,market_price,pname FROM product ORDER BY market_price DESC
 
升序排序(mysql查询时默认就是升序排序)
SELECT pid,market_price,pname FROM product ORDER BY market_price ASC
 
找出价格最贵的商品(使用order BY 和limit关键字)
SELECT market_price FROM product ORDER BY market_price DESC LIMIT 1
```



### 过滤数据

```
使用WHERE子句
 
价格等于19800的商品
SELECT pname,market_price FROM product WHERE market_price=19800
 
价格小于于19800的商品
SELECT pname,market_price FROM product WHERE market_price<19800
 
价格大于800的商品
SELECT pname,market_price FROM product WHERE market_price>800
 
价格在800到10000之间
SELECT pname,market_price FROM product WHERE market_price BETWEEN 800 AND 10000
 
where中的操作符有以下几个
=  等于
<> 不等于
!= 不等于
<  小于
<= 小于等于
>  大于
>= 大于等于
BETWEEN 在指定的两个值之间
```



### 数据过滤

```
组合where语句
 
and操作符(同时符合where后面的条件)
SELECT pname,market_price FROM product WHERE  market_price>1000 AND is_hot=0
 
or操作符(只需要符合where后面的一个条件的结果都会显示出来)
SELECT pname,market_price FROM product WHERE  market_price>1000 OR is_hot=0
 
IN操作符(用来指定条件范围)
SELECT pname,market_price FROM product WHERE market_price IN(238,19800,1120) ORDER BY pname
 
NOT操作符(否定它之后所跟的条件)
SELECT pname,market_price FROM product WHERE market_price NOT IN(238,19800,1120) ORDER BY pname
```



### 用通配符进行过滤

```
like操作符(通配符 模糊搜索)
 
%通配符(找出product表中所有商品名以韩版开头的商品)
SELECT pname FROM product WHERE pname LIKE '韩版%'
 
找出product表中商品名称含有“女”的商品，不管开头结尾是什么内容
SELECT pname FROM product WHERE pname LIKE '%女%'
 
下划线_通配符(用途和%一样,不过_只匹配单个字符)
 
SELECT pname,market_price FROM product WHERE market_price LIKE '_99'
```



### 正则表达式搜索

```
基本字符串匹配
 
SELECT pname FROM product WHERE pname REGEXP '韩版' ORDER BY pname
使用正则表达式需要用REGEXP关键字，并在REGEXP后面跟上正则表达式内容
 
SELECT pname FROM product WHERE pname REGEXP '.版' ORDER BY pname
.是正则表达式语言中一个特殊的字符。它表示匹配任意一个字符
 
Mysql中的正则表达式不区分大小写，如果要区分大小写可以使用BINARY
SELECT pname FROM product WHERE pname REGEXP BINARY 'Abc' ORDER BY pname
 
OR匹配
SELECT pname FROM product WHERE pname REGEXP 'a|b'
 
几种常见的正则表达式
[0-9]     匹配0-9之间的数字
[123] Ton 匹配1 Ton或者2 Ton或者3 Ton
\\.       匹配特殊字符.
[:alnum:] 任意字母和数字（同[a-zA-Z0-9]）
[:alpha:] 任意字符（同[a-zA-Z]）
[:blank:] 空格和制表（同[\\t]）
[:cntrl:] ASCII控制字符（ASCII 0到31和127）
[:digit:] 任意数字（同[0-9]）
[:graph:] 与[:print:]相同，但不包括空格
[:LOWER:] 任意小写字母（同[a-z]）
[:print:] 任意可打印字符
[:punct:] 既不在[:alnum:]又不在[:cntrl:]中的任意字符
[:SPACE:] 包括空格在内的任意空白字符（同[\\f\\n\\r\\t\\v]）
[:UPPER:] 任意大写字母（同[A-Z]）
[:xdigit:] 任意十六进制数字（同[a-fA-F0-9]）
 
 
匹配多个实例
* 0个或多个匹配
+ 1个或多个匹配（等于{1,}）
? 0个或1个匹配（等于{0,1}）
{n} 指定数目的匹配
{n,} 不少于指定数目的匹配
{n,m} 匹配数目的范围（m不超过255）
 
 
定位符
^ 文本的开始
$ 文本的结尾
[[:<:]] 词的开始
[[:>:]] 词的结尾
```



### 创建计算字段

```
连接字段(将商品名称和商品价格连接起来)
SELECT CONCAT(pname,'(',market_price,')') FROM product ORDER BY pname
CONCAT()需要一个或多个指定的串，各个串之间用逗号分隔。
 
AS 给字段赋予别名
SELECT CONCAT(pname,'(',market_price,')') AS nameAndPrice FROM product ORDER BY pname
 
执行算术运算
SELECT pname,market_price,shop_price,market_price+shop_price AS sumprice FROM product
```



### 使用数据处理函数

```
文本处理函数
LEFT() 返回串左边的字符
LENGTH() 返回串的长度
LOCATE() 找出串的一个子串
LOWER() 将串转换为小写
LTRIM() 去掉串左边的空格
RIGHT() 返回串右边的字符
RTRIM() 去掉串右边的空格
SOUNDEX() 返回串的SOUNDEX值
SUBSTRING() 返回子串的字符
UPPER() 将串转换为大写
 
 
日期和时间处理函数
ADDDATE() 增加一个日期（天、周等）
ADDTIME() 增加一个时间（时、分等）
CURDATE() 返回当前日期
CURTIME() 返回当前时间
DATE() 返回日期时间的日期部分
DATEDIFF() 计算两个日期之差
DATE_ADD() 高度灵活的日期运算函数
DATE_FORMAT() 返回一个格式化的日期或时间串
DAY() 返回一个日期的天数部分
DAYOFWEEK() 对于一个日期，返回对应的星期几
HOUR() 返回一个时间的小时部分
MINUTE() 返回一个时间的分钟部分
MONTH() 返回一个日期的月份部分
NOW() 返回当前日期和时间
SECOND() 返回一个时间的秒部分
TIME() 返回一个日期时间的时间部分
YEAR() 返回一个日期的年份部分
 
 
数值处理函数
ABS() 返回一个数的绝对值
COS() 返回一个角度的余弦
EXP() 返回一个数的指数值
MOD() 返回除操作的余数
PI() 返回圆周率
RAND() 返回一个随机数
SIN() 返回一个角度的正弦
SQRT() 返回一个数的平方根
TAN() 返回一个角度的正切
```



### 汇总数据

```
聚集函数
AVG() 返回某列的平均值
COUNT() 返回某列的行数
MAX() 返回某列的最大值
MIN() 返回某列的最小值
SUM() 返回某列值之和
 
SELECT AVG(market_price) FROM product
 
SELECT MAX(market_price) FROM product
 
SELECT SUM(market_price) FROM product
```



分组数据

```
分组函数
GROUP BY 按照名称分组，查询出表中相同名称的商品各有多少件
SELECT pname,COUNT(*) FROM product GROUP BY pname
 
HAVING 过滤分组
SELECT pname,COUNT(*) FROM product GROUP BY pname HAVING COUNT(*)>2
 
HAVING和WHERE的差别 这里有另一种理解方法，WHERE在数据
分组前进行过滤，HAVING在数据分组后进行过滤。这是一个重
要的区别，WHERE排除的行不包括在分组中。这可能会改变计
算值，从而影响HAVING子句中基于这些值过滤掉的分组。
 
SELECT语句的执行顺序
 
SELECT 要返回的列或表达式 是
FROM 从中检索数据的表 仅在从表选择数据时使用
WHERE 行级过滤 否
GROUP BY 分组说明 仅在按组计算聚集时使用
HAVING 组级过滤 否
ORDER BY 输出排序顺序 否
LIMIT 要检索的行数 否
```

