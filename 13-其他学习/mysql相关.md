# node 连接 mysql 报错

node 连接 mysql 报错

```json
{
    "code": "ER_NOT_SUPPORTED_AUTH_MODE",
    "errno": 1251,
    "sqlMessage": "Client does not support authentication protocol requested by server; consider upgrading MySQL client",
    "sqlState": "08004",
    "fatal": true
}
```

因为mysql8.0默认的密码认证方案是'caching_sha2_password'，而目前node默认的密码认证方案是'mysql_native_password',所以即使密码是对的，但是却无法认证成功。

```txt
1、使用管理员运行命令提示符
2、进入到mysql安装目录的bin目录下默认安装路径大概是（C:\Program Files\MySQL\MySQL Server 8.0\bin）
3、在命令提示行中键入： mysql -u root -p 然后输入mysql密码验证
4、mysql> alter user 'root'@'localhost' identified with mysql_native_password by '想要设置的密码';
此时得到提示 Query OK, 0 rows affected (0.01 sec)，表示修改成功
5、mysql> flush privileges;此时得到提示Query OK, 0 rows affected (0.01 sec)，这里是重启权限
6、重启node服务，即可连接成功
```









