<template>
    <div class="iimage-container" @dblclick="likeEvent" :class="{ fadeIn: clicklike }">
        <!-- 手势作用区域 -->
        <div class="black-box-content" >
            <div class="like-box" v-if="clicklike" :class="{ fadeOut: clicklike }" >
                <img src="@/assets/like.svg">
            </div>
            <div class="like-box" v-else >
                <img src="@/assets/unlike.svg">
            </div>
            <span class="liketotal">{{ imageData.likeTotal }}</span>

        </div>
        <el-image :src="imageData.originalUrl" lazy />
    </div>
</template>

<script setup>

import { defineProps, computed, ref } from "vue";
import likesfx from '@/assets/refreshsfx.mp3';
import { useSound } from '@vueuse/sound'
import request from '@/api/request.js'

const clicklike = ref(false)
const props = defineProps(['imageData'])
const { play } = useSound(likesfx, {
})
function likeEvent() {
    if (!clicklike.value) {
        // request.put
        request.put(`/like/${props.imageData.id}`).then(res => {
            if (res.code === 200) {
                like()
            }
        })

    } else {
        request.put(`/unlike/${props.imageData.id}`).then(res => {
            if (res.code === 200) {
                unlike()
            }
        })
    }

}

function like() {
    navigator.vibrate(100);
    play()
    clicklike.value = true
    props.imageData.likeTotal = props.imageData.likeTotal + 1
}
function unlike() {

    navigator.vibrate(100);
    clicklike.value = false
    props.imageData.likeTotal = props.imageData.likeTotal - 1
}
</script>

<style>
.fadeIn {
    animation: fadeIn;
    /* referring directly to the animation's @keyframe declaration */
    animation-duration: 1s;
    /* don't forget to set a duration! */
}

.fadeOut {
    animation: bounceIn;
    /* referring directly to the animation's @keyframe declaration */
    animation-duration: 1s;
    /* don't forget to set a duration! */
}

.iimage-container:hover .black-box-content {
    opacity: 1;

}

.iimage-container {
    /* pointer-events: none; */
    -webkit-user-select: none;
    /*禁用手机浏览器的用户选择功能 */
    -moz-user-select: none;
    cursor: pointer;
    user-select: none;

}

.el-image {
    z-index: -1;

}

.el-image img {
    z-index: -1;
    width: 100%;
    height: 100%;
    /* opacity: 0; */
    animation: mymove 0.6s ease-in forwards;
}

.black-box-content {
    transition: .5s;
    opacity: 0;
    position: absolute;
    background-color: #5d545448;
    width: 100%;
    /* height: 20%; */
    bottom: 0;
    display: flex;
    /* justify-content: center; */
    align-items: center;

}

.like-box {
    padding: 10px;
    padding-right: 0;
    font-size: 1rem;
}

.liketotal {
    overflow: hidden;

    padding: 10px;
    padding-left: 3px;
    color: #fff;
    font-size: 1rem;
}



@keyframes mymove {
    10% {
        opacity: 0.1;
    }



    100% {
        opacity: 1;
    }
}
</style>