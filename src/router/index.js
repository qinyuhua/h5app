import Vue from 'vue';
import Router from 'vue-router';
// import store from './../store/index'

Vue.use(Router);
let routes = [
  {
    path: '/',
    meta: { hasLogin: false, },
    beforeEnter: (to, from, next) => {
      // const { commit } = store;
      next();
    }
  }
];

/**
 * require.context(directory, useSubdirectories, regExp)
 * 获取一个特定的上下文，主要用来实现自动化导入模块，
 * 在前端工程中，如果遇到从一个文件夹引入很多模块的情况，可以使用这个api,
 * 它会遍历文件夹中指定的文件，然后自动导入，使得不需要每次显式的调用import导入模块
 * directory 读取文件的路径
 * useSubdirectories 是否遍历文件的子目录
 * regExp 匹配文件的正则
 *
 * 返回函数，有三个属性resolve/keys/id
 * resolve 函数，接受一个参数 req, req 为文件夹下面匹配文件的相对路径，返回这个匹配文件相对于整个工程的相对路径
 * keys 返回匹配成功模块的名字组成的数组
 * id 执行环境的id,返回的是一个字符串，主要用在module.hot.accept 应该是热加载
 * 这三个都是作为函数的属性(注意是作为函数的属性,函数也是对象,有对应的属性)
 */
const routerContext = require.context('./', true, /index\.js$/)
// console.dir(routerContext);
// console.log('keys:', routerContext.keys());
// console.log('id:', routerContext.id);
// console.log('resolve:', routerContext.resolve(routerContext.keys()[0]));
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = [...routes, ...(routerModule.default || routerModule)]
})

const router = new Router({
  mode: 'history',
  routes,
})

export default router;
