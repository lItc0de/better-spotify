export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/Views/Home.vue'),
    meta: { auth: true },
  },
];
