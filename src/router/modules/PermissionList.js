import Layout from '@/layout/index'

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/manage',
  name: 'permissionList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/permission',
      component: () => import('@/views/permission-list/index'),
      name: 'userPermission',
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}
