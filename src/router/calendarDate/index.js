const Index = () => import('@/views/CalendarDate/index.vue').then(m => m.default);

export default [
  {
    path: '/calendar/index',
    component: Index,
    meta: {
      hasLogin: false,
    }
  }
]

