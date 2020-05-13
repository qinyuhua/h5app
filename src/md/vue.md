## 一、介绍
Vue是一套用于创建用户界面的的渐进式框架。

它被设计为自底向上逐层应用。

Vue的核心库只关注视图层，易于上手，还便于与第三方库或既有项目整合。

当与现代化的工具链以及各种支持类库结合使用时，Vue也完全能够为复杂的单页应用提供驱动。
### 1. 区别
#### 1.1 React
React 和 Vue 有许多相似之处，他们都有：
* 使用Virtual DOM
* 提供了响应式和组件化的视图组件
* 将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。
#### 1.2 Angular

### 2. 为什么Vue被称为“渐进框架”？
使用渐进式框架的代价小，从而使现有项目更容易采用并迁移到新框架。

Vue.js 是一个渐进式框架，因为你可以逐步将其引入鲜柚应用，而不必从头开始编写程序。

Vue 的最基本和核心部分涉及“视图层”，因此可以通过逐步将Vue引入程序并替换“视图”实现来开始你的旅程。

### 3.Vue.js 中声明式渲染是什么？
Vue.js 使渲染数据变得容易，并隐藏了内部实现。

## 二、 生命周期

每个Vue 实例在被创建时都要经过一系列的初始化过程----例如，需要设置数据监听、编译模板、将实例挂在到DOM并在数据变化时更新DOM等。

同时在这个过程中也会运行一些叫做生命周期钩子的函数，这个了用户在不同阶段添加自己代码的机会。

* beforeCreate
组件实例刚被创建，组件属性计算之前，如data 属性等。

* created
组件实例创建完成，属性已绑定，但DOM还未生成， $el 属性还不存在

* beforeMount
模板编译/挂载之前

* mounted
模板编译/挂在之后

* beforeUpdate
组件更新之前

* updated
组件更新之后

* actvated 
for keep-alive 组件被激活时调用

* deactivated
for keep-alive 组件被移除时调用

* beforeDestory
组件销毁钱调用

* destoryed 
组件销毁后调用
```html
<template>
    <div class="wrap functionalEntrance">
        <h3>测试DEMO</h3>
        <div>指令</div>
        <div v-if="true">v-if</div>
        <input type="text" v-model="message" />
        <input type="button" @click="change" value="更新数据"/>
        <input type="button" @click="destroy" value="销毁"/>
    </div>

</template>

<script>
  export default {
    data() {
      return {
        message: 'initName',
      }
    },
    beforeCreate () {
      // todo 组件实例刚被创建，组件属性计算之前，如 data 属性等
      console.log('beforeCreate================');
      // console.log('this.$data', this.$data);
      // console.log('this.$el', this.$el)
      // console.log('this.message', this.message)
    },
    computed: {

    },
    created () {
      // todo 组件实例创建完成，属性已绑定，但DOM还未生成，$el 属性还不存在
      console.log('create================');
      // console.log('this.$data', this.$data);
      // console.log('this.$el', this.$el)
      // console.log('this.message', this.message)

    },
    beforeMount (){
      // todo beforeMount 模板编译/挂载之前
      console.log('beforeMount================');
      // console.log('this.$data', this.$data);
      // console.log('this.$el', this.$el)
      // console.log('this.message', this.message)
    },
    mounted () {
      // todo mounted 模板编译/挂载之后
      console.log('mounted================');
      // console.log('this.$data', this.$data);
      // console.log('this.$el', this.$el)
      // console.log('this.message', this.message)
    },

    beforeUpdate () {
      // todo mounted 模板编译/挂载之后
      console.log('beforeUpdate================');
      // console.log('this.$data', this.$data);
      // console.log('this.$el', this.$el)
      // console.log('this.message', this.message)
    },
    updated () {
      // todo mounted 模板编译/挂载之后
      console.log('updated================');
      // console.log('this.$data', this.$data);
      // console.log('this.$el', this.$el)
      // console.log('this.message', this.message)
    },
    activated () {
      console.log('activated');
    },
    deactivated () {
      console.log('activated');
    },
    beforeDestroy () {
      console.log('beforeDestroy');
    },
    destroyed () {
      console.log('destroyed');
    },
    methods: {
      change() {
        console.log('change=-=============')
        this.message = 'Datura is me';
      },
      destroy() {
        console.log(this);
        this.$destroy();
      }

    }

  }
</script>

```
生命周期钩子的`this` 上下文指向调用它的Vue实例。 （每个Vue文件）
> 不要在选项属性或回调上使用箭头函数，因为箭头函数没有 this属性， this 会作为变量一直向上级词法作用域查找，
经常导致 `Cannout read property of undefined` 的错误。
```javascript
create: () => console.log(this.a)
```



## 三、模板语法
Vue.js 使用了基于HTML的模板语法，允许开发者声明式地将DOM绑定至底层Vue 实例的数据。
所有Vue.js的模板都是合法的HTML， 所以能被遵循规范的浏览器和HTML解析器解析。

在底层的实现上，Vue 将模板变异成虚拟DOM渲染函数。结合相应系统，Vue能够智能地计算出最少需要重新渲染多少组件，并把DOM操作次数减到最少。

### 3.1 插值
#### 3.1.1 文本
数据绑定最常见的形式就是使用 "Mustache" 【双大括号】的文本插值：
```html
<span>{{ message }}</span>
```
Mustache 标签将会被替代为对应数据对象上 message 属性的值。
无论何时，绑定的数据对象上 message 属性发生了改变，插值处的内容都会更新。

### 3.2 指令
指令是一系列特殊属性，可以通过将其添加到模板HTML标记中来赋予他们特殊的形影功能。

指令允许模板中的元素使用数据属性、方法、计算或者监听的属性和内联表达式根据定义的逻辑对更改做出放映。
```
<SignUpButton v-on:click='doSignUp' />
<SignUpButton @click='doSignUp' />
```
指令是带有`v-` 前缀的特殊特性。指令特性的值预期是*单个JavaScript表达式*（v-for 例外）。
```html
<div v-if="seen">是否显示{{seen}}</div>
```
指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用域DOM。

#### 3.2.1 参数
一些指令能够接收一个“参数”，在指令名称之后以冒号表示
```html
<a v-bind:href="url"> ... </a>
```
这里`v-bind:href` 的 `href`是参数，告知 `v-bind` 指令该元素的 href 特性与表达式 url 的值绑定


## 四、 双向绑定原理 Object.defineProperty()
> vue数据双向绑定通过“数据劫持”+订阅发布模式实现。
### 4.1 Vue 的双向绑定（数据劫持）
vue.js 采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter、getter，在数据变动时发布消息给订阅者。

`Vue 实现双向绑定的原理 就是利用了 Object.defineProperty() 方法重新定义了对象获取属性值get和设置属性值set 的操作实现的。`

它接收三个参数，要操作的对象、要定义或者修改的对象属性、属性描述符。
```javascript
const obj = {};
Object.defineProperty(obj, 'value', {
    get: function() {
      console.log('获取');
      return val;
    },
    set: function(value) {
      console.log('设置', value);
    }
  })
obj.value = 'value'; // 给obj设置value 属性，触发set方法
const val = obj.value; // 获取obj value属性，触发get方法
```
数据双向绑定，首先要对数据进行劫持监听，我们需要设置一个监听器 Observer，用来监听所有属性。

如果属性发生变化，就需要告诉订阅者Watcher看是否需要更新。
因为订阅者是有很多个，所以需要有一个消息订阅器Dep来专门收集这些订阅者，然后在监听器Observer和订阅者Watcher之间进行统一管理。

#### vue 如何实现
* observer用来实现对每个vue的data定义的属性循环用Object.defineProperty()实现数据劫持，以便利用其中的setter和getter，
然后通知订阅者，订阅者会出发它的update方法，对视图进行更新。

* 在vue中v-model、v-name、{{}} 等都可以对数据进行显示，
也就是说，假如一个属性都通过这三个指令，那么每当这个属性改变的时候，
相应的这三个指令的HTML视图也必须改变，于是vue中就是每当有这样的可能用到双向绑定的指令，就在一个Dep中增加一个订阅者，
其订阅者知识更新自己的指令对应的数据，也就是v-model='name'和{{name}}有两个对应的订阅者，各自管理各自的地方。
每当属性的set方法触发，就循环更新Dep中的订阅者。

### 4.2 Angular 脏值检查
angular.js 是通过脏值检测的方式比对数据是否变更，来决定是否更新视图，最简单的方式就是通过setInterval() 定时轮询监测数据变动。
angular只有在指定的事件触发时进行脏值检测，大致如下：

* DOM事件，譬如用户文本输入、点击按钮等。

* XHR响应事件（$http）

* 浏览器Location变更事件（$location）

* Timer 事件，（$timeout,$interval）

* 执行$digest() 或者 $apply()


### 4.3 Backbone 发布者-订阅者
一般通过sub/pub的方式实现数据和视图的绑定监听，更新数据方式通常做法是 vm.set('property', value)
详细请看[链接](http://www.html-js.com/article/Study-of-twoway-data-binding-JavaScript-talk-about-JavaScript-every-day)

## 五、计算属性和侦听器
### 5.1 计算属性 computed
```html
<div id="example">
    <p>Original: {{message}}</p>
    <p>Original: {{reversedMessage}}</p>
</div>
```
``` 
computed: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

computed 计算属性，目的是避免在模板中有太多的表达式，导致模板过重且难以维护。

计算属性是给予他们的相应事宜来进行缓存的。

### 5.2 侦听属性。

Vue 提供了一种更通用的方式来观察和响应Vue实例上的数据变动：侦听属性。


# 深入理解Vue的computed实现原理及其实现方式

> 计算属性：当其**依赖的属性值**发生变化时，计算属性会重新计算，反之，则使用缓存中的属性值。

* computed 用来监控自己定义的变量，该变量不能在data中生命，直接在computed里面定义，和变量是同样的语法。
* computed 多个变量或者对象进行处理后返回一个结果值，监控多个变量中任一变量发生变化时，该变量就会自动重新计算。

```vue
<template>
  <div>
    <input type="button" @click="changeA" value="数据加一"/>
    <p>a的值为： {{a}}</p>
    <p>aDouble的值为： {{aDouble}}</p>
    <p>aPlus的值为： {{aPlus}}</p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        a: 1,
      }
    },
    computed: {
      aDouble: function () {
        return this.a * 2;
      },
      aPlus: {
        get: function () {
          return this.a + 1;
        },
        set: function (v) {
          this.a = v - 1;
        }
      }
    },
    methods:{
      changeA () {
        this.a += 1;
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>

```

**与watch之间的区别：**

watch 主要用于监控Vue实例的变化，监控变量必须在data 里面声明才可以，它可以监控一个变量，也可以是一个对象。但是只能监控整个对象或者变量，不能监控对象里面的变量。  
watch 一般用于 监控路由、input 输入框的值特殊处理等等，它比较适合的场景是一个数据影响多个数据。

**计算属性** 可用于快速计算视图(View) 中显示的属性。这些计算将被缓存，并且只在需要时更新。

在Vue中有多种方法为视图设置值：  
* 使用指令直接将数据值绑定到视图
* 使用简单的表达式对内容进行简单的转换
* 使用过滤器对内容进行简单的转换

