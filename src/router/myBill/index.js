const Index = () => import('@/views/MyBill/index.vue').then(m => m.default);
const ListBill = () => import('@/views/MyBill/ListBill/index.vue').then(m => m.default);
const BillChart = () => import('@/views/MyBill/BillChart/index.vue').then(m => m.default);
const BillType = () => import('@/views/MyBill/BillType/index.vue').then(m => m.default);
const BillInfo = () => import('@/views/MyBill/BillInfo/index.vue').then(m => m.default);

export default [
  {
    path: '/myBill/index',
    component: Index,
    meta: {
      hasLogin: false,
    }
  },
  {
    path: '/myBill/listBill/index',
    component: ListBill,
    meta: {
      hasLogin: false,
    }
  },
  {
    path: '/myBill/billChart/index',
    component: BillChart,
    meta: {
      hasLogin: false,
    }
  },
  {
    path: '/myBill/billType/index',
    component: BillType,
    meta: {
      hasLogin: false,
    }
  },
  {
    path: '/myBill/billInfo/index',
    component: BillInfo,
    meta: {
      hasLogin: false,
    }
  }
]

