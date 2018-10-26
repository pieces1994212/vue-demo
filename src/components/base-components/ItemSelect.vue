<template>
  <Select :value="val"
          v-on="selectListeners">
    <Option :value="''"></Option>
    <Option v-for="item in items"
            :value="parseInt(item.no)"
            :key="item.no">{{ item.name }}</Option>
  </Select>
</template>
<script>
export default {
  name: 'itemSelect',
  model: {
    prop: 'val',
    event: 'change'
  },
  data: function () {
    return {
      items: []
    }
  },
  props: ['codeSortId', 'val'],
  computed: {
    selectListeners: function () {
      var vm = this
      return Object.assign({},
        this.$listeners, {
          input: function (event) {
            vm.$emit('change', event)
          }
        }
      )
    }
  },
  created: function () {
    let _this = this
    _this.$axios.post('/pfpcode/loadItem',
      {
        'codeSortId': _this.codeSortId
      }).then(resp => {
      _this.items = resp.data
    })
  }
}
</script>
