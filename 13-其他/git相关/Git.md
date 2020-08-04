# Git相关



## 提交项目到Git

### 提交到本地仓储

- 相关命令

```js
git init // 初始化文件
git status	// 文件状态，标红的为未提交文件
git add .	// 将文件放入栈存区，成功以后再执行 git status 文件会变成绿色
git commit -m '第一次提交'	//提交文件，此时再执行 git status 显示“On branch master nothing to commit, working tree clean”
```

### 托管到码云

- 在码云创建好项目以后会生成一下两个命令，执行就可以了

```js
git remote add origin https://gitee.com/xiaoyang18698193/test.git
git push -u origin master
```











































