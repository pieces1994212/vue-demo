<template>
  <Modal v-model="flag"
         draggable
         scrollable
         title="修改仪表档案"
         width="600"
         @on-cancel="cancel">
    <Row :gutter="16"
         class="m-b-10">
      <Col span="4">
      <span class="span-key">编号: </span>
      </Col>
      <Col span="8">
      <Input v-model="mer.bizNo"
             disabled></Input>
      </Col>
      <Col span="4">
      <span class="span-key">名称: </span>
      </Col>
      <Col span="8">
      <Input v-model="mer.name"
             clearable></Input>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col span="4">
      <span class="span-key">运行状态</span>
      </Col>
      <Col span="8">
      <itemSelect v-model="mer.statusCode"
                  :codeSortId='1000000110000019'></itemSelect>
      </Col>
      <Col span="4">
      <span class="span-key">测量点号: </span>
      </Col>
      <Col span="8">
      <Input v-model="mer.commIndex"></Input>
      </Col>
    </Row>
    <div slot="footer">
      <Button type="primary"
              size="large"
              @click="modify"
              icon="md-checkmark"
              :loading="isLoading">保存</Button>
    </div>
  </Modal>
</template>
<script>
import itemSelect from '../base-components/ItemSelect.vue'
export default {
  meter: 'dataModal',
  props: {
    meter: Object,
    modalFlag: Boolean
  },
  data: function () {
    return {
      isLoading: false
    }
  },
  computed: {
    flag: {
      get: function () {
        return this.modalFlag
      },
      set: function () {
      }
    },
    mer: {
      get: function () {
        return { ...this.meter } // 使用深复制，浅复制在修改时会影响父组件中数据
      },
      set: function () {
      }
    }
  },
  methods: {
    modify () {
      let _this = this
      _this.isLoading = true // 按钮进入加载状态
      _this.$axios.post('/meterManage/modifyMeter',
        {
          'id': _this.mer.id,
          'name': _this.mer.name,
          'statusCode': _this.mer.statusCode,
          'commIndex': _this.mer.commIndex,
          'eqpCode': _this.mer.eqpCode,
          'terminalId': _this.mer.terminalId
        }).then(resp => {
        if (resp.data === true) {
          _this.$emit('modify-success')
          _this.isLoading = false
          _this.$Message.success('修改成功！')
        } else {
          _this.isLoading = false
          _this.$Message.error('操作失败！')
        }
      }).catch(function (error) {
        console.log(error)
        _this.isLoading = false
        _this.$Message.error('发生错误！')
      })
    },
    cancel () {
      this.$emit('modal-cancel')
    }
  },
  components: {
    itemSelect
  }
}
</script>
<style>
</style>
