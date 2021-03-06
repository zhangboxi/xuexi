import Vue from "vue";
import Router from "vue-router";
import findLast from "lodash/findLast";
import NotFound from "./views/404.vue";
import { notification } from "ant-design-vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { check, isLogin } from "./utils/auth";
Vue.use(Router);

const router = new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      hideInMenu: true,
      redirect: "/user/login"
    },
    {
      path: "/user",
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "user" */ "./layouts/UserLayout"),
      children: [
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Login")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "register" */ "./views/User/Register")
        }
      ]
    },
    {
      path: "/AllMenu",
      meta: { authority: ["guest", "user", "admin"] },
      component: () =>
        import(/* webpackChunkName: "layouts" */ "./layouts/BasicLayout"),
      children: [
        {
          path: "/first",
          name: "first html",
          meta: { icon: "dashboard", title: "首页" },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/first/firstview1",
              name: "first",
              meta: { title: "首页1" },
              component: () =>
                import(
                  /* webpackChunkName: "first" */ "./views/FirstView/firs1t"
                )
            }
          ]
        },
        // dashboard
        // {
        //   path: "/",
        //   redirect: "/user/login"
        // },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: { icon: "dashboard", title: "仪表盘" },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              meta: { title: "分析页" },
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis"
                )
            }
          ]
        },
        // form
        {
          path: "/form",
          name: "form",
          meta: {
            icon: "form",
            title: "表单",
            authority: ["guest", "user", "admin"]
          },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              meta: {
                title: "基础表单",
                authority: ["guest", "admin"]
              },
              component: () =>
                import(/* webpackChunkName: "from" */ "./views/Forms/BasicForm")
            },
            {
              path: "/form/step-form",
              name: "stepform",
              meta: { title: "分布表单" },
              hideChildrenInMenu: true,
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm"),
              children: [
                {
                  path: "/form/step-form",
                  redirect: "/form/step-form/info"
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1"
                    )
                },
                {
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2"
                    )
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3"
                    )
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "*",
      name: "404",
      hideInMenu: true,
      component: NotFound
    },
    {
      path: "/403",
      name: "403",
      hideInMenu: true,
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "你没有权限访问，请联系管理员咨询。"
      });
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
