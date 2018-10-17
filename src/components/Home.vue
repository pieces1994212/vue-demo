<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.log-out-btn {
  float: right;
  margin-top: 16px;
}
.ivu-layout {
  height: 100%;
}
.ivu-menu-light {
  height: 100%;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Button type="error"
                class="log-out-btn"
                icon="md-exit"
                shape="circle"
                @click="loginOut"></Button>
      </Header>
      <Layout>
        <Sider hide-trigger
               :style="{background: '#fff'}">
          <Menu theme="light"
                width="auto">
            <Submenu :name="item.name"
                     v-for="item in routes"
                     :key="item.name">
              <template slot="title">
                <Icon :type="item.icon"></Icon>
                {{item.name}}
              </template>
              <MenuItem v-for="citem in item.child"
                        :key="citem.path"
                        :name="citem.path"
                        :to="citem.path">{{citem.name}}</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout>
          <!-- <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb> -->
          <Content :style="{padding: '10px', height: '100%', background: '#f3f3f4'}">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  name: 'home',
  data: function () {
    return {
      routes: [
        {
          name: '档案管理',
          icon: 'ios-navigate',
          child: [
            {
              name: 'welcome',
              path: '/home/'
            },
            {
              name: '仪表档案',
              path: '/home/data'
            }, {
              name: '终端档案',
              path: '/home/ter'
            }
          ]
        }, {
          name: '抄表数据',
          icon: 'ios-keypad',
          child: [
            {
              name: '数据统计',
              path: '/home/ter1'
            },
            {
              name: '数据报表',
              path: '/home/ter2'
            }, {
              name: '数据分析',
              path: '/home/ter3'
            }
          ]
        }
      ]
    }
  },
  methods: {
    loginOut () {
      this.$store.commit({ type: 'base/loginOut' })
      this.$router.push({ path: '/' })
    }
  }
}
</script>
