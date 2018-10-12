<template>
  <div class="tree-box">
    <tree :data="treeData">
    </tree>
  </div>
</template>
<script>
export default {
  name: 'treeBox',
  data: function () {
    return {
      treeType: this.resType,
      treeData: []
    }
  },
  props: {
    resType: String
  },
  mounted: function () {
    let vm = this
    if (vm.treeType && vm.treeType === 'meters') {
      vm.treeData = [
        {
          title: '南京未来科技城',
          expand: true,
          children: [
            {
              title: '创服8号楼',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: '创服9号楼',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
<style scoped>
</style>
