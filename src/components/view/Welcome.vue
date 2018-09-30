<template>
  <span>welcome! my friend! {{username}}!</span>
</template>
<script>
export default {
  name: 'welcome',
  data: function () {
    return {
    }
  },
  computed: {
    username: function () {
      return this.$store.state.base.loginName
    }
  }
}
</script>
<!-- styling for the component -->
<style>
#about {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
