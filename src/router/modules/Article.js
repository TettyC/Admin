import Layout from '@/layout/index'

export default {
  path: '/article',
  component: Layout,
  redirect: '/article/ranking',
  name: 'articleRanking',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/ranking',
      component: () => import('@/views/article-ranking/index'),
      name: 'articleRanking',
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking'
      }
    },
    {
      path: '/article/:id',
      component: () => import('@/views/article-detail/index'),
      name: 'articleDetail',
      meta: {
        title: 'articleDetail'
      }
    }
  ]
}
