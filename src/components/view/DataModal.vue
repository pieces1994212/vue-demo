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
      <Input v-model="meter.bizNo"
             disabled></Input>
      </Col>
      <Col span="4">
      <span class="span-key">名称: </span>
      </Col>
      <Col span="8">
      <Input v-model="meter.name"></Input>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col span="4">
      <span class="span-key">运行状态</span>
      </Col>
      <Col span="8">
      <itemSelect v-model="meter.statusCode"
                  :codeSortId='1000000110000019'></itemSelect>
      </Col>
      <Col span="4">
      <span class="span-key">测量点号: </span>
      </Col>
      <Col span="8">
      <Input v-model="meter.commIndex"></Input>
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
    }
  },
  methods: {
    modify () {
      let _this = this
      _this.isLoading = true // 按钮进入加载状态
      _this.$axios.post('/meterManage/modifyMeter',
        _this.qs.stringify({
          'id': _this.meter.id,
          'name': _this.meter.name,
          'statusCode': _this.meter.statusCode,
          'commIndex': _this.meter.commIndex,
          'eqpCode': _this.meter.eqpCode,
          'terminalId': _this.meter.terminalId
        })).then(resp => {
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
