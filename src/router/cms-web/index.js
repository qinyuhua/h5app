const Home = () => import('@/views/Cms-web/Home/index.vue').then(m => m.default);

export default [
  {
    path: '/cms-web/home',
    component: Home,
    meta: {
      hasLogin: false,
    }
  }
]

