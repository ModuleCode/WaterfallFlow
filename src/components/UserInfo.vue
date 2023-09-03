<template>
    <div class="user-info-container">
        <div class="top-container">
            <div class="image-content">
                <el-avatar shape="square" :size="60" :src="headSculpture" />
            </div>
            <div class="name-content">
                <el-text class="mx-1" size="large">张筱雨</el-text>
            </div>
        </div>


        <el-divider border-style="dashed">自我介绍</el-divider>
        <span>认识你的开始我就喜欢你了认识你的开始我就喜欢你了认识你的开</span>
        <el-divider border-style="dashed">兴趣标签</el-divider>
        <div class="tags-container">
            <el-tag class="mx-1" effect="light" size="large">风景</el-tag>
            <el-tag class="mx-1" effect="light" size="large">风景</el-tag>
            <el-tag class="mx-1" effect="light" size="large">风景</el-tag>
            <el-tag class="mx-1" effect="light" size="large">风景</el-tag>
            <el-tag class="mx-1" effect="light" size="large">...</el-tag>


        </div>
        <el-divider border-style="dashed"></el-divider>
        <slot></slot>

    </div>
</template>

<script setup>
import { ref } from "vue";
//头像
const headSculpture = ref("https://tse3-mm.cn.bing.net/th/id/OIP-C.E2J-rMDr5CtTG3nLC2q8dQAAAA?w=196&h=196&c=7&r=0&o=5&dpr=1.5&pid=1.7")
</script>

<style>
.user-info-container {
    display: flex;
    padding: 8px;
    height: 100%;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
}
.image-content{
    display: flex;
    justify-content: center;
    align-items: center;
}

.top-container {
    display: flex;
}

.tags-container {
    flex-direction: column;
    display: flex;
    /* justify-content: space-around; */
    max-height: 300px;

}

.tags-container>.el-tag {
    margin: 3px;
}

.user-info-container .name-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

}
</style>