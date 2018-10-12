<template>
  <div class="page-content"
       ref="content">
    <tree-box :resType="treeType"></tree-box>
    <div class="tree-side">
      <Table :columns="dataObj.columns"
             :data="dataObj.merList"
             :height="tableHeight"
             ref="table"></Table>
      <Page :total="dataObj.total"
            :page-size="dataObj.limit"
            :page-size-opts="dataObj.sizeOpts"
            size="small"
            @on-change="handlePage"
            @on-page-size-change='handlePageSize'
            show-sizer
            class="page" />
    </div>
  </div>
</template>

<script>
import dataDetil from './DataDetils.vue'
import treeBox from '../base-components/treeBox.vue'
export default {
  name: 'databox',
  data () {
    return {
      treeType: 'meters',
      tableHeight: window.innerHeight - 115,
      dataObj: {
        columns: [
          {
            type: 'selection',
            width: 50,
            align: 'center'
          },
          {
            type: 'expand',
            width: 10,
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
            key: 'bizNo',
            width: 150,
            align: 'center'
          },
          {
            title: '组织单位',
            width: 150,
            key: 'orgName',
            align: 'center'
          },
          {
            title: '名称',
            width: 150,
            key: 'name',
            align: 'center'
          }, {
            title: '测量点号',
            width: 150,
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
            width: 150,
            key: 'commAddr',
            align: 'center',
            sortable: true
          }, {
            title: '运行状态',
            width: 150,
            key: 'name',
            align: 'center',
            render: (h, params) => {
              return h('Span', {
              }, window.localStorage.getItem('item' + params.row.statusCode))
            }
          }, {
            title: '终端名称',
            width: 150,
            key: 'terminalName',
            align: 'center'
          }, {
            title: '终端编码',
            width: 150,
            key: 'terminalNo',
            align: 'center'
          }, {
            title: '生成厂家',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('Span', {
              }, window.localStorage.getItem('item' + params.row.prodFactoryCode))
            }
          }, {
            title: '操作',
            width: 180,
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
                    marginRight: '5px',
                    minWidth: '60px'
                  },
                  on: {
                    click: () => {
                      this.show(params)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash'
                  },
                  style: {
                    marginRight: '5px',
                    minWidth: '60px'
                  },
                  on: {
                    click: () => {
                      this.confirm(params)
                    }
                  }
                }, '删除')
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
  mounted: function () {
    const vm = this
    window.onresize = () => {
      return (() => {
        vm.tableHeight = window.innerHeight - 115
      })()
    }
  },
  computed: {
    loginName: function () {
      return window.sessionStorage.getItem('user')
    }
  },
  methods: {
    show (params) {
      // 修改弹框
    },
    confirm (params) {
      debugger
      this.$Modal.confirm({
        title: '确定删除表计档案？',
        content: '<p>表计编码 : ' + params.row.bizNo + '</p><p>表计名称 : ' + params.row.name + '</p><p>组织单位 : ' + params.row.orgName + '</p><p>注意！确定删除后档案将不可恢复!</p>',
        onOk: () => {
          this.delete(params)
        }
      })
    },
    delete (params) {
      const _this = this
      this.$axios.post('/meterManage/deleteMeters',
        this.qs.stringify({
          'id': params.row.id
        })).then(resp => {
        debugger
        if (resp.request.responseText === 'true') {
          _this.$Message.success('表计档案：' + params.row.name + '删除成功!')
          _this.search()
        } else {
          _this.$Message.error('操作错误!')
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    search () {
      const _this = this
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
  },
  watch: {
    fullHeight (val) {
      if (!this.timer) {
        this.tableHeight = val
        this.timer = true
        let that = this
        setTimeout(function () {
          that.timer = false
        }, 300)
      }
    }
  },
  components: {
    treeBox
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
