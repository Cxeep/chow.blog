今天写node项目时，突然发现项目的启动文件, app.js里就一行代码：  

    require('xx/core')()
    
package.json的scripts下有个命令:  

    "start" : "node app.js"
    
突然间觉得这样子好多余，于是：

    "start" : "node -e 'require(\\'xx/core\\')()'"
    
至于为什么**\\'**，那是因为json格式比较严格，试过**\\"**和**"**都不行。  

因为这种不方便的特性，我决定踩踩YAML和TOML的坑。
