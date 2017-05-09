**what's this**
-
[node-gyp][1]

    Q: 如果需要定制化一个Node.js的组件，可以用c++去拓展，而Node.js怎么调用c++代码？   
    A: node-gyp会将x.cc文件编译成x.node文件，Node.js中可以直接require到.node格式的文件。 

 
windows环境下：   

不要装什么Visual Build和Visual Studio 2015了，太特么坑爹了。

按照README的描述，你其实需要的是：`npm install --global --production windows-build-tools`
[神器][2]啊，不需要关注环境啊，msvs_version啊，只需要静静地等待安装完毕。。。   

**usage:**
-
一，configure

    $ node-gyp configure
    > gyp info it worked if it ends with ok
    > ...
    > gyp info ok

二，build

    $ node-gyp build
    > gyp info it worked if it ends with ok
    > ...
    > gyp info ok


  [1]: https://github.com/nodejs/node-gyp
  [2]: https://github.com/felixrieseberg/windows-build-tools