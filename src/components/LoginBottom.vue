<template>
    <div class="login-bottom-container">
        <el-drawer v-model="drawerOtherLogin" title="其他方式登录" :direction="direction" :with-header="false">
        </el-drawer>
        <el-drawer v-model="drawerMore" title="更多选项" :direction="direction" :with-header="false">
        </el-drawer>
        <div class="login-bottom-content">
            <div class="item-box" @click="drawerOtherLogin = true">
                <div class="icon">
                    <img src="@/assets/user.svg" alt="">
                </div>
                <span class="text">其他方式</span>
            </div>
            <div class="item-box">
                <div class="icon">
                    <img src="@/assets/add.svg" alt="">
                </div>
                <span class="text">新用户注册</span>
            </div>
            <div class="item-box" @click="drawerMore = true">
                <div class="icon">
                    <img src="@/assets/more.svg" alt="">
                </div>
                <span class="text">更多选项</span>
            </div>

        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
const drawerOtherLogin = ref(false)
const drawerMore = ref(false)
const direction = ref('btt')
</script>
<style scoped>
.login-bottom-container {
    width: 100%;
    position: absolute;
    display: flex;
    bottom: 10px;
}

.login-bottom-content {
    flex: 1;
    padding: 10px;
    display: flex;
    justify-content: space-around;
}

.item-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.item-box .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    border: 1px solid #57505073;
    /* background-color: aliceblue; */
    border-radius: 100%;
    height: 50px;
}

.item-box .icon img {
    color: #57505073;
    width: 28px;
}

.item-box .text {
    margin-top: 6px;
    font-size: 0.8rem;
    font-weight: bold;
}
</style>