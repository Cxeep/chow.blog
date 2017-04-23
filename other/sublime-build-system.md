**what's this?**
-

sublime自带一个编译快捷键，ctrl + B,可以执行当前的文件。  
进入：

    Tools -> Build System

你就看到sublime自带的很多编译器。  

but，没有自带javascript。但是sublime提供了api可以自定义编译器。  
有大量的参数可以配置，就看你怎么写了，但是sublime自定义的编译器，基本依赖本地的语言环境。
如图：
![sublime自定义编译器的参数][1]

  [1]: ../public/sublime-build-system.png
  

**javascript build-system**
-

window环境下：  

    {
        "working_dir": "${project_path:${folder}}",
        "selector": "*.js",
        "shell": true,
        "windows": {
            "cmd": ["node", "--use-strict", "--harmony", "$file"],
        }
    }


os环境下有点特殊：

    {
        "cmd": ["/usr/local/bin/node", "--use-strict", "$file"],
        "working_dir": "${project_path:${folder}}",
        "selector": "*.js"
    }
不指明`/user/local/bin/node`，os似乎不认识node这个命令，有待研究下。