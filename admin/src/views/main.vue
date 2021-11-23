<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router>
        <el-sub-menu index="1">
          <template #title>
              <el-icon><message /></el-icon>内容管理
          </template>
          <el-menu-item-group>
            <template #title>分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>