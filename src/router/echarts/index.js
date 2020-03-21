const LineDemo = () => import('@/views/EchartsDemo/lineDemo.vue').then(m => m.default);

export default [
  {
    path: '/echarts/lineDemo',
    component: LineDemo,
    meta: {
      hasLogin: false,
    }
  }
];