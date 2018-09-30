export const initMenu = (store, router, routes) => {
  let fmRouter = fomatRoutes(routes)
  let extendsRoutes = [{
    path: '/home',
    name: 'home',
    component: (resolve) => require(['../components/Home'], resolve),
    children: fmRouter
  }, {
    path: '*',
    redirect: '/404'
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
  return fmRoutes
}
