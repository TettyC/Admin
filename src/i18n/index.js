import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh'
import enLocale from './lang/en'
import store from '@/store'
// import { getItem } from '@/utils/storage'
// import { LANG } from '@/constant'

const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

// const locale = getItem(LANG) || 'zh'
const getLanguage = () => store?.getters?.language

const i18n = createI18n({
  // 使用 composition Api
  legacy: false,
  // 全局t函数
  globalInjection: true,
  locale: getLanguage(),
  messages
})

export default i18n
