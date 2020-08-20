import router from '../router'
import store from '../store'
const noTokenName = ['login']
router.beforeResolve(async (to, from, next) => {
  const Authorization = store.getters.loginStatus
  const isUserRouter = store.getters.isUserRouter
  if (Authorization) {
    if (isUserRouter.length == 0) {
      try {
        const userRouter = await store.dispatch('getUserRouter')
        router.addRoutes(userRouter)
        next({ ...to })
      } catch (error) {
        store.commit('logOut')
        next('/login')
      }
    } else {
      next()
    }
  } else {
    if (noTokenName.some(item => item === to.name)) {
      return next()
    }
    next('/login')
  }
})
