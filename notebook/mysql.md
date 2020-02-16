### 语法规范
* 关键字和函数名称全部大写
* 数据库名称 表名称  字段名称 全部小写
* SQL语句必须以;结尾
* 创建提示语法 `{}`是必须的、 `|`是选择其中一项、`[]` 是指可选的

### 数据库编码修改
* 修改默认配置，创建时不需要指定(windows下)[ubantu下](https://www.cnblogs.com/kerrycode/p/9749096.html)
  1. 安装目录下打开my.ini 配置文件
  1. 找到 `[mysql]` , `dafault-character-set ` 修改为 `utf8` 
  1. 找到 `[mysqld]` ,`dafault-character-set ` 修改为 `utf8` 
  1. 重新启动 `net stop mysql`, `net start mysql`
* 创建过程中可以指定数据库编码
```mysql
CREATE DATABASE t1 CHARACTER SET = utf8;
```
* 创建完成以后可以修改数据库编码
```mysql
ALTER DATABASE t1 CHARACTER SET = utf8;
```
* 查看创建信息
```mysql
SHOW CREATE DATABASE t1;
```

### 常规操作
* mysql -u root -p 用户登录
* PROMPT 修改mysql提示符 可选参数如下

可选符号 | 意义
---|---
\D | 日期
\d | 当前数据库
\h | 服务器名称
\u | 当前用户

* 删除数据库 DROP DATABASE t1;

### 数据类型
* 整型  TINYINT SMALLINT MEDIUMINT INI  BIGINT
* 浮点型 FLOAT DOUBLE
* 时间戳 YEAR TIME  DATE DATETIME TIMESTAMP
* 字符型 CHAR(M) VARCHAR(M) TINYTEXT TEXT MEDIUMTEXT LONGTEXT ENUM SET(最多64个，在集合中做任意的排列组合)

### 数据表
* 创建数据表
```mysql
CREATE TABLE IF NOT EXISTS table1 (
    column_name data_type,
)
```
* 空值(NULL)(默认允许为空)与非空(NOT NULL)
```mysql
CREATE TABLE IF NOT EXISTS table1 (
    column_name data_type NOT NULL,
    column_name data_type NULL,
)
```
* AUTO_INCREMENT 自增(必须在主键上 PRIMARY KEY 或 KEY)
  * 每张表只能有一个主键
  * 主键自动为NOT NULL
```mysql
CREATE TABLE IF NOT EXISTS table1 (
    id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
)
```

* UNIQUE KEY (唯一约束)
  * 可以保证记录的唯一性
  * 可以为空，一张表中可以有多个
```mysql
CREATE TABLE IF NOT EXISTS table1 (
    id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
)
```  

* 查看数据表结构
```mysql
SHOW COLUMNS FROM tb1;
```
* 插入数据
```mysql
INSET t1 [(col_name, ...), VALUES(val, ...) ]

INSET t1 VALUES('jack', 18, 2000.23);
INSET t1 (username, salary) VALUES('Tom', 3681.23);
```


