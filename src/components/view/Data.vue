<template>
  <div id="databox">
    <Table :columns=" dataObj.columns"
           :data="dataObj.merList"></Table>
    <Page :total="dataObj.total"
          :page-size="dataObj.limit"
          :page-size-opts="dataObj.sizeOpts"
          @on-change="handlePage"
          @on-page-size-change='handlePageSize'
          show-sizer />
  </div>
</template>

<script>
export default {
  name: 'databox',
  data () {
    return {
      dataObj: {
        columns: [
          {
            title: '编号',
            key: 'bizNo'
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '组织单位',
            key: 'orgName'
          }
        ],
        merList: [],
        total: 0,
        limit: 10,
        offset: 1,
        sizeOpts: [10, 20, 40, 99]
      }
    }
  },
  created: function () {
    this.search()
  },
  computed: {
    loginName: function () {
      return window.sessionStorage.getItem('user')
    }
  },
  methods: {
    search () {
      let _this = this
      this.$axios.post('/meterManage/querryMeterByOrg',
        this.qs.stringify({
          'orgNo': 10,
          'limit': _this.dataObj.limit,
          'offset': _this.dataObj.offset
        })).then(resp => {
        if (resp) {
          _this.dataObj.merList = resp.data.rows
          _this.dataObj.total = resp.data.total
        } else {
          _this.dataObj.message = resp.data.message
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    handlePage (value) {
      this.dataObj.offset = value
      this.search()
    },
    handlePageSize (value) {
      this.dataObj.limit = value
      this.search()
    }
  }
}
</script>
<style scoped>
.fadeaaa-enter-active,
.fadeaaa-leave-active {
  transition: opacity 0.8s;
}
.fadeaaa-enter, .fadeaaa-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
ul li {
  list-style: none;
}
</style>
