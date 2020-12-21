# mysql 8.0以上重置密码

```txt
1. cmd 切换到mysql运行目录：C:\Program Files\MySQL\MySQL Server 8.0\bin
2. 输入：mysqld --console --skip-grant-tables --shared-memory 
3. 新开窗口输入：mysql -uroot -p 回车登录即可（不需要输入密码）
4. 设置新密码 ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';
```

