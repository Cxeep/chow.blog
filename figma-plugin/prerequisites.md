# 先决条件

在Figma中，插件是用JavaScript编写的，其用户界面是用HTML创建的。

我们希望Figma插件API易于使用。在可能的情况下，我们会对设计工具的复杂性进行抽象。然而，至少需要有一些JavaScript的基础知识（如果您想创建用户界面，还需要了解HTML）才能构建Figma插件。

如果您之前没有编程或网页开发的经验，有许多免费的教育资源可以帮助您。以下是一些受欢迎的资源：

1. [The Odin Project](https://www.theodinproject.com/courses/web-development-101)
2. [Udacity: Web Development](https://eu.udacity.com/course/web-development--cs253)
3.  [Khan Academy: Intro to JS](https://www.khanacademy.org/computing/computer-programming/programming)

此外，对于构建更复杂的插件，现代网页开发中使用的许多工具也会很有用。在开始编写插件之前，您不需要学习这些工具，但它们最终会派上用场。我们选择在Web开发社区最受欢迎的开源工具之上构建，而不是采用自己的专有解决方案。以下是您可能会使用的一些示例：

TypeScript，使浏览API更容易，编写健壮的插件
Webpack，用于[打包](https://www.figma.com/plugin-docs/libraries-and-bundling/)大型多文件项目和导入库
React、Vue等，用于创建复杂的用户界面

[Previous
Introduction](./introduction.md)

[Next
Plugin Quickstart Guide](https://www.figma.com/plugin-docs/plugin-quickstart-guide/)
