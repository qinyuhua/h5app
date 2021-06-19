const Index = () => import('@/views/MySocket/index.vue').then(m => m.default);

export default [
  {
    path: '/mySocket/index',
    component: Index,
    meta: {
      hasLogin: false,
    }
  },
]

