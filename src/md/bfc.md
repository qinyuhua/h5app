#BFC

## BFC定义
BFC 全程为 快格式化上下文（Block Formatting Context）

### Box ： CSS 布局的基本单位
Box 是CSS布局的对象和基本单位，简单地说，一个页面是由很多个Box组成的。元素的类型和display ，决定了这个Box的类型。不同类型的Box，会参与不同的Formatting Context,因此Box内的元素会以不同的方式渲染。

* block-level box:display 属性为block，list-item，table 的元素，会生成 block-level box。
* inline-level box: display 属性为 inline、inline-block、inline-table 的元素，

### Formatting Context
Formatting context 是 W3C CSS2.1 规范中的一个概念。  
它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

### 什么是BFC
一个块格式化上下文是Web页面的可视化CSS渲染的一部分。它是块级盒布局出现的区域，也是浮动层元素进行交互的区域。  
一个块格式化上下文由以下之一创建：
* 根元素或其它包含它的元素
* 浮动元素 （元素的 float 不是 none）
* 绝对定位元素 (元素具有position 为absolute 或 fixed)
* 内联块（元素具有display: inline-block）
* 表格单元格（元素具有display：table-caption,HTML 表格单元格默认属性）
* 表格标题
* 具有overflow 且值不是 visible 的块级元素
* display:flow-root
* column-span:all 应当总是会创建一个新的格式化上下文，即便具有column-span：all 的元素并不被包裹在一个多列容器中。
* 一个块格式化上下文包括创建它的元素内容所有内容，除了被包含于创建新的块级格式化上下文的后代元素内的元素。
> 块格式化上下文对于定位与清除浮动很重要。定位和清除浮动的样式规则只适用于处于同一块格式化上下文内的元素。浮动不会影响其它块格式化上下文中元素的布局，并且清除浮动只能清除同一块格式化上下文中在它前面的元素的浮动。


