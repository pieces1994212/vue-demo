<template>
  <div class="tree-box">
    <tree v-bind="$attrs"
          :data="treeData"
          @on-select-change="onSelect"
          :render="renderContent"
          ref='tree'>
    </tree>
  </div>
</template>
<script>
export default {
  name: 'treeBox', // 根据业务需要将iView中tree组件二次封装
  inheritAttrs: false, // 禁用特性继承，利用$attrs获取父组件传入特性绑定到tree上，保证插件原有multiple，show-checkbox等特性正常使用
  data: function () {
    return {
      orgNo: this.$store.state.base.orgNo,
      treeType: this.resType,
      treeData: [],
      selectedNode: '',
      hoverNode: ''
    }
  },
  props: {
    resType: String,
    isMutiple: Boolean
  },
  methods: {
    onSelect (data) {
      this.$emit('on-select-change', data)
    },
    renderContent (h, { root, node, data }) {
      let isSelected = false
      let isHover = false
      if (this.selectedNode === node.nodeKey) {
        isSelected = true
      }
      if (this.hoverNode === node.nodeKey) {
        isHover = true
      }
      let iconSrc = ''
      switch (parseInt(data.type)) {
        case 796:
          iconSrc = 'img/jsTree/town.png'
          break
        case 798:
          iconSrc = 'img/jsTree/building.png'
          break
        case 799:
          iconSrc = 'img/jsTree/floor.png'
          break
      }
      return h('a', {
        class: {
          treeSpan: true,
          treeSelected: isSelected,
          treeHover: isHover
        },
        on: {
          click: (event) => {
            this.selectedNode = node.nodeKey
            this.$emit('on-select-change', data)
          },
          mouseover: (event) => {
            this.hoverNode = node.nodeKey
          },
          mouseleave: (event) => {
            this.hoverNode = ''
          }
        }
      }, [
        h('img', {
          attrs: {
            src: iconSrc
          },
          class: {
            treeLogo: 'true'
          }
        }),
        h('a', {
          style: {
            display: 'inline-block'
          }
        }, [h('span', {
          class: {
            treeSpanName: true
          }
        }, data.text)])
      ])
    }
  },
  mounted: function () {
    let _this = this
    let queryUrl = ''
    if (_this.treeType && _this.treeType === 'meters') {
      queryUrl = '/jsTreeFactory/queryOrgTree'
    }
    _this.$axios.post(queryUrl,
      _this.qs.stringify({
        'no': _this.orgNo
      })).then(resp => {
      let ary = []
      ary.push(resp.data)
      _this.treeData = ary
    }).catch(function (error) {
      console.log(error)
    })
    this.selectedNode = 0
  }
}
</script>
<style>
.tree-box {
  float: left;
  width: 200px;
  height: 100%;
  text-align: left;
  font-size: 14px;
  overflow: auto;
  margin-right: 10px;
  border: 1px solid #dcdee2;
  padding: 8px;
  background-color: #ffffff;
}
.treeLogo {
  margin-right: 2px;
  position: relative;
  top: 2px;
  width: 15px;
  height: 15px;
}
.treeSpan {
  border-radius: 2px;
  border: 0px;
  padding: 1px 6px;
  line-height: 12px;
  border-radius: 4px;
  color: #515a6e;
  height: 22px;
  display: inline-block;
}
.treeSelected {
  background-color: #bee1ff;
}
.treeHover {
  background-color: #d1e5f7;
}
.treeSpanName {
  font-size: 12px;
  position: relative;
  bottom: 1px;
  color: #515a6e;
}
.ivu-tree ul li {
  margin: 2px 0px;
}
</style>
