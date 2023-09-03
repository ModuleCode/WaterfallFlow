<template>
  <div class="login-container">
    <div class="login-content">
      <el-form ref="ruleFormRef" :label-position="labelPosition" :rules="rules" label-width="100px" :model="loginForm"
        :size="size">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            登录
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">清除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <login-bottom></login-bottom>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import tipsfx from '@/assets/tipsfx.mp3';
import { useSound } from '@vueuse/sound'
import LoginBottom from '@/components/LoginBottom.vue';

import userApi from '@/api/user.js'
import { useRouter } from 'vue-router';
const router = useRouter()

//label放的位置
const labelPosition = ref('top')
//label文字大小
const size = ref('large')

const ruleFormRef = ref()

//数据
const loginForm = reactive({
  username: '',
  password: '',

})
const { play } = useSound(tipsfx)
const rules = reactive({
  username: [{
    required: true,
    message: "请必须填写此项",
    trigger: 'change',
  }, { min: 3, max: 15, message: '用户名长度必须为3-15位', trigger: 'blur' }],
  password: [{
    required: true,
    message: "请必须填写此项",
    trigger: 'change',
  }]

})
// 提交表单
function submitForm(ruleFormRef) {
  ruleFormRef.validate((valid, fields) => {
    if (!valid) { play(); return };
    userApi.loginByUsername({
      username: loginForm.username,
      password: loginForm.password
    }).then(res => {
      localStorage.setItem("token", res.data.token)
      router.replace({path:'/'})
    }).catch(error => {
      play()
    })

  })
}
// 重置表单
function resetForm(ruleFormRef) {
  ruleFormRef.resetFields()
}

</script>

<style scoped>
.login-container {}

.login-content {
  padding: 13px;

}
</style>