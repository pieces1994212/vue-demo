import N404 from '../components/404'

export const initMenu = (store, router, routes) => {
  let fmRouter = fomatRoutes(routes)
  let extendsRoutes = [{
    path: '/home',
    name: 'home',
    component: (resolve) => require(['../components/Home'], resolve),
    children: fmRouter
  }]
  router.addRoutes(extendsRoutes)
  store.commit({
    type: 'base/addRoutes',
    list: extendsRoutes
  })
}

export const fomatRoutes = (routes) => {
  let fmRoutes = []
  routes.forEach(router => {
    let fmRouter = {
      name: router.name,
      path: router.url,
      component: (resolve) => require(['../components/' + router.path + '.vue'], resolve)
    }
    fmRoutes.push(fmRouter)
  })
  // 添加home子路由的404
  let route404 = {
    name: 'home404',
    path: '*',
    component: N404
  }
  fmRoutes.push(route404)
  return fmRoutes
}
