<template>
  <div id="databox">
    <Table :columns=" dataObj.columns"
           :data="dataObj.merList"
           height="800"></Table>
    <Page :total="dataObj.total"
          :page-size="dataObj.limit"
          :page-size-opts="dataObj.sizeOpts"
          @on-change="handlePage"
          @on-page-size-change='handlePageSize'
          show-sizer
          class="page" />
  </div>
</template>

<script>
import dataDetil from './DataDetils.vue'
export default {
  name: 'databox',
  data () {
    return {
      dataObj: {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(dataDetil, {
                props: {
                  obj: params.row
                }
              })
            }
          },
          {
            title: '编号',
            width: 100,
            key: 'bizNo',
            align: 'center'
          },
          {
            title: '名称',
            width: 300,
            key: 'name',
            align: 'center'
          },
          {
            title: '组织单位',
            width: 300,
            key: 'orgName',
            align: 'center'
          }, {
            title: '所属终端',
            width: 300,
            key: 'terminalName',
            align: 'center'
          }, {
            title: '测量点号',
            width: 300,
            key: 'commIndex',
            align: 'center',
            filters: [
              {
                label: '> 20',
                value: 1
              },
              {
                label: '<= 20',
                value: 2
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              if (value === 1) {
                return row.commIndex > 20
              } else if (value === 2) {
                return row.commIndex <= 20
              }
            }
          }, {
            title: '通信地址',
            width: 300,
            key: 'commAddr',
            align: 'center',
            sortable: true
          }, {
            title: '操作',
            width: 200,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'md-create'
                  },
                  style: {
                    marginRight: '5px'
                  }
                }, 'Edit'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash'
                  }
                }, 'Delete')
              ])
            },
            align: 'center'
          }
        ],
        merList: [],
        total: 0,
        limit: 20,
        offset: 1,
        sizeOpts: [20, 50, 100]
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
.page {
  float: right;
}
</style>
