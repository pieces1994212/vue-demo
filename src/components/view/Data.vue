<template>
  <div class="page-content"
       ref="content">
    <tree-box :resType="'meters'"
              @on-select-change="selectTree"></tree-box>
    <div class="tree-side">
      <div class="serach-area"
           ref="serachArea">
        <Row :gutter="8"
             class="m-b-10">
          <Col span="2">
          <span class="serach-label">仪表编号: </span>
          </Col>
          <Col span="4">
          <Input v-model="searchParam.bizNo"
                 clearable></Input>
          </Col>
          <Col span="3">
          <span class="serach-label">仪表名称: </span>
          </Col>
          <Col span="4">
          <Input v-model="searchParam.name"
                 clearable></Input>
          </Col>
          <Col span="3">
          <span class="serach-label">运行状态: </span>
          </Col>
          <Col span="4">
          <itemSelect v-model="searchParam.statusCode"
                      :codeSortId='1000000110000019'></itemSelect>
          </Col>
          <Col span="4">
          <ButtonGroup>
            <Button type="primary"
                    icon="ios-search"
                    label="large"
                    @click="search">搜索</Button>
            <Button type="primary"
                    :icon="serachControl.icon"
                    class="serach-plus"
                    label="large"
                    @click="showPlus"></Button>
          </ButtonGroup>
          </Col>
        </Row>
        <Row :gutter="8"
             class="m-b-10"
             v-show="serachControl.flag">
          <Col span="2">
          <span class="serach-label">终端名称:</span>
          </Col>
          <Col span="4">
          <Input v-model="searchParam.terminalName"
                 clearable></Input>
          </Col>
          <Col span="3">
          <span class="serach-label">终端编码:</span>
          </Col>
          <Col span="4">
          <Input v-model="searchParam.terminalNo"
                 clearable></Input>
          </Col>
          <Col span="3">
          <span class="serach-label">终端通信地址:</span>
          </Col>
          <Col span="4">
          <Input v-model="searchParam.terminalCommAddrChars"
                 clearable></Input>
          </Col>
        </Row>
        <Row :gutter="8"
             v-show="serachControl.flag">
          <Col span="2">
          <span class="serach-label">通信地址:</span>
          </Col>
          <Col span="4">
          <Input v-model="searchParam.commAddrChars"
                 clearable></Input>
          </Col>
          <Col span="3">
          <span class="serach-label">通信序号:</span>
          </Col>
          <Col span="4">
          <Input v-model="searchParam.commIndex"
                 clearable></Input>
          </Col>
        </Row>
      </div>
      <div class="data-area">
        <Table :columns="dataObj.columns"
               :data="dataObj.merList"
               :height="tableHeight"
               ref="table"></Table>
        <div class="data-page">
          <Page :total="searchParam.total"
                :page-size="searchParam.limit"
                :page-size-opts="searchParam.sizeOpts"
                size="small"
                @on-change="handlePage"
                @on-page-size-change='handlePageSize'
                show-sizer
                class="page" />
        </div>
      </div>
    </div>
    <data-modal :modalFlag='modifyModal'
                :meter='modifyObj'
                @modify-success='modifySuccess'
                @modal-cancel="modalCancel"></data-modal>
  </div>
</template>
<script>
import dataDetil from './DataDetils.vue'
import treeBox from '../base-components/treeBox.vue'
import dataModal from './DataModal.vue'
import itemSelect from '../base-components/ItemSelect.vue'
export default {
  name: 'databox',
  data () {
    return {
      searchParam: {
        total: 0,
        limit: 20,
        offset: 1,
        sizeOpts: [20, 50, 100]
      },
      serachControl: {
        icon: 'ios-arrow-down',
        flag: false
      },
      tableHeight: 0,
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
                      this.modify(params)
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
                      this.delete(params)
                    }
                  }
                }, '删除')
              ])
            },
            align: 'center'
          }
        ],
        merList: []
      },
      modifyModal: false,
      modifyObj: {}
    }
  },
  created: function () {
    // 从store获取当前组织号
    this.searchParam.orgNo = this.$store.state.base.orgNo
    this.search()
  },
  mounted: function () {
    const _this = this
    this.autoHeight()
    window.onresize = () => {
      return (() => {
        _this.autoHeight()
      })()
    }
  },
  computed: {
  },
  watch: {
    tableHeight (val) {
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
  methods: {
    autoHeight () {
      let serachHeight = this.$refs.serachArea.offsetHeight
      this.tableHeight = window.innerHeight - 130 - serachHeight
    },
    showPlus () {
      this.serachControl.flag = !this.serachControl.flag
      this.serachControl.icon = this.serachControl.flag ? 'ios-arrow-up' : 'ios-arrow-down'
      this.serachControl.flag ? this.tableHeight -= 74 : this.tableHeight += 74
    },
    modify (params) {
      this.modifyObj = { ...params.row }
      this.modifyModal = true
    },
    delete (params) {
      this.$Modal.confirm({
        title: '确定删除表计档案？',
        content: '</p><p>注意！确定删除后档案将不可恢复!</p>',
        loading: true,
        onOk: () => {
          let _this = this
          _this.$axios.post('/meterManage/deleteMeters',
            {
              'id': params.row.id
            }).then(resp => {
            if (resp.request.responseText === 'true') {
              _this.$Modal.remove()
              _this.$Message.success('表计档案：' + params.row.name + '删除成功!')
              _this.search()
            } else {
              _this.$Modal.remove()
              _this.$Message.error('操作错误!')
            }
          })
        }
      })
    },
    modifySuccess () {
      this.search()
      this.modifyModal = false
    },
    modalCancel () {
      this.modifyModal = false
    },
    search () {
      const _this = this
      this.$axios.post('/meterManage/querryMeterByOrg',
        _this.searchParam).then(resp => {
        if (resp) {
          _this.dataObj.merList = resp.data.rows
          _this.searchParam.total = resp.data.total
        } else {
          _this.dataObj.message = resp.data.message
        }
      })
    },
    handlePage (value) {
      this.searchParam.offset = value
      this.search()
    },
    handlePageSize (value) {
      this.searchParam.limit = value
      this.search()
    },
    selectTree (data) {
      this.searchParam.orgNo = data.no
      this.search()
    }
  },
  components: {
    treeBox,
    dataModal,
    itemSelect
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
