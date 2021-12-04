import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局样式
import '@/styles/index.scss'
// 导入 svgIcon
import installIcons from '@/icons'
// 全局安装ElementPlus
import installElementPlus from '@/plugins/element'
// 全局属性fliter
import installFilter from '@/filters'
// 导入路由鉴权
import '@/permission'
import i18n from '@/i18n'

const app = createApp(App)
installIcons(app)
installFilter(app)
installElementPlus(app)
app.use(store).use(router).use(i18n).mount('#app')
