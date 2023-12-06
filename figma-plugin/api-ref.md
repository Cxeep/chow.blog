# API参考

API参考包括浏览插件API所需的资源和材料。您可以使用侧边栏中的任何入口点来探索插件API。

如果您对Figma或插件还不熟悉，我们在下面列出了一些关键的资源。务必阅读我们的开发指南，以获取提示和最佳实践！

### 全局对象和变量

您可以通过[figma全局对象](https://www.figma.com/plugin-docs/api/figma/)及其子对象访问大多数插件API。您将找到允许您查看、创建和更新文件内容的属性和函数。

在插件API中还有一些全局变量可用：[__html__](https://www.figma.com/plugin-docs/api/global-objects/#html)和[__uiFiles__](https://www.figma.com/plugin-docs/api/global-objects/#uifiles)。您可以使用这些变量来访问您的UI文件的内容。

[浏览全局对象和变量 →](https://www.figma.com/plugin-docs/api/global-objects/)

### 节点类型

在Figma中，节点是表示文件内容的方式。Figma设计或FigJam文件中的每个图层对应一个节点。

每个节点支持一系列属性。某些属性是通用的，某些属性在节点之间共享，而某些属性是特定节点类型独有的。

选择[节点类型](https://www.figma.com/plugin-docs/api/nodes/)以查看该节点上支持的属性。

### 节点属性

某些节点属性在节点类型之间都是通用的。您可以使用[共享节点属性](https://www.figma.com/plugin-docs/api/node-properties/)部分来浏览这些共享属性。我们会显示支持该属性的节点类型。

### 数据类型

为了帮助您编写插件代码，我们为整个插件API提供了一个[TypeScript类型定义文件](https://www.figma.com/plugin-docs/api/typings/)。类型定义文件是一组类型和接口声明，可用于类型检查。

这些声明表示您在Figma中将与之交互的一组相关属性、参数和其他数据。在API参考中，您会在几个地方看到类型和接口。

获取和设置节点或全局对象上的属性
作为函数的参数传递
由方法返回

您可以从使用它们的任何属性和方法中访问类型和接口。或者，您可以在侧边栏的[数据类型部分](https://www.figma.com/plugin-docs/api/data-types/)浏览类型和接口。

# 其他资源

### 插件清单

每个插件都必须定义一个描述插件的manifest.json文件。当您注册插件进行开发时，Figma会创建一个简单的清单。

您可以扩展此清单以利用可选功能。例如：接受插件参数，或在组织中创建私有插件。

[查看插件清单属性 →](https://www.figma.com/plugin-docs/manifest/)

### 类型定义文件

API参考和文档解释了API的结构和工作原理。这在探索API或理解支持的功能和函数时非常有用。

我们提供了一个带有类型注解的[类型定义文件](https://www.figma.com/plugin-docs/api/typings/)，涵盖了整个插件API。当与编辑器（如VSCode）一起使用时，它会在您编写代码时提供建议。这有助于减少错误并捕捉边界情况。

在开发插件时，您不必使用TypeScript，但我们强烈推荐您这样做！API参考和所有相关指南都使用它。

[设置TypeScript →](https://www.figma.com/plugin-docs/typescript/)

```
💡 每当我们对API进行更改时，我们会更新类型定义文件。要获取最新的类型定义，运行npm install --save-dev @figma/plugin-typings。
```
