<template>
    <div class="fs-waterfall-container" v-loading="loading">
        <!--  -->
        <div class="fs-waterfall-content" ref="contentRef" @mousewheel="topbarshow" @touchstart="touchstart"
            @touchmove="touchmove">
            <div class="fs-waterfall-list">
                <div class="fs-waterfall-item" :key="index" v-for="(item, index) in store.dataList" :style="{
                    width: `${state.imageWidth}px`,
                    transform: `translate3d(${imagePos[index].x}px, ${imagePos[index].y}px, 0)`,
                }">
                    <i-image :imageData="item" />
                </div>
                <!-- <i-image ></i-image> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import request from "@/api/request";
//工具
import { debounce, rafThrottle } from "@/tools/tools";
import { onMounted, reactive, ref, computed, onUnmounted, watch } from "vue";
import { ElNotification } from 'element-plus'
import tipsfx from '@/assets/tipsfx.mp3';
import { useSound } from '@vueuse/sound'
import { useStore } from '@/store/index'
import IImage from "./IImage.vue";
const store = useStore()
const { play } = useSound(tipsfx)
const contentRef = ref()
const imagePos = ref([]);
const columnHeight = ref([]);
const state = reactive({
    isfinish: false,
    page: 1,
    imageWidth: 0,
});
const emit = defineEmits(['getDataList', 'topbarshow'])
const props = defineProps({
    column: {
        type: Number,
        default: 2,
        required: true
    },
    gap: {
        type: Number,
        default: 3,
        required: true

    },

    loading: {
        type: Boolean,
        default: false
    },
    pageSize: {
        type: Number,
        default: 0
    },
    index: {
        type: Number
    }
});


const handleScroll = rafThrottle((e) => {
    const { scrollTop, clientHeight, scrollHeight } = contentRef.value;
    const bottom = scrollHeight - clientHeight - scrollTop;
    if (bottom <= 100) {
        !state.loading && getImageList(state.page, props.pageSize, false);
    }
});

const handleResize = debounce(() => {
    if (contentRef.value) {
        state.imageWidth = (contentRef.value.clientWidth - (props.column - 1) * props.gap) / props.column;
        imagePos.value = [];
        columnHeight.value = [];
        computedImagePos(store.dataList, true);
    }
}, 100);
// // 获取最小列位置和高度
const min = computed(() => {
    let minIndex = -1,
        minHeight = Infinity;
    for (let i = 0; i < columnHeight.value.length; i++) {
        const h = columnHeight.value[i];
        if (h < minHeight) {
            minIndex = i;
            minHeight = h;
        }
    }
    return {
        minIndex,
        minHeight,
    };
});
const init = () => {
    if (contentRef.value) {
        state.imageWidth = (contentRef.value.clientWidth - (props.column - 1) * props.gap) / props.column;
        getImageList(state.page, props.pageSize, true);
        contentRef.value.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
    }
};
// 计算位置
const computedImagePos = (list, isFirst) => {
    list.forEach((item, index) => {
        const imageHeight = Math.floor((item.height * state.imageWidth) / item.width);
        if (isFirst && index < props.column) {
            imagePos.value.push({
                x: index % props.column !== 0 ? index * state.imageWidth + props.gap * index : index * state.imageWidth,
                y: 0,
            });
            columnHeight.value.push(imageHeight + props.gap);

        } else {
            const { minIndex, minHeight } = min.value;
            imagePos.value.push({
                x:
                    minIndex % props.column !== 0
                        ? minIndex * state.imageWidth + props.gap * minIndex
                        : minIndex * state.imageWidth,
                y: minHeight,
            });

            columnHeight.value[minIndex] += imageHeight + props.gap;
        }
    });
};

const getImageList = async (page, pageSize, isFirst) => {
    if (state.isfinish) return;
    state.loading = true;
    const res = await request.get(`/pubuliu/${page}/${pageSize}`)
    store.reshDataList = res.data.rows
    state.page++;
    navigator.vibrate(100);
    if (!store.reshDataList.length) {
        ElNotification({
            title: '提示',
            message: '到底啦！',
            type: 'warning',
        })
        play()
        state.isfinish = true;
        state.loading = false;
        return;
    }
    computedImagePos(store.reshDataList, isFirst);
    store.dataList = [...store.dataList, ...store.reshDataList];
    state.loading = false;
};
// 执行 
onMounted(() => {
    init();
});

onUnmounted(() => {
    contentRef.value && contentRef.value.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
});


var startY = 0;
var moveY = 0;


function topbarshow(e) {
    if (e.wheelDeltaY > 0) {
        emit('topbarshow', e.wheelDeltaY > 0)

    }
    if (e.wheelDeltaY < 0) {
        emit('topbarshow', false)
    }
}


function touchstart(e) {
    startY = e.touches[0].clientY
}

function touchmove(e) {
    moveY = e.touches[0].clientY
    var res = startY - moveY
    emit('topbarshow', res > 0)
}
watch(() => [props.column, props.gap], (value, newv) => {
    handleResize()
    play()
})
</script>

<style>
.fs-waterfall-container {
    width: 100%;
    height: 100%;
}

.fs-waterfall-content {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
}

.fs-waterfall-list {
    width: 100%;
    position: relative;
    /* overflow-x: hidden; */
}

.fs-waterfall-item {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    transition: all 0.3s;
}
</style>