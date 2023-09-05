<template>
    <div class="fs-waterfall-container" v-loading="state.loading">
        <!--  -->
        <div class="fs-waterfall-content" ref="contentRef" @mousewheel="topbarshow" @touchstart="touchstart"
            @touchmove="touchmove">
            <div class="fs-waterfall-list">
                <!--  :style="{
                    width: `${state.imageWidth}px`, transform: `translate3d(${imagePos[index].x}px, ${imagePos[index].y}px))`
                }" -->
                <div class="fs-waterfall-item" v-for="(item, index) in imageList" :key="index">
                    <slot name="itemSlot" :param="item"></slot>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, defineProps, watch, defineEmits } from "vue";
import { debounce, rafThrottle, cannotzoom } from "@/tools/tools";

import { ElNotification } from 'element-plus'
import tipsfx from '@/assets/tipsfx.mp3';
import { useSound } from '@vueuse/sound'
const { play } = useSound(tipsfx)
const props = defineProps(['column', 'gap', 'pageSize', 'imageList', 'list', 'page']);
const contentRef = ref();
const emit = defineEmits(['topbarshow', 'getImgList','overload'])
const columnHeight = ref([]);
const imagePos = ref([]);
cannotzoom()

watch(() => [props.column, props.gap], (value, newv) => {
    handleResize()
    play()
})

const state = reactive({
    loading: false,
    isfinish: false,
    page: 1,
    imageWidth: 0,
});

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

const getImageList = async (page, pageSize, isFirst) => {
    if (state.isfinish) return;
    state.loading = true;
    emit('getImgList')
    state.page++;
    navigator.vibrate(100);
    if (!props.list.length) {
        // emit('overload')
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

    computedImagePos(props.list, isFirst);
   
    state.loading = false;
};
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
        computedImagePos(imageList, true);
    }
}, 100);

const init = () => {
    if (contentRef.value) {
        state.imageWidth = (contentRef.value.clientWidth - (props.column - 1) * props.gap) / props.column;
        getImageList(state.page, props.pageSize, true);
        contentRef.value.addEventListener("scroll", handleScroll);
        contentRef.value.addEventListener("scroll", (e) => {
        });
        window.addEventListener("resize", handleResize);
    }
};
var startY = 0;
var moveY = 0;
function touchstart(e) {
    startY = e.touches[0].clientY
}

function touchmove(e) {
    moveY = e.touches[0].clientY
    var res = startY - moveY

    if (res < -100) {
        if ((res * -1) > window.innerHeight / 2) {
            emit('topbarshow', true)
        } else {
            emit('topbarshow', false)
        }
    } else {
        emit('topbarshow', false)
    }
}



function topbarshow(e) {
    if (e.wheelDeltaY > 300) {
        emit('topbarshow', e.wheelDeltaY > 350)
    }
}
onMounted(() => {
    init();
});

onUnmounted(() => {
    contentRef.value && contentRef.value.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
});


defineExpose({
    handleResize
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

.fs-waterfall-item img {
    width: 100%;
}
</style>