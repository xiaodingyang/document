# linux 下redis启动命令

如果不知道redis-server文件位置输入如下命令查询位置

```
find / -name redis-server
```

查询到目录以后，cd切换到此目录执行redis-server，如：

```
/usr/local/bin/redis-server
```

查看是否启动成功：

```
netstat -nplt
```