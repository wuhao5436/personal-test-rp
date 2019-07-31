# python
### 资料 
* 要学些什么 https://www.imooc.com/article/36516
### print
* print('aa', 'bb')  // aa bb
* print('aa', 'bb', sep='-', end='#') // aa-bb#

### 注释
* 单行注释 #
* 多行注释
```
'''
注释1
注释2
注释3
'''
"""
注释1
注释2
注释3
"""
```

### 换行
print('aaaaaaaaaaaaaa\
bbbbbbbb')

### 单引号和双引号混合使用
* print("""  a‘’“”''""a """)或者print(('''  a‘’“”''""a    ''')) -> a‘’“”''""a

### 特殊字符处理
* print('\\n') 输出\n
* print('\\') 输出\
* 在字符串前面加上r或者R 那么不会转义字符串

### python的数学计算

运算符 | 举例 | 描述
--- | --- | ---
 \+ | 1+2 = 3
 \- | 2-1 =1
 \* | 2*2 =4
 \- | 6/2 =3
 \** | 2**3 = 8 | 乘方
 \% | 13%5 =3 | 取余
 \// | 20//6 | 取整
 round | round(5.9) -> 6 <br/>  round(5.9.1, 1) -> 5.9 | 取整，默认取到整数位，后面的参数可以设置取到第几位
 abs | abs(-1) -> 1 | 取绝对值
 \* | 以下的是属于math函数的 首先要import math
 math.ceil | match.ceil(2.00001) -> 3 | 向上取整
 math.floor | match.floor(2.9999999) -> 2 | 向下取整
 match.trunc | match.trunc(2.9883) -> 2 | 截取整数位
 math.pow | match.pow(3,2) -> 9 | 幂运算

