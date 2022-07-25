import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/score',
    component: Layout,
    redirect: '/score/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/score'),
        meta: { title: 'Score', icon: 'form' },
      }
    ]

  },
  {
    path: '/moral',
    component: Layout,
    redirect: '/moral/moraleducation',
    children: [
      {
        path: 'moraleducation',
        name: 'MoralEducation',
        component: () => import('@/views/moraleducation'),
        meta: { title: 'Moral Education', icon: 'form' }
      }
    ]
  },
  {
    path: '/info',
    component: Layout,
    redirect: '/info/informationentry',
    children: [
      {
        path: 'informationentry',
        name: 'InformationEntry',
        component: () => import('@/views/informationentry'),
        meta: { title: 'Information Entry', icon: 'form' }
      }
    ]
  },
  // {
  //   path: '/discipline',
  //   component: Layout,
  //   redirect: '/discipline/attendance',
  //   meta: { title: 'Discipline', icon: 'form' },
  //   children: [
  //     {
  //       path: 'attendance',
  //       name: 'Attendance',
  //       component: () => import('@/views/discipline/attendance'),
  //       meta: { title: 'Attendance', icon: 'form' }
  //     },
  //     {
  //       path: 'daily',
  //       name: 'Daily',
  //       component: () => import('@/views/discipline/daily'),
  //       meta: { title: 'Daily', icon: 'form' }
  //     },
  //     {
  //       path: 'dining',
  //       name: 'Dining',
  //       component: () => import('@/views/discipline/dining'),
  //       meta: { title: 'Dining', icon: 'form' }
  //     },
  //     {
  //       path: 'flagraising',
  //       name: 'Flagraising',
  //       component: () => import('@/views/discipline/flagraising'),
  //       meta: { title: 'Flag Raising', icon: 'form' }
  //     },
  //     {
  //       path: 'late',
  //       name: 'Late',
  //       component: () => import('@/views/discipline/late'),
  //       meta: { title: 'Late', icon: 'form' }
  //     },
  //     {
  //       path: 'psychology',
  //       name: 'Psychology',
  //       component: () => import('@/views/discipline/psychology'),
  //       meta: { title: 'Psychology', icon: 'form' }
  //     },
  //     {
  //       path: 'punishment',
  //       name: 'Punishment',
  //       component: () => import('@/views/discipline/punishment'),
  //       meta: { title: 'Punishment', icon: 'form' }
  //     },
  //     {
  //       path: 'record',
  //       name: 'Record',
  //       component: () => import('@/views/discipline/record'),
  //       meta: { title: 'Record', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/appearance',
  //   component: Layout,
  //   redirect: '/appearance/normal/dress',
  //   meta: { title: 'Appearance', icon: 'form' },
  //   children: [
  //     {
  //       path: 'normal',
  //       name: 'Normal',
  //       component: () => import('@/views/appearance/normal'),
  //       meta: { title: 'Normal', icon: 'form' },
  //       redirect: '/appearance/normal/dress',
  //       children: [{
  //         path: 'dress',
  //         name: 'Dress',
  //         component: () => import('@/views/appearance/normal/dress'),
  //         meta: { title: 'Dress', icon: 'form' }
  //       },
  //       {
  //         path: 'hairstyle',
  //         name: 'Hairstyle',
  //         component: () => import('@/views/appearance/normal/hairstyle'),
  //         meta: { title: 'HairStyle', icon: 'form' }
  //       }, {
  //         path: 'uniform',
  //         name: 'Uniform',
  //         component: () => import('@/views/appearance/normal/uniform'),
  //         meta: { title: 'Uniform', icon: 'form' }
  //       }]
  //     }
  //   ]
  // },
  // {
  //   path: '/exercises',
  //   component: Layout,
  //   redirect: '/exercises/breakattendance',
  //   meta: { title: 'Exercises', icon: 'form' },
  //   children: [
  //     {
  //       path: 'breakattendance',
  //       name: 'Breakattendance',
  //       component: () => import('@/views/exercises/breakattendance'),
  //       meta: { title: 'Break Attendance', icon: 'form' }
  //     },
  //     {
  //       path: 'breakquality',
  //       name: 'Breakquality',
  //       component: () => import('@/views/exercises/breakquality'),
  //       meta: { title: 'Break Quality', icon: 'form' }
  //     },
  //     {
  //       path: 'eyeexercises',
  //       name: 'Eyeexercises',
  //       component: () => import('@/views/exercises/eyeexercises'),
  //       meta: { title: 'Eye Exercises', icon: 'form' }
  //     },
  //     {
  //       path: 'headmaster',
  //       name: 'Headmaster',
  //       component: () => import('@/views/exercises/headmaster'),
  //       meta: { title: 'Head Master', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/dormitory',
  //   component: Layout,
  //   redirect: '/dormitory/dormitorydiscipline',
  //   meta: { title: 'Dormitory', icon: 'form' },
  //   children: [
  //     {
  //       path: 'dormitorydiscipline',
  //       name: 'Dormitorydiscipline',
  //       component: () => import('@/views/dormitory/dormitorydiscipline'),
  //       meta: { title: 'Dormitory Discipline', icon: 'form' }
  //     },
  //     {
  //       path: 'interior',
  //       name: 'Interior',
  //       component: () => import('@/views/dormitory/interior'),
  //       meta: { title: 'Interior', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/environment',
  //   component: Layout,
  //   redirect: '/environment',
  //   meta: { title: 'Environment', icon: 'form' },
  //   children: [
  //     {
  //       path: 'public',
  //       name: 'Public',
  //       component: () => import('@/views/environment/public'),
  //       meta: { title: 'Public', icon: 'form' }
  //     },
  //     {
  //       path: 'rountine',
  //       name: 'Rountine',
  //       component: () => import('@/views/environment/routine'),
  //       meta: { title: 'Rountine', icon: 'form' }
  //     },
  //     {
  //       path: 'garbage',
  //       name: 'Garbage',
  //       component: () => import('@/views/environment/garbage'),
  //       meta: { title: 'Garbage', icon: 'form' }
  //     },
  //     {
  //       path: 'academicbuilding',
  //       name: 'Academicbuilding',
  //       component: () => import('@/views/environment/academicbuilding'),
  //       meta: { title: 'Academic Building', icon: 'form' }
  //     }

  //   ]
  // },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
