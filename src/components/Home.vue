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
                width="auto"
                :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                档案管理
              </template>
              <router-link to="/home/">
                <MenuItem name="1-1">Welcome</MenuItem>
              </router-link>
              <router-link to="/home/data">
                <MenuItem name="1-2">表计档案</MenuItem>
              </router-link>
              <MenuItem name="1-3">终端档案</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                Item 2
              </template>
              <MenuItem name="2-1">Option 1</MenuItem>
              <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                Item 3
              </template>
              <MenuItem name="3-1">Option 1</MenuItem>
              <MenuItem name="3-2">Option 2</MenuItem>
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
  methods: {
    loginOut () {
      this.$store.commit({ type: 'base/loginOut' })
      this.$router.push({ path: '/' })
    }
  }
}
</script>
