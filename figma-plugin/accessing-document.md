# 访问文档

让我们看看编写插件的一些基本要素。本节概述了您最有可能使用的一些API。请查看[文档](./api-ref.md)以了解Figma Plugin API的全部范围。

插件可以访问文档中的图层（通常称为节点）以读取和/或修改它们。获取访问节点的两种方法是：

* 读取当前选择，和
* 从文档的根开始执行遍历

### 获取当前选择

通常情况下，插件将对用户当前选择的内容执行某些操作。每个页面独立存储其选择。您可以通过`figma.currentPage.selection`获取当前页面的选择，该函数返回一个`ReadonlyArray<BaseNode>`。

下面是一个简短的插件，将当前选择的内容半透明，然后关闭：

```
获取当前选择
for (const node of figma.currentPage.selection) {
    if ("opacity" in node) {
        node.opacity *= 0.5
    }
}
figma.closePlugin()
```

如果您只想使用所选图层中的一个（在测试时很常见），可以使用`figma.currentPage.selection[0]`。但是请记住，插件需要处理以下三种情况：

* 未选择任何图层
* 选择了单个图层
* 选择了多个图层


```
在Dev Mode中，用户每次只能选择一个节点，因此figma.currentPage.selection仅返回一个对象。
了解更多内容，请参见[Working in Dev Mode guide→](https://www.figma.com/plugin-docs/working-in-dev-mode/)
```


### 优化文档遍历
另一个常见的插件操作是遍历文档。为了搜索整个文档，插件通常会从`figma.currentPage`或`figma.root`开始遍历。

```
请仔细考虑是否需要从figma.root开始遍历。这意味着您的插件将搜索整个文档，用户可以创建具有许多页面的非常大的Figma文件，这可能导致您的插件运行时间很长，并冻结用户的UI。如果插件修改了当前页面之外的节点，则用户在运行插件时可能不会获得任何立即的视觉反馈，因为他们只会查看当前页面。
```

如果您的插件不需要访问实例内部的不可见节点及其后代，请设置[figma.skipInvisibleInstanceChildren](https://www.figma.com/plugin-docs/api/properties/figma-skipinvisibleinstancechildren/)为true，以加快文档遍历速度。

```
跳过不可见实例的子元素
// Skip over invisible nodes and their descendants inside instances
// for faster performance.
figma.skipInvisibleInstanceChildren = true
```

如果您只需要按类型查找节点，请使用[node.findAllWithCriteria](https://www.figma.com/plugin-docs/api/properties/nodes-findallwithcriteria/)，它比node.findOne和node.findAll快得多。


```
按条件查找所有节点
// Finds all component and component set nodes
const nodes = node.findAllWithCriteria({
types: ['COMPONENT', 'COMPONENT_SET']
})
```

### 节点类型
每个节点都有一个类型字段，指示其类型，这对于插件仅需要在某些节点类型上操作很有帮助。例如，拼写检查插件可能只关心节点类型为“TEXT”的节点。

给定类型的节点具有插件可以读取和写入的特定一组字段。例如，矩形节点（具有“RECTANGLE”的节点）具有.cornerRadius字段，但没有`.constraints`字段。另一方面，框架（类型为“FRAME”的节点）具有`.constraints`字段，但没有`.cornerRadius`字段。

```
为了构建不会崩溃的插件，您应始终考虑如何处理意外的节点类型。即使插件只关心某些节点类型，用户也可能尝试在任何节点类型上运行插件。如果用户尝试在您不支持的节点类型上使用插件，请确保您的插件向用户提供反馈，您可以使用figma.notify()函数实现此操作。
```

### 完整的文档遍历
为了在不进行任何基于节点的筛选的情况下搜索整个文档，您可以使用`node.findOne()`和`node.findAll()`函数。同样，请仔细考虑是否需要这样做，因为这可能会导致您的插件在大型文件中出现性能问题。

```
内置遍历助手
// Finds the first text node with more than 100 characters
const node = node.findOne(node => {
return node.type === "TEXT" && node.characters.length > 100
})

// Finds all empty frame nodes
const nodes = node.findAll(node => {
return node.type === "FRAME" && node.children.length === 0
})
```

一般来说，如果您想完全控制如何遍历文档，则必须编写递归函数。

```
自定义遍历
// This plugin counts the number of layers, ignoring instance sublayers,
// in the document
let count = 0
function traverse(node) {
    if ("children" in node) {
        count++
        if (node.type !== "INSTANCE") {
            for (const child of node.children) {
                traverse(child)
            }
        }
    }
}
traverse(figma.root) // start the traversal at the root
alert(count)
figma.closePlugin()
```

```
在Dev Mode或FigJam中运行的插件只能访问当前页面。

了解更多内容，请参见[Working in Dev Mode guide→](https://www.figma.com/plugin-docs/working-in-dev-mode/)和[Working in FigJam guide→](https://www.figma.com/plugin-docs/working-in-figjam/)。

```
