**what's this**
-

2016年6月24日，Paul Irish(传说中chrome debugger工具的开发者，黑科技爱好者。),更新了他的medium。    

是的，debugger工具，我最感兴趣的一个方向。  

此君，说node添加了这么一个参数：--inspect，用了这个参数，node会生成一条链接，把这个链接放在chrome浏览器，就能愉快的调试node程序了。   
比如：  

    > node --inspect apps.js
    Debugger listening on port 9229.
    Warning: This is an experimental feature and could change at any time.
    To start debugging, open the following URL in Chrome:chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/13a08d6e-6b2d-4f78-bce5-575c4894985a

啊哈哈，劳资才不要vscode嘞，我就是要愉快的sublime。  

iron-node，devtool这两个工具因为自带node版本，与本地运行版本不一致，常常陷入尴尬的境地。  

有了这个玩意儿，突然有了开发debuger工具的想法。比如：--inspect + phantom。  
至少对比devtool之类，可以与本地版本node相关联，不会出现版本不一致的尴尬情况。  

当然你们也看到了那个warning，呵呵呵呵呵呵呵呵，尴尬啊。此君一向有点深井冰，曾经很多实验性质的小玩意儿我还没玩够，就被关掉了，这这这，，，真的是自家菜园子啊。