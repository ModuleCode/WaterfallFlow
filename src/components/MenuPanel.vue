<template>
  <div class="menu-panel-container">
    <div class="menu-panel-content">
      <el-tabs v-model="activeName" class="demo-tabs" type="card" @tab-click="handleClick" tabPosition="top" stretch="true">
        <!-- 搜索 -->
        <el-tab-pane label="搜索" name="search">
          <search-card></search-card>
        </el-tab-pane>


        <!-- 个人信息 -->
        <el-tab-pane label="个人信息" name="userinfo">
          <user-info>
            <div style="display: flex; ">
              <el-button style="flex: 1;" type="danger" plain @click="logout">退出登录</el-button>
            </div>
          </user-info>
        </el-tab-pane>
        <!-- 设置 -->
        <el-tab-pane label="设置" name="setting">
          <setting display="true"></setting>
        </el-tab-pane>
        <!-- 关于 -->
        <el-tab-pane label="关于" name="about">Task</el-tab-pane>

      </el-tabs>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UserInfo from "./UserInfo.vue";
import Setting from "@/components/Setting.vue";
import { useRouter } from "vue-router";
import SearchCard from "./SearchCard.vue";
const router=useRouter()


const activeName = ref('search')

const handleClick = (tab, event) => {
  console.log(tab, event)
}


function logout() {
  localStorage.clear("token")
  router.replace('/loginu')
}
</script>

<style>
.menu-panel-container {
  max-width: 600px;
  margin: 0 auto;
}

.menu-panel-content {
  justify-content: center;
  align-items: center;
}

.menu-panel-content div {}
</style>