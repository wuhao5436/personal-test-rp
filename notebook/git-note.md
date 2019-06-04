# git 和 svn 的比较
* svn subversion 集中化的版本控制系统， 有一台集中管理的服务器，所有客户端都和这个服务器交互，缺点如果服务器宕机或者数据丢失，文件没有备份的情况下风险较高
    * svn 的工作需要网络的联系，svn的保存逻辑是一组文件随着时间积累的变化
    * git 的工作可以在脱离网络的情况下commit ，也可以比较之前的某个版本，而这些版本信息都是保存在本地的，无需网络，git记录版本的逻辑，是每次commit是一次全量的快照。并保存这个快照的索引。
* git 分布式版本控制系统， 每一次的clone是一次对代码库的完整备份

# git 文件的三种状态
* git 文件有三种状态 committed staged modified
* 对应git的三个工作区 的概念 git仓库 暂存区 工作区

# git 文件的配置
* git 文件在根目录下会有一份配置 /etc/gitconfig 或 ~/.gitconfig
    * --global代表读写全局的问题
* git 在项目文件下理应也有一份配置 .git/cofnig
* 每一个级别覆盖上一个级别的配置 .git/config 会覆盖 /etc/gitconfig 的文件
* git config list 会检索每一级的配置，同名配置级别高的覆盖级别低的
* git config <key> 来检查git的某一项配置  git config user.name

#git 使用

## 首先配置你的用户信息
```
git config --global user.name 'john'
git config --global user.email john@163.com 
```
* git init 
* git clone
    * git clone 注意和 checkout 的区别，clone 是把整个git 项目的，所有版本，所有提交全部clone下来了，整个clone是一个完整的镜像，如果服务器的git 数据库丢失完全可以用本地的镜像恢复服务器的git项目
    * git clone https://github.com/libgit2/xxx 会在本地创建一个xxx的目录，如果你想自定义目录名字，在这条命令的后面添加 my_project 目录
* gitignore
    * 所有空行或者以#开头的会被忽略，常见的是各种注释
    * 使用glob模式匹配（shell所使用的简化正则表达式）
    * 匹配模式以(/)开头，防止递归
    * 匹配模式以(/)结尾指定目录
    * !取反
        * glob 模式
        * (*) 匹配任意多个字符
        * (?) 只匹配一个字符
        * [0-9] 匹配0到9的数字
        * (**) 匹配任意中间目录
* git diff 可以查看未暂存的文件的变化
    * git diff --cached 可以查看已经暂存的文件的变化  
    * git difftool --tool-help 可以查看系统可以使用的git diff 插件   

* git commit 会启动默认文本编辑器
    * git config --global core.editor 可以指定编辑软件
    * git commit -a -m 'bug fix xxx' 在commit 加上-m可以省略git add 的操作，直接把跟踪的文件提交
* git 移除文件
    * rm 本地移除动作
    * 在git rm  本地工作区删除文件 + 缓存区删除文件，例如  git rm user.log 可以删除git对文件的跟踪
    * 如果不小心把日志文件，或者某一类很大的文件传上去了，仓库不需要，但是你的本地需要可以使用命令 git rm --cached user.log ，commit掉以后仓库的文件就会删除掉
    * git rm log/\*log 可以移除log目录下的所有文件
    * git rm \*.txt 可以移除所有已txt结尾的文件（包括文件夹下的）
    * -- -f 没搞懂是什么意思 --
* git 移动文件
    * git mv a.js b.js 等于下面几条命令
        * mv a.js b.js
        * git rm a.js
        * git add b.js
* git log 日志系统 很好很强大
    * git log -2 显示最近的两次提交
    * git log -p -2 现在最近两次提交每次的差异
    * git log --stat 查看提交的简略统计信息
    * git log --pretty=oneline 格式化提交日志还可以是short,full,fuller
    * 更加牛逼的是format工具 git log --pretty=format:"%h -%an"
    
        |选项 | 说明|
        |-|-|
        |%H  | commit 的完整hash|
        |%h  | commit 的简短hash|
        |%an  | 文件作者 |
        |%cn  | 文件提交者 |
        |%s  | 提交的commit信息 |



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
