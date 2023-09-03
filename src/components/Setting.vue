<template>
    <div class="setting-container">
        <div class="setting-content">
            <el-divider border-style="dashed">布局设置</el-divider>
            <setting-item :label="'排列'">
                <template #content>
                    <el-slider v-model="column" :min="1" :max="10" @change="change" @input="changereal" />
                </template>
            </setting-item>
            <setting-item :label="'间距'">
                <template #content>
                    <el-slider v-model="gap" :min="1" :max="10" @change="change" @input="changereal" />
                </template>
            </setting-item>
            <setting-item :label="'实时更新'">
                <template #content>
                    <el-switch v-model="store.realTime" size="large" />
                </template>
            </setting-item>
            <el-divider border-style="dashed">菜单设置</el-divider>
            <setting-item :label="'菜单方向'">
                <template #content>
                    <el-select v-model="dir" @change="changeDir">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                            :disabled="item.disabled" />
                    </el-select>
                </template>
            </setting-item>
           

        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, watch, onMounted } from "vue"
import { useStore } from '@/store/index'
import SettingItem from "@/components/SettingItem.vue"
import { isPhone } from "@/tools/tools";
const store = useStore()
const props = defineProps(['display']);
const column = ref()
const gap = ref()
function change() {
    store.gap = gap.value
    store.column = column.value
    // play()
    // console.log(store.column);
}
function changereal() {
    if (store.realTime) {
        store.gap = gap.value
        store.column = column.value
    }
}

const dir = ref('ltr')
onMounted(() => {
    dir.value = store.menuopenfs
})
// 选项
const options = [
    {
        label: '自左向右',
        value: 'ltr',
    },
    {
        label: '自上而下',
        value: 'ttb',
        disabled: !isPhone(),
    },
    {
        label: '自右向左',
        value: 'rtl',
    },
    {
        label: '自下而上',
        value: 'btt',
        disabled: !isPhone(),
    },

]
function changeDir() {
    store.menuopenfs = dir.value
}
</script>

<style>
.setting-container {
    display: flex;
    /* z-index: 100; */
    /* background-color: #fff; */
    /* width: 100vw; */
}

.setting-container>.setting-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.setting-container>.setting-content>.top {
    font-size: 20px;
}

.setting-container>.setting-content>.bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

}
</style>