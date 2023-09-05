<template>
    <div class="search-card-container">
        <el-divider border-style="dashed">全局搜索</el-divider>
        <el-input v-model="searchKey" class="w-50 m-2" type="search" placeholder="搜索您想搜索的一切" :prefix-icon="Search"
            @change="search" />
        <el-divider border-style="dashed">热门列表</el-divider>
        <div class="hot-tags">

            <el-tag @click="searchByTags" class="ml-2" type="success" v-for="tag in hotTags" :key="tag">{{ tag }}</el-tag>
            <!-- <el-badge :value="12" class="item" >
            </el-badge> -->
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import searchApi from '@/api/search.js'
import { ref } from 'vue'
import { useStore } from '@/store/index'
const store = useStore()
const searchKey = ref('')
const hotTags = ref([]);
console.log(searchApi.getHotTags());
searchApi.getHotTags().then(res => {
    hotTags.value = res.data
    console.log(res.data);
})
function search() {
    searchApi.search(searchKey.value).then(res => {
        store.dataList=res.data
        store.drawer=false
        console.log(res.data);
    })
}

</script>

<style>
.hot-tags {
    /* height: 300px; */
    /* flex-wrap: wrap; */
    /* display: flex; */
    flex-direction: column;
    overflow: auto;
    /* flex-grow: 3; */
}

.hot-tags>.el-tag {
    /* flex: 0 0 15%; */
    margin: 3px;
}
</style>