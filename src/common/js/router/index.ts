import router from "@/router";

/** 此文件的用法是，建议将编程式导航的路由跳转的逻辑整合到一起，避免重复性代码 */

/** 跳转到首页 */
export const gotoHomePage = () => {
  router.push(`/home`);
};
