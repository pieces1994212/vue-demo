<template>
  <label>{{labelName}}:
    <Input :type="type"
           v-bind="$attrs"
           :value="val"
           v-on="inputListeners" />
  </label>
</template>
<script>
export default {
  name: 'baseInput',
  model: {
    prop: 'val',
    event: 'input'
  },
  props: {
    labelName: {
      type: String
    },
    val: {
      type: String
    },
    type: {
      type: String
    }
  },
  computed: {
    inputListeners: function () {
      var vm = this
      return Object.assign({},
        this.$listeners, {
          input: function (event) {
            vm.$emit('input', event)
          }
        }
      )
    }
  }
}
</script>
