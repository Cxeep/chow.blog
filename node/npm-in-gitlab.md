**npm如果临时托管在gitlab上**
-

做法比较简单，只需要插入以下配置：

    "dependencies": {
      "modoule name": "git+ssh://git@${private gitlab.com}:${private gitlab project}.git"
    }
    
    usage: require('gitlab project name')
    
but，有个注意点：**git+ssh://**。这个前缀说明这是需要验证ssl的。如果当前的部署环境，比如说一个docker没有安装ssl，那么，是没有权限安装。  

so，只需要改一下：
![将Visibility Level改成public][1]


  [1]: ../public/npm-in-git-lab1.png
  
 然后把前缀**git+ssh://**改成**git+http://**。
 