import { allRouters, permission1, permission2 } from '@/config/router'

export function handleUserPath(ruleNum) {
  switch (ruleNum) {
    case 0:
      return handleRules(permission2)
    case 1:
      return handleRules(permission1)
  }
}

/**
 *
 * @param {路由列表 Array} pathList
 */
function handleRules(pathList) {
  pathList.forEach(item => {
    item.component = () => import('@/views/Home')
    if (item.children) {
      const list = item.children
      list.forEach(li => {
        li.component = () => import(`@/views/${li.name}`)
      })
    }
  })
  return pathList
}
