<template>
    <div class="login-container">
        <div class="login-content">
            <el-form ref="ruleFormRef" :label-position="labelPosition" :rules="rules" label-width="100px" :model="loginForm"
                :size="size">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginForm.email" />
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
import LoginBottom from '@/components/LoginBottom.vue';
import { useSound } from '@vueuse/sound'
import tipsfx from '@/assets/tipsfx.mp3';
import { isEmail } from '@/tools/validate.js'
//label放的位置
const labelPosition = ref('top')
//label文字大小
const size = ref('large')

const ruleFormRef = ref()
const { play } = useSound(tipsfx)

//数据
const loginForm = reactive({
    email: '',
    password: '',

})

const validateEmail = (rule, value, callback) => {
    if (!isEmail(value)) {
        callback(new Error('邮箱格式错误'))
    } else {
        callback()
    }
}


const rules = reactive({
    email: [{
        required: true,
        message: "请必须填写此项",
        trigger: 'change',
    }, { validator: validateEmail }],
    password: [{
        required: true,
        message: "请必须填写此项",
        trigger: 'change',
    }]

})

function submitForm(ruleFormRef) {
    ruleFormRef.validate((valid, fields) => {
        if (!valid) {
            play()
            console.log('error submit!', fields)
        }
        
    })
}
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