import Layout from '@/layout/index'

export default {
  path: '/article',
  component: Layout,
  redirect: '/article/ranking',
  name: 'articleCreate',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/create',
      component: () => import('@/views/article-create/index'),
      name: 'articleCreate',
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      component: () => import('@/views/article-create/index'),
      name: 'articleEditor',
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}
