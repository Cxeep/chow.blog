### 插件运行方式

让我们讨论插件在Figma中如何运行。

如前所述，插件是使用JavaScript、HTML和CSS编写的。这暴露了一个非常类似浏览器的环境。然而，需要注意的是，为Figma插件编写JavaScript与为网站编写JavaScript存在一些区别。

为了使插件系统安全稳定，一些浏览器API不可用或需要以不同方式访问。这很重要，因此您可以回答以下问题：

* 如何访问Figma文件的内容？
* 如何为插件创建用户界面？
* 如何进行网络请求？

出于性能考虑，我们决定采用一种执行模型，在其中插件代码在**一个沙盒中运行主线程**。沙盒是一个最小的JavaScript环境，**不会暴露浏览器API**。

这意味着您可以使用所有标准的JavaScript ES6+，包括标准类型、JSON和Promise API、类似Uint8Array的二进制类型等等。我们还添加了最小版本的控制台API。但是，像XMLHttpRequest和DOM这样的浏览器API不直接从沙盒中提供。

要使用浏览器API（例如显示UI），需要创建一个带有`< script>`标记的`<iframe>`。这可以使用[figma.showUI()](https://www.figma.com/plugin-docs/creating-ui/)来完成。在这个`<iframe>`中，您可以编写任何HTML/JavaScript并访问任何浏览器API。

```
要查看主线程上可用的JavaScript/浏览器API列表，请将console.log(this)作为插件的第一行运行。
```

主线程可以访问Figma的“场景”（构成Figma文档的层次结构），但无法访问浏览器API。相反，iframe可以访问浏览器API，但无法访问Figma场景。主线程和iframe可以通过**消息传递相互通信**。

![](https://static.figma.com/uploads/04c4c6293fce2a7fe67bccd385ee5ab998705780)

如果您的插件[限制网络访问](https://www.figma.com/plugin-docs/manifest/#networkaccess)，则会强制执行其他网络安全性。当限制网络访问时，如果您的插件尝试访问未在插件清单中指定的域，则Figma会阻止该尝试并返回内容安全策略（CSP）错误。

域访问的执行仅限于插件发出的请求，例如向公共REST API发出的Fetch API请求。如果您的插件在iframe中呈现网站，则网络访问限制仅直接应用于网站的域。网络访问限制不影响该网站所需的资源。例如，假设您的插件框架并仅限制访问figma.com。您的插件将无法呈现来自其他域的内容。但是，figma.com仍然可以加载外部资源，例如Google Analytics的脚本。

当插件完成其工作时，必须调用figma.closePlugin()告诉Figma它已完成。否则，插件将无限期运行，用户将看到“运行中[your plugin name]”的视觉提示，直到关闭浏览器选项卡。

```
请注意，用户可以在插件运行时使用Figma显示的UI随时取消插件。当这种情况发生时，Figma将自己调用figma.closePlugin()。
```


[Previous
Setting editor type](https://www.figma.com/plugin-docs/setting-editor-type/)

[Next
Accessing the Document](https://www.figma.com/plugin-docs/accessing-document/)
