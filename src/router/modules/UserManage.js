import Layout from '@/layout/index'

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/manage',
  name: 'userManage',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/manage',
      component: () => import('@/views/user-manage/index'),
      ame: 'userManage',
      meta: {
        title: 'userManage',
        icon: 'personnel-manage'
      }
    },
    {
      path: '/user/info/:id',
      component: () => import('@/views/user-info/index'),
      name: 'userInfo',
      props: true,
      meta: {
        title: 'userInfo'
      }
    },
    {
      path: '/user/import',
      component: () => import('@/views/import/index'),
      name: 'import',
      meta: {
        title: 'excelImport'
      }
    }
  ]
}
