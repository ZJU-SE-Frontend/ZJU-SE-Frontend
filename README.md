# ZJU-SE-Frontend
本项目是前端仓库的upstream，只有管理员可以直接修改

## 项目workflow

为了避免一人一个branch对主仓库造成的混乱，项目采用有upstream的main-develop-feature模式，本节介绍项目的workflow

规定以下名称：

* upstream： git@github.com:ZJU-SE-Frontend/ZJU-SE-Frontend.git，即本仓库
* origin： 各小组组长对upstream进行的fork复制，例如git@github.com:Yu-Jiawei/ZJU-SE-Frontend.git
* upstream/main：upstream仓库的主分支，此分支上的代码是可运行，可部署的
* upstream/develop：upstream仓库的开发分支，各小组组长进行完一个阶段的开发后，向此分支提出pull request以提交功能
* origin/develop：各小组origin中的开发分支，小组成员的feature开发将会整合在此分支中
* origin/[feature name]：各小组成员对origin中develop分支进行的功能开发分支

### fork

各小组组长对upstream进行fork操作，获取本小组所用于开发的origin仓库。例如从git@github.com:ZJU-SE-Frontend/ZJU-SE-Frontend.git中fork出git@github.com:Yu-Jiawei/ZJU-SE-Frontend.git仓库

![image-20210417181630156](https://syh-pic-bed.oss-cn-shanghai.aliyuncs.com/20210417181630.png)

fork出来的仓库完全属于小组，管理员只对upstream仓库负责，fork出的origin仓库需要小组长自行维护

在fork之后,如果要更新自己的origin到最新（即与upstream同步），可以在自己的仓库里发起upstream/develop→origin/develop的pull request，并且自行通过以更新到最新

![img](https://syh-pic-bed.oss-cn-shanghai.aliyuncs.com/20210417181647.jpg)

![img](https://syh-pic-bed.oss-cn-shanghai.aliyuncs.com/20210417181651.jpg)

![img](https://syh-pic-bed.oss-cn-shanghai.aliyuncs.com/20210417181657.jpg)

![img](https://syh-pic-bed.oss-cn-shanghai.aliyuncs.com/20210417181702.jpg)

### feature

本小节为推荐各小组采用的开发模式，小组可自行决定其他开发模式

小组成员从小组origin/develop中新建功能开发分支，例如C4小组成员A要在本小组负责的在线药房中加入添加用户功能，则可以从develop分支中新建feature/add-user分支，在完成工作后由小组长审核并且并入develop分支

![image-20210417164329297](https://syh-pic-bed.oss-cn-shanghai.aliyuncs.com/20210417164329.png)

### pull request

为了将各小组工作并入upstream（即最终提交），小组长需要发起origin/develop→upstream/develop的pull request，具体方法为在origin库中发起pull request，目标为upstream/develop

![img](https://syh-pic-bed.oss-cn-shanghai.aliyuncs.com/20210417180759.jpg)

在发起pull request以后，务必联系管理员，以防管理员没有及时看到申请
