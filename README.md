# ZJU-SE-Frontend

本项目是前端仓库的upstream，只有管理员可以直接修改

**在开发前一定要看regulation中的约定，避免出太多问题**

**运行前要安装axios包**

## 项目约定

为了简化开发流程，避免使用微信小程序开发平台的局限性，本项目采用HBuilderX作为开发工具，使用vue.js为主要框架，采用uni-app模式开发

开发人员需要掌握html，js，vue.js以及一定量的uni-app知识以进行项目开发

html，js，vue.js不做过多介绍

### HbuilderX

https://www.dcloud.io/hbuilderx.html

### uni-app开发文档

https://uniapp.dcloud.io/

请务必活用文档页面上方的搜索栏

### 将项目clone到本地后，使用HBuilderX导入文件夹即可

![image-20210417182929527](https://syh-pic-bed.oss-cn-shanghai.aliyuncs.com/20210417182929.png)

### 项目文件介绍

| 名称              | 作用                                                         |
| ----------------- | ------------------------------------------------------------ |
| common文件夹      | 存放项目可能会用到的第三方库，如腾讯地图                     |
| css文件夹         | 存放项目公有的样式表                                         |
| fetch文件夹       | 存放项目与后端的接口，新加入的接口需要在此声明，之后在各自模块中调用 |
| pages文件夹       | 存放各小组的页面，已经有预设好的几个页面，各小组可以在自己的文件夹下添加新页面 |
| static文件夹      | 静态资源                                                     |
| app.vue           | vue入口                                                      |
| main.js           | js入口                                                       |
| manifest.json     | 项目整体配置                                                 |
| package-lock.json | node包配置                                                   |
| pages.json        | 对页面的描述，小组在添加/删除页面后需要及时维护本文件。增删page都需要更改ages数组，如果是对四个基本页面做出的更改还需要在下方的tabbar数组中做相应更改 |
| uni.scss          | 基本样式                                                     |
| vue.config.js     | vue配置文件                                                  |

小组的任务主要集中在common，fetch，pages，static，pages.json中

基本工作核心为pages，同时需要维护剩余几项

**需要注意的是，API请求要放在fetch中的api.js中**，参考原有的示例添加

### 对API的介绍

本项目采用前后端分离，现在介绍在开发阶段应该注意的API相关事项

项目采用axios作为网络请求库，axios的配置位于fetch/api.js中，无baseURL，开发人员可以在文件最下方添加新请求函数

**为解决跨域问题，本项目采用vue代理方式**

例如，当我们想要访问http://121.41.94.85:5000/api/user/info/13733333333时，我们只需要访问`/api/user/info/13733333333`即可，此时axios会将路径补全为http://localhost:8080/api/user/info/13733333333，最终被vue代理至目标http://121.41.94.85:5000/api/user/info/13733333333

其中，后端api统一以/api开头，本地文件统一以/static开头，例如`./static/pharmacy/data.json`可以通过http://localhost:8080/static/pharmacy/data.json访问

## 项目demo运行教程

### 运行本项目

推荐采用运行到浏览器，这样可以保证H5端的运行稳定

![image-20210418135934570](https://syh-pic-bed.oss-cn-shanghai.aliyuncs.com/20210418135934.png)

### API查找

登录http://121.41.94.85:5000/swagger/index.html以获取swagger

### API测试

测试用户属性

```json
{
  "userPhone": "13733333333",
  "userName": "testGuest",
  "password": "22b23b05c00baf253aaf197b77117fe37185256c36137ca8f104b3c18c164be7",//原文123456
  "userEmail": "test@zju.edu.cn",
  "authType": 1
}
```

测试列表：

* 本地文件访问测试
* 远程服务器访问测试
* jwt测试

测试流程：

* 进入测试页，应看到如下结构

![image-20210422170951798](https://syh-pic-bed.oss-cn-shanghai.aliyuncs.com/20210422170951.png)

* 在三个按钮被按照从上往下顺序点击后，应该有如下效果

![image-20210422171051854](https://syh-pic-bed.oss-cn-shanghai.aliyuncs.com/20210422171051.png)
