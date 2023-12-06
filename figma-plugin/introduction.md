# 介绍

欢迎使用Plugin API！

插件是由社区创建的程序或应用程序，扩展了Figma编辑器的功能。插件在文件中运行，执行一个或多个用户操作，并允许用户自定义其体验或创建更高效的工作流程。

插件由Web技术驱动。您需要了解这些技术才能开发插件。您将使用**JavaScript**编写插件，并使用**HTML**构建任何UI。[了解所需知识 →](./prerequisites.md)

插件通过专用的**Plugin API**与Figma的编辑器进行交互。它们还可以利用外部**Web APIs**。您可以构建在用户调用后立即运行的插件，也可以构建需要用户通过用户界面（UI）输入信息的插件。[了解插件如何运行 →](./how-plugins-run.md)

[API 参考](./api-ref.md)和本附带文档提供了构建插件所需的信息。要提问、提供反馈或与其他插件开发人员联系，
[请加入我们的社区驱动的Discord服务器 →](https://discord.gg/xzQhe2Vcvx)

我们的设置指南将引导您完成设置环境并运行示例插件的过程。[开始使用插件API →](https://www.figma.com/plugin-docs/plugin-quickstart-guide/)

### 插件API访问

插件API支持读写功能，允许开发人员**查看**、**创建**和**修改**文件内容。您可以通过[figma](https://www.figma.com/plugin-docs/api/figma/)全局对象访问大多数插件API。

插件首先公开文件内容。这包括层面板中存在的任何内容以及属性面板中与这些层相关联的任何属性。插件可以查看和修改这些层（或节点）的各个方面，如颜色、位置、层次结构、文本等。

**插件API不允许您访问其运行的当前文件之外的任何内容。插件无法访问：**

来自任何团队或组织库的样式和组件。插件API只能访问当前文件中存在的样式、组件和实例，或通过像 [importComponentByKeyAsync()](https://www.figma.com/plugin-docs/api/figma/#importcomponentbykeyasync) 这样的函数导入到文件中的样式、组件和实例。
通过URL访问的外部字体或Web字体。插件只能访问编辑器中可访问的字体，其中包括Figma的默认字体、[共享组织字体](https://help.figma.com/hc/en-us/articles/360039956774)或存储在[您计算机本地的字体](https://help.figma.com/hc/en-us/articles/360039956894)。您需要[加载您想要在插件中使用的任何字体](https://www.figma.com/plugin-docs/api/properties/figma-loadfontasync/)。这不适用于您想要在插件UI中使用的字体。
其他文件元数据，如文件的团队或位置、权限或与该文件相关联的任何注释。这包括该文件的版本历史记录。您可以通过Figma的[REST API](https://www.figma.com/developers/api#intro)获取对文件这些方面的读访问权限。

`在开发模式下，插件只能读取当前所在文件的页面内容，并且只能写入某些元数据，如[插件数据（pluginData）](https://www.figma.com/plugin-docs/api/properties/nodes-setplugindata/)和[重新启动数据（relaunchData）](https://www.figma.com/plugin-docs/api/properties/nodes-setrelaunchdata/)。详细了解请参阅我们的[《在开发模式下工作》](https://www.figma.com/plugin-docs/working-in-dev-mode/)指南。  `

### 文档结构

在 Figma 中，每个文件都由一棵节点树组成，而每个文件的根节点都是一个 DocumentNode。DocumentNode 是您访问和探索文件内容的方式。

在 Figma 设计文件中，每个 DocumentNode 都会有一个代表该 Figma 文件中每个页面的 PageNode。每个浏览器标签页只能有一个文档节点，它的每个子节点都必须是 PageNodes。

由于 FigJam 文件不支持页面，因此没有任何 PageNode 可供探索。相反，DocumentNode 的子节点将是该面板上的图层和对象。

然后，DocumentNode 可以有任意数量的子节点。从 DocumentNode 起始的每个子树都代表画布上的一个图层或对象。在 Figma 中，有特定的节点或类别用于表示不同类型的图层，如画框、组件、矢量和矩形。

节点具有与之关联的多个属性。其中一些是**全局属性**，存在于每个节点上，而其他属性则特定于节点的类型。

您可以为特定的编辑器类型创建插件，也可以为多个编辑器创建插件，或者构建在不同的编辑器中执行不同操作的插件。虽然某些节点类型只能在特定的文件或编辑器类型中创建，但通常情况下，无论编辑器类型如何，您都可以读取和修改大多数节点，除非插件正在运行于开发模式。详细了解请参阅[《在开发模式下工作》](https://www.figma.com/plugin-docs/working-in-dev-mode/)指南。

### 基于浏览器

Figma主要是基于浏览器的软件，这意味着它可以在所有全功能桌面操作系统（如MacOS、Windows、Linux等）以及Chrome OS上运行。

与Figma一样，插件也是由Web技术驱动的。插件API的一部分在一个`<iframe>`中运行，这意味着您还可以访问浏览器API。这包括进行网络请求、打开本地文件以及使用`<canvas>`、WebGL和WebAssembly等功能。[了解插件如何运行 →](https://www.figma.com/plugin-docs/how-plugins-run/)翻译：

### 用户操作

插件在文件中运行并执行一个或多个用户操作。这些用户操作通常是短暂的，并且必须由用户发起。

- 用户一次只能运行一个插件和执行一个操作。
- 无法构建在后台运行的插件。

### 插件界面

您可以选择插件是立即运行，还是让用户输入[参数 →](./accepting_parameters_as_input.md)。

插件还可以打开一个模态框作为一个`<iframe>`，并在该`<iframe>`中编写HTML、CSS和JavaScript代码。您可以在该模态框内创建任何您想要的用户界面。[创建用户界面 →](./creating_a_user_interface.md)

能够从与Figma设计系统匹配的组件库中提取组件，可以显著加快插件开发速度，并帮助您创建与Figma自身界面相似的用户界面。我们不会将这些组件作为核心Figma插件API的一部分提供。然而，Figma员工和插件开发者Tom Lowry已经准备了一个React组件库，您可以使用它来构建您的插件界面。[打开GitHub存储库 →](https://github.com/thomas-lowry/figma-plugins-on-github)

### 插件参数

开发者可以创建带有参数的插件，允许插件通过[快速操作菜单](https://help.figma.com/hc/en-us/articles/360040328653-Use-shortcuts-and-quick-actions#:~:text=To%20access%20the%20quick%20actions,Control%20%2B%20%2F%20or%20Control%20%2B%20P)接受用户的输入。

添加参数意味着您不需要构建自定义用户界面。这也为插件的用户提供了简化的体验，他们可以通过键盘直接从快速操作菜单运行插件。

### Relaunch plugins

在构建插件时，您可以选择在Figma的用户界面中创建按钮，以便用户可以重新启动您的插件。这使得多次运行插件更加容易，并允许协作者从同一文件中重新启动插件。您可以使用[setRelaunchData()](https://www.figma.com/plugin-docs/api/properties/nodes-setrelaunchdata/)函数来实现这一点。

```

```

manifest.json

"relaunchButtons": [
{"command": "edit", "name": "Edit shape"},
{"command": "open", "name": "Open Shaper", "multipleSelection": true}
]

```
在Figma设计文件中，重新启动按钮将出现在属性面板中。在FigJam文件中，重新启动按钮将出现在节点的属性菜单中。而在Figma设计的开发模式中，重新启动按钮将出现在检视面板中。
```

在FigJam中，页面或文档节点上不提供重新启动按钮。

可以将多个重新启动按钮添加到同一个节点中。如果将来自同一个插件的多个重新启动按钮添加到同一个节点中，它们将被合并到一个按钮中，并带有子菜单。按钮的顺序由清单的relaunchButtons数组中元素的顺序确定。[在插件清单文档中了解更多信息→](https://www.figma.com/plugin-docs/manifest/)

# 插件管理

### 支持

Figma不为第三方应用程序提供支持。作为插件的开发者，您有责任帮助插件的用户解决技术问题。您需要在提交插件进行批准时添加一个支持联系方式。这可以是用户可以联系的电子邮件地址，或者是一个指向网站或帮助中心的链接。[以开发者身份管理插件 →](https://help.figma.com/hc/en-us/articles/360042293714)

### 版本管理

一旦Figma批准了您的插件，您就不需要再次提交插件进行审核。这意味着您可以立即发布任何更新。您可以在插件的**版本历史**中添加有关任何更改或更新的详细描述。当您发布更新时，Figma将为每个用户更新插件。用户无法恢复到插件的先前版本。如果您需要回滚任何更改，可以重新发布插件的早期版本。

### 分析

Figma目前不提供有关插件使用情况、错误/崩溃报告的任何分析或报告功能。我们建议使用自己的分析或崩溃报告服务来监控插件的性能。Figma每周都会向插件开发者发送有关来自[Figma社区](https://www.figma.com/community)用户的参与情况的通知。

[Next
Prerequisites](https://www.figma.com/plugin-docs/prerequisites/)
