#git 使用
* smartgit 试用过期以后文件破解目录  %APPDATA%\syntevo\SmartGit 删除 setting.xml 目文件
* git本地公钥生成命令 `$ ssh-keygen -t rsa -C "17xxxxx30@qq.com"` 一路next 下去
* git 提交禁止esLint 校验 git add . && git commit --no-verify -m "代码规范强制提交测试"
* [git 常见操作命令](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
* [git 操作文档2](https://www.jianshu.com/p/65e9c799fe2c)
### git 删除本地分支和远程分支
```
    git 删除本地分支
    git branch -D branchName 
 
    git 删除远程分支
    git branch -r -d origin/branchName
    git push origin :branchName

```