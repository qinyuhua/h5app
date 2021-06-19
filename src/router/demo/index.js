const Js = () => import('@/views/Demo/JS/index.vue').then(m => m.default);
const Wage = () => import('@/views/Demo/WageCalculator/index.vue').then(m => m.default);
const WageCalculator = () => import('@/views/Demo/WageCalculator/calculator.vue').then(m => m.default);
const Study = () => import('@/views/Demo/Study/index.vue').then(m => m.default);
const OptionsComponent = () => import('@/views/Demo/JS/DemoOptions.vue').then(m => m.default);

export default [
  {
    path: '/demo/js',
    component: Js,
    meta: {
      hasLogin: false,
    }
  },
  {
    path: '/demo/wage',
    component: Wage,
    meta: {
      hasLogin: false,
    }
  },
  {
    path: '/demo/wage/calculator',
    component: WageCalculator,
    meta: {
      hasLogin: false,
    }
  },
  {
    path: '/demo/js/options',
    component: OptionsComponent,
    meta: {
      hasLogin: false,
    }
  },
  {
    path: '/demo/study',
    component: Study,
    meta: {
      hasLogin: false,
    }
  },
]

