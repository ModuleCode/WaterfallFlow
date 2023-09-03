<template>
  <div class="menu-panel-container">
    <div class="menu-panel-content">
      <el-tabs v-model="activeName" class="demo-tabs" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="个人信息" name="userinfo">
          <user-info>
            <div style="display: flex; ">
              <el-button style="flex: 1;" type="danger" plain @click="logout">退出登录</el-button>
            </div>
          </user-info>
        </el-tab-pane>

        <el-tab-pane label="设置" name="setting">
          <setting display="true"></setting>

        </el-tab-pane>
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
const router=useRouter()


const activeName = ref('userinfo')

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