const Home = () => import('@/views/Wechat-account/Home/index.vue').then(m => m.default);

export default [
  {
    path: '/wechat/home',
    component: Home,
  }
];
