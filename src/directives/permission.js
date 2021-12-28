import store from '@/store'

const checkPermission = (el, binding) => {
  const { value } = binding
  const points = store.getters.userInfo.permission.points
  if (value && value instanceof Array) {
    const hasPermisson = points.some((point) => value.includes(point))

    if (!hasPermisson) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value is ["admin","editor" ...]')
  }
}

export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
