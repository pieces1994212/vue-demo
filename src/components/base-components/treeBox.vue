<template>
  <div class="tree-box">
    <tree v-bind="$attrs"
          :data="treeData"
          @on-select-change="onSelect"
          :render="renderContent">
    </tree>
  </div>
</template>
<script>
export default {
  name: 'treeBox', // 根据业务需要将iView中tree组件二次封装
  inheritAttrs: false, // 禁用特性继承，利用$attrs获取父组件传入特性绑定到tree上，保证插件原有multiple，show-checkbox等特性正常使用
  data: function () {
    return {
      treeType: this.resType,
      treeData: [],
      selectedNode: ''
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
      if (this.selectedNode === node.nodeKey) {
        isSelected = true
      }
      let iconSrc = ''
      switch (data.type) {
        case 1:
          iconSrc = 'img/jsTree/town.png'
          break
        case 2:
          iconSrc = 'img/jsTree/building.png'
          break
        case 3:
          iconSrc = 'img/jsTree/floor.png'
          break
      }
      return h('div', {
        class: {
          treeSpan: true,
          treeSelected: isSelected
        },
        on: {
          click: (event) => {
            this.selectedNode = node.nodeKey
            this.$emit('on-select-change', data)
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
        }, data.title)])
      ])
    }
  },
  mounted: function () {
    let vm = this
    if (vm.treeType && vm.treeType === 'meters') {
      vm.treeData = [
        {
          title: '南京未来科技城',
          expand: true,
          type: 1,
          orgNo: 3201,
          children: [
            {
              title: '创服8号楼',
              orgNo: 32011,
              type: 2,
              expand: true,
              children: [
                {
                  title: '1层',
                  type: 3,
                  orgNo: 320111
                },
                {
                  title: '2层',
                  type: 3,
                  orgNo: 320112
                }
              ]
            },
            {
              title: '创服9号楼',
              expand: true,
              orgNo: 32012,
              type: 2,
              children: [
                {
                  title: '1层',
                  type: 3,
                  orgNo: 320121
                },
                {
                  title: '2层',
                  type: 3,
                  orgNo: 320122
                }
              ]
            }
          ]
        }
      ]
    }
    // vm.$axios.post('/jsTreeFactory/queryOrgTree',
    //   vm.qs.stringify({
    //     'no': 101
    //   })).then(resp => {
    //   vm.treeData = resp.data
    // }).catch(function (error) {
    //   console.log(error)
    // })
  }
}
</script>
<style>
.treeLogo {
  margin: 0 2px;
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
.treeSpanName {
  font-size: 12px;
  position: relative;
  bottom: 1px;
  color: #515a6e;
}
</style>
