import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/home",
    component: () => import("@/views/Home"),
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        component: () => import("@/views/Welcome"),
      },
      {
        path: "/users",
        component: () => import("@/views/Users"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  // 如果访问的是登录页，直接放行
  if (to.path === "/login") return next();
  // 从 sesstionStorage 中获取保存的token值
  const tokenStr = window.sessionStorage.getItem("token");
  // 没有token，强制跳转到登录页
  if (!tokenStr) return next("/login");
  next();
});

export default router;
