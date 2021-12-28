import Layout from '@/layout/index'

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/manage',
  name: 'roleList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/role',
      component: () => import('@/views/role-list/index'),
      name: 'userRole',
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
}
