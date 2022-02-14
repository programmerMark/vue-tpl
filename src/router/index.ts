import { createRouter, createWebHistory } from "vue-router";

/**
 * 实现路由懒加载的工具函数
 * @param {string} viewPath  view的相对路径，相对于src目录
 */
function lazyLoad(viewPath: string) {
  const modules = import.meta.glob("../views/**/*.vue");
  return modules[`../views/${viewPath}/index.vue`];
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: lazyLoad("home"),
    },
    {
      path: "/demo",
      name: "demo",
      component: lazyLoad("demo"),
    },
  ],
});

export default router;
