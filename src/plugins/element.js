import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCN from 'element-plus/es/locale/lang/zh-cn'
import enUS from 'element-plus/es/locale/lang/en'
import { getItem } from '@/utils/storage'
import { LANG } from '@/constant'
import store from '@/store'

const language = getItem(LANG) || store.getters.language

export default (app) => {
  app.use(ElementPlus, {
    locale: language === 'en' ? enUS : zhCN
  })
}
