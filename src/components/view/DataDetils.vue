<style scoped>
.expand-row {
  margin-bottom: 16px;
}
</style>
<template>
  <div>
    <Row>
      <Col span="6">
      <span class="expand-key">仪表编码: </span>
      <span class="expand-value">{{ obj.bizNo }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">仪表名称: </span>
      <span class="expand-value">{{ obj.name }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">组织单位: </span>
      <span class="expand-value">{{ obj.orgName }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">测量点号: </span>
      <span class="expand-value">{{ obj.commIndex }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="6">
      <span class="expand-key">测量点号: </span>
      <span class="expand-value">{{ obj.commIndex }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">通信地址: </span>
      <span class="expand-value">{{ obj.commAddr }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">ct: </span>
      <span class="expand-value">{{ obj.ct }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">测量点号: </span>
      <span class="expand-value">{{ obj.commIndex }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="6">
      <span class="expand-key">仪表编码: </span>
      <span class="expand-value">{{ obj.bizNo }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">仪表名称: </span>
      <span class="expand-value">{{ obj.name }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">组织单位: </span>
      <span class="expand-value">{{ obj.orgName }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">测量点号: </span>
      <span class="expand-value">{{ obj.commIndex }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="6">
      <span class="expand-key">测量点号: </span>
      <span class="expand-value">{{ obj.commIndex }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">通信地址: </span>
      <span class="expand-value">{{ obj.commAddr }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">ct: </span>
      <span class="expand-value">{{ obj.ct }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">测量点号: </span>
      <span class="expand-value">{{ obj.commIndex }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="6">
      <span class="expand-key">仪表编码: </span>
      <span class="expand-value">{{ obj.bizNo }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">仪表名称: </span>
      <span class="expand-value">{{ obj.name }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">组织单位: </span>
      <span class="expand-value">{{ obj.orgName }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">测量点号: </span>
      <span class="expand-value">{{ obj.commIndex }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="6">
      <span class="expand-key">测量点号: </span>
      <span class="expand-value">{{ obj.commIndex }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">通信地址: </span>
      <span class="expand-value">{{ obj.commAddr }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">ct: </span>
      <span class="expand-value">{{ obj.ct }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">测量点号: </span>
      <span class="expand-value">{{ obj.commIndex }}</span>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'dataDetils',
  props: {
    obj: Object
  }
}
</script>
