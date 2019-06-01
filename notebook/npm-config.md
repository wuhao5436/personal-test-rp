# npm 使用
## npm config
> npm 查询源命令
* npm 修改制定的源 `npm config set registry " https://registry.npm.taobao.org " `
    * 设置过一次npm config 后会在文件中出现npmrc文件，可以进行全局的配置。
* 获取当前npm下载源 npm config get registry  
* 修改当前npm源地址（例如切换到taobao源） npm config set registry https://registry.npm.taobao.org
* npm ls react 可以查看项目中使用的react的版本
