<template>
  <div class="login-content">
    <div class="vue-logo">
      <img src="/img/logo.png">
    </div>
    <Form ref="formInline">
      <FormItem prop="user">
        <Input type="text"
               v-model="username"
               placeholder="Username">
        <Icon type="ios-person-outline"
              slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password"
               v-model="password"
               placeholder="Password">
        <Icon type="ios-lock-outline"
              slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary"
                @click="login">Login</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { initMenu } from '../utils/menu'
export default {
  name: 'Hello',
  data () {
    return {
      username: 'rcmrs',
      password: 'Sasseur123'
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    login () {
      let _this = this
      this.$axios.post('/login', { 'rollrock': _this.username, 'rockroll': _this.password }).then(resp => {
        if (resp.data.status === 'success') {
          // 这里模拟后台接口返回的菜单权限列表
          let routes = [{
            path: 'view/Welcome',
            name: 'welcome',
            url: '/'
          }, {
            path: 'view/Data',
            name: '仪表档案',
            url: 'data'
          }]
          initMenu(_this.$store, _this.$router, routes)
          // 将用户名commit到store
          _this.$store.commit({ type: 'base/loginSuccess', name: resp.data.username })
          // 加载用户信息
          _this.$store.dispatch('base/loadUserInfo')
          // store加载枚举
          _this.$store.dispatch('base/loadItem')
          // 路由跳转至home
          _this.$router.push('home')
          _this.$Message.success('登陆成功!')
        } else {
          _this.$Message.error(resp.data.message)
        }
      })
    }
  }
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.ivu-form-item {
  margin-bottom: 24px;
  vertical-align: top;
  zoom: 1;
  width: 330px;
  margin-left: calc(50% - 165px);
}
ul li {
  margin-right: 10px;
  list-style: none;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 1s;
}
.vue-logo {
  width: 200px;
  height: 200px;
  margin-left: calc(50% - 100px);
  margin-top: 160px;
  margin-bottom: 20px;
}
</style>
